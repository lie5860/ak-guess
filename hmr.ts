const fs = require('fs')
const exec = require('child_process').exec;
const http = require("http");
const path = require("path");
const {debounce} = require('lodash')
const mime = require('mime');
const port = 30000;

const build = debounce(() => {
  console.log('散装编译器正在编译中');
  exec('npm run build')
}, 100)
build()

function mimeType(filepath) {
  let ext = filepath
    .split('.')   // jquery.min.js
    .pop()        //取最后的那个为扩展名
    .toLocaleLowerCase(); //转成小写
  return mime.getType(ext) || 'text/plain';
}

//创建server 返回文件系统 类似fc
function handleHtml(html) {
  let index = html.indexOf("</body>");
  //增加socket代码
  let socketStirng = `<script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
    socket.on("filechange", function (msg) {
      location.reload();
      socket.close();
    });
  </script>`;
  let newhtml = html.slice(0, index - 1) + socketStirng + html.slice(index - 1);
  return newhtml;
}

const server = http.createServer((req, res) => {
  try {
    res.writeHead(200, {"Content-Type": mimeType(req.url)});
    let html = fs.readFileSync(path.join(`./public${req.url}`));
    if (req.url === '/index.html') {
      html = handleHtml(html);
    }
    res.end(html);
  } catch (e) {
    console.error(e.message)
    res.end('');
  }
});

//启动服务
server.listen(port, "127.0.0.1", () => {
  console.log(`服务器运行在 http://127.0.0.1:${port}/index.html`);
});
// 监听代码部分变更
fs.watch('./src', (event, filename) => {
  if (filename) {
    build()
  }
})
// 开启ws服务
const io = require("socket.io")(server);
const refresh = debounce(() => {
  console.log('静态文件发生变更，发起ws消息刷新页面。')
  io.sockets.emit("filechange");
}, 100)
// 监听静态数据变更
fs.watch('./public', (event, filename) => {
//监听到文件改动时，就更新defaultFile，方便服务器返回最新的文件内容
  if (filename) {
    refresh()
  }
})



