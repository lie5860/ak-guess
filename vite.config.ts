import {defineConfig} from 'vite'
import visualizer from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'
import * as path from 'path'

const plugins = [{
  handleHotUpdate: ({server}) => {
    // 由于使用magic 文件修改并不会引发重渲染，故修改热更新为重载页面
    server.ws.send({
      type: 'full-reload'
    })
    return []
  }
}];
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
export default defineConfig(({command, mode}) => {
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
