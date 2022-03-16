import {defineConfig} from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return {
    plugins: [react()],
    base: command === 'serve' ? '/' : '//ak-guess.oss-cn-hangzhou.aliyuncs.com/vite',
    build: {
      assetsInlineLimit: 0,
    }
  }
})
