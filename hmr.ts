const fs = require('fs')
const exec = require('child_process').exec;
const http = require("http");
const path = require("path");
const port = 30000;
const mimeLists = {
    css: 'text/css',
    html: 'text/html',
    js: 'text/javascript',
    xml: 'text/xml',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/jpeg',
    json: 'application/json'
};

function mimeType(filepath) {
    let ext = filepath
        .split('.')   // jquery.min.js
        .pop()        //取最后的那个为扩展名
        .toLocaleLowerCase(); //转成小写
    return mimeLists[ext] || 'text/plain';

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
const debounce = (fn, wait) => {
    let timer, startTimeStamp = 0;
    let context, args;
    let run = (timerInterval) => {
        timer = setTimeout(() => {
            let now = (new Date()).getTime();
            let interval = now - startTimeStamp
            if (interval < timerInterval) { // the timer start time has been reset, so the interval is less than timerInterval
                startTimeStamp = now;
                run(wait - interval);  // reset timer for left time
            } else {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }

        }, timerInterval);
    }

    return function () {
        context = this;
        args = arguments;
        let now = (new Date()).getTime();
        startTimeStamp = now;
        if (!timer) {
            run(wait);    // last timer alreay executed, set a new timer
        }

    }

}
// 监听代码部分变更
const build = debounce(() => {
    console.log('散装编译器正在编译中');
    exec('npm run build')
}, 100)
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



