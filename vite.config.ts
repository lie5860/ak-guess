import {defineConfig} from 'vite'
import visualizer from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'

const plugins = [];
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
    plugins: [react(),
      ...plugins],
    base: command === 'serve' ? '/' : './',
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        // React/ReactDOM 通过 CDN <script> 加载到 window，不打进 bundle
        external: ['react', 'react-dom'],
        output: {
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  }
})
