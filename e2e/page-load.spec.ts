/**
 * E2E 全流程测试：页面加载 & 基础渲染
 */
import {test, expect} from '@playwright/test';
import {dismissInitialDialog} from './helpers';

test.describe('页面加载与基础渲染', () => {
  test('首页应正确加载，无 JS 报错', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    expect(errors).toEqual([]);
  });

  test('应显示游戏标题和核心 UI 元素', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    await dismissInitialDialog(page);

    await expect(page.locator('.title')).toHaveText('干员猜猜乐');
    await expect(page.locator('#guess')).toBeVisible();
    await expect(page.locator('button.guess_input')).toHaveText('提交');
  });

  test('应显示模式切换导航', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});

    await expect(page.locator('text=随心所欲')).toBeVisible();
    await expect(page.locator('text=悖论模拟')).toBeVisible();
  });

  test('应显示工具栏链接', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    await dismissInitialDialog(page);

    await expect(page.locator('text=小刻学堂')).toBeVisible();
    await expect(page.locator('text=反馈')).toBeVisible();
  });
});
