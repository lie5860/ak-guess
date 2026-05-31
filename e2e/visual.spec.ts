import { test } from '@playwright/test';

async function dismissHelp(page: any) {
  await page.waitForTimeout(600);
  const closeBtn = page.locator('.close-icon');
  if (await closeBtn.isVisible()) await closeBtn.click();
  await page.waitForTimeout(300);
}

test('backup tab', async ({ page }, testInfo) => {
  await page.goto('/');
  await dismissHelp(page);
  await page.click('text=数据备份');
  await page.waitForTimeout(600);
  await page.screenshot({ path: `test-results/visual/screenshot-${testInfo.project.name}-backup.png` });
});

test('generate then restore comparison', async ({ page }, testInfo) => {
  await page.goto('/');
  await dismissHelp(page);

  // 1. 打开数据备份弹窗
  await page.click('text=数据备份');
  await page.waitForTimeout(500);

  // 2. 生成引继码
  await page.click('text=生成备份引继码');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `test-results/visual/screenshot-${testInfo.project.name}-generated.png` });

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
  await page.screenshot({ path: `test-results/visual/screenshot-${testInfo.project.name}-compare.png` });
});

test('import tab empty', async ({ page }, testInfo) => {
  await page.goto('/');
  await dismissHelp(page);
  await page.click('text=数据备份');
  await page.waitForTimeout(400);
  await page.click('text=还原进度');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `test-results/visual/screenshot-${testInfo.project.name}-import.png` });
});
