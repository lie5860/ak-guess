import {defineConfig} from 'vite'
import visualizer from "rollup-plugin-visualizer";
import react from '@vitejs/plugin-react'
import {viteExternalsPlugin} from 'vite-plugin-externals'

const plugins = [
  viteExternalsPlugin({
    react: 'React',
    'react-dom': 'ReactDOM'
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
export default defineConfig(({command, mode}) => {
  return {
    plugins: [react(),
      ...plugins],
    base: command === 'serve' ? '/' : './',
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
      }
    }
  }
})
