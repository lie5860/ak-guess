/**
 * E2E 全流程测试：模式切换 & 弹窗交互
 */
import {test, expect} from '@playwright/test';
import {initPage, dismissInitialDialog} from './helpers';

test.describe('模式切换', () => {
  test('切换到悖论模拟后页面不崩溃', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await initPage(page);
    await page.locator('text=悖论模拟').click();
    await page.waitForTimeout(2000);

    await expect(page.locator('.title')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('切换模式后输入框和按钮仍可用', async ({page}) => {
    await initPage(page);
    await page.locator('text=悖论模拟').click();
    await page.waitForTimeout(2000);

    await expect(page.locator('#guess')).toBeVisible();
    await expect(page.locator('button.guess_input')).toBeVisible();
  });
});

test.describe('弹窗交互', () => {
  test('首次访问应自动弹出 Help 教程弹窗', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    await page.waitForTimeout(1000);

    // 首次访问应弹出 Help 弹窗
    await expect(page.locator('.mdui-dialog-open')).toBeVisible();
    await expect(page.locator('.mdui-dialog-title')).toContainText('游戏规则');
  });

  test('Help 弹窗可以通过关闭按钮关闭', async ({page}) => {
    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    await page.waitForTimeout(1000);

    await expect(page.locator('.mdui-dialog-open')).toBeVisible();

    // 关闭弹窗
    await page.locator('.mdui-dialog-open .close-icon').click();
    await page.waitForTimeout(500);

    await expect(page.locator('.mdui-dialog-open')).not.toBeVisible();
  });

  test('关闭后手动点击小刻学堂可重新打开', async ({page}) => {
    await initPage(page);

    await page.locator('text=小刻学堂').click();
    await expect(page.locator('.mdui-dialog')).toBeVisible({timeout: 3000});
  });

  test('点击小刻猜猜团应打开贡献者弹窗', async ({page}) => {
    await initPage(page);

    const link = page.locator('text=小刻猜猜团');
    await expect(link).toBeVisible({timeout: 5000});
    await link.click();
    await expect(page.locator('.mdui-dialog')).toBeVisible({timeout: 3000});
  });
});
