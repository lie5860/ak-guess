/**
 * E2E 全流程测试：悖论模拟与每日挑战模式
 */
import { test, expect } from '@playwright/test';
import { initPage, submitGuess, dismissInitialDialog } from './helpers';

test.describe('额外游戏模式', () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
  });

  test('悖论模拟模式下提交猜测应正常显示结果', async ({ page }) => {
    await page.locator('text=悖论模拟').click();
    await page.waitForTimeout(2000); // 切换模式可能涉及获取服务端每日数据或资源

    // 首次进入悖论模式会弹出一个该模式专属的使用说明弹窗，这里需要关闭它
    await dismissInitialDialog(page);

    // 提交猜测
    await submitGuess(page, '芬');

    // 检查是否有结果图标生成
    const resultEmojis = page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos');
    await expect(resultEmojis.first()).toBeVisible({ timeout: 5000 });
    expect(await resultEmojis.count()).toBeGreaterThanOrEqual(5);
  });

  test('每日挑战模式下提交猜测应正常显示结果', async ({ page }) => {
    // Mock 服务端响应，强制展示每日测试入口并且强制答案为黑角的数据结构，防止测试失效 (避免静默通过)
    await page.route('**/*akapi.saki.cc*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ daily: 1, last_date: new Date().toISOString().split('T')[0] })
      });
    });

    // 重新进入页面（使 route 拦截生效）
    await page.goto('/');
    await page.waitForSelector('.title', { timeout: 15000 });
    await dismissInitialDialog(page);

    const dailyBtn = page.locator('text=每日挑战');
    await expect(dailyBtn.first()).toBeVisible({ timeout: 30000 });
    await dailyBtn.first().click();
    await page.waitForTimeout(2000);

    // 关闭每日挑战的特殊弹窗
    await dismissInitialDialog(page);

    await submitGuess(page, '黑角');

    const resultEmojis = page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos');
    await expect(resultEmojis.first()).toBeVisible({ timeout: 5000 });
    expect(await resultEmojis.count()).toBeGreaterThanOrEqual(5);
  });
});
