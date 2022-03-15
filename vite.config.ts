import {defineConfig} from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return {
    plugins: [react()],
    // base: 'https://ak-guess.oss-cn-hangzhou.aliyuncs.com/ak-guess',
    build: {
      assetsInlineLimit: 0,
    }
  }
})
