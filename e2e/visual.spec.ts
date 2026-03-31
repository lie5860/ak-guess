import { test } from '@playwright/test';

// iPhone XR 竖屏 (默认)
const VIEWPORT_XR_PORTRAIT = { width: 414, height: 896 };
// iPhone XR 横屏
const VIEWPORT_XR_LANDSCAPE = { width: 896, height: 414 };
// 桌面端
const VIEWPORT_DESKTOP = { width: 1280, height: 720 };

const ALL_VIEWPORTS = [
  { name: 'xr-portrait', ...VIEWPORT_XR_PORTRAIT },
  { name: 'xr-landscape', ...VIEWPORT_XR_LANDSCAPE },
  { name: 'desktop', ...VIEWPORT_DESKTOP },
];

async function dismissHelp(page: any) {
  await page.waitForTimeout(600);
  const closeBtn = page.locator('.close-icon');
  if (await closeBtn.isVisible()) await closeBtn.click();
  await page.waitForTimeout(300);
}

for (const vp of ALL_VIEWPORTS) {
  test.describe(`[${vp.name}]`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    });

    test('backup tab', async ({ page }) => {
      await page.goto('/');
      await dismissHelp(page);
      await page.click('text=数据备份');
      await page.waitForTimeout(600);
      await page.screenshot({ path: `screenshot-${vp.name}-backup.png` });
    });

    test('generate then restore comparison', async ({ page }) => {
      await page.goto('/');
      await dismissHelp(page);

      // 1. 打开数据备份弹窗
      await page.click('text=数据备份');
      await page.waitForTimeout(500);

      // 2. 生成引继码
      await page.click('text=生成备份引继码');
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `screenshot-${vp.name}-generated.png` });

      // 3. 读取生成的引继码文本
      const codeEl = page.locator('div[style*="monospace"]');
      const code = await codeEl.textContent();

      // 4. 切到还原 Tab
      await page.click('text=还原进度');
      await page.waitForTimeout(300);

      // 5. 输入引继码并查询
      await page.locator('.mdui-textfield-input').fill(code?.trim() || '');
      await page.waitForTimeout(200);
      await page.click('text=查询');
      await page.waitForTimeout(1500);

      // 6. 截取数据对比界面
      await page.screenshot({ path: `screenshot-${vp.name}-compare.png` });
    });

    test('import tab empty', async ({ page }) => {
      await page.goto('/');
      await dismissHelp(page);
      await page.click('text=数据备份');
      await page.waitForTimeout(400);
      await page.click('text=还原进度');
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenshot-${vp.name}-import.png` });
    });
  });
}
