import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import {viteExternalsPlugin} from 'vite-plugin-externals'
import htmlPlugin from 'vite-plugin-html-config'

const plugins = [{
  handleHotUpdate: ({server}) => {
    // 由于使用magic 文件修改并不会引发重渲染，故修改热更新为重载页面
    server.ws.send({
      type: 'full-reload'
    })
    return []
  }
},
  viteExternalsPlugin({
    'dayjs': 'dayjs',
    'dayjs/plugin/utc': 'dayjs_plugin_utc',
    'dayjs/plugin/timezone': 'dayjs_plugin_timezone',
    'React': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'axios': 'axios',
  }),
  htmlPlugin({
    links: [
      // {
      //   rel: 'stylesheet',
      //   href: '//unpkg.com/antd/dist/antd.css'
      // }
    ],
    scripts: [
      {src: '//unpkg.com/react@17/umd/react.production.min.js'},
      {src: '//unpkg.com/react-dom@17/umd/react-dom.production.min.js'},
      {src: '//unpkg.com/dayjs@1.11.2/dayjs.min.js'},
      {src: '//unpkg.com/dayjs@1.11.2/plugin/timezone.js'},
      {src: '//unpkg.com/dayjs@1.11.2/plugin/utc.js'},
      {src: '//unpkg.com/react-router@5.3.1/umd/react-router.min.js'},
      {src: '//unpkg.com/react-router-dom@5.3.1/umd/react-router-dom.min.js'},
      {src: '//unpkg.com/axios/dist/axios.min.js'},
    ]
  })
];
// 打包生产环境才引入的插件
if (process.env.NODE_ENV === "production") {
  // 打包依赖展示
  // plugins.push(
  //   visualizer({
  //     open: true,
  //     gzipSize: true,
  //     brotliSize: true,
  //   })
  // );
}
// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return {
    plugins: [react(), ...plugins],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      }
    },
    base: command === 'serve' ? '/' : '//ak-guess.oss-cn-hangzhou.aliyuncs.com/ak2',
    build: {
      assetsInlineLimit: 0,
    }
  }
})
