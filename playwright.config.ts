import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    // 绕过 CORS 限制（//unpkg.com CDN 在 http://localhost 下被 CORS 拦截）
    launchOptions: {
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process'],
    },
  },
  // 自动启动 dev 服务器
  webServer: {
    command: 'npm run dev -- --port 3000',
    port: 3000,
    timeout: 15000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {browserName: 'chromium'},
    },
  ],
});
