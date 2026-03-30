/**
 * E2E 测试：JS 错误监控（回归保护）
 */
import {test, expect} from '@playwright/test';
import {initPage, submitGuess, setInputValue, dismissInitialDialog} from './helpers';

test.describe('控制台错误监控', () => {
  test('随机模式猜测不应有 JS 报错', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await initPage(page);
    await submitGuess(page, '芬');
    expect(errors).toEqual([]);
  });

  test('打开 Help 弹窗不应有 JS 报错（escapeHtml 回归）', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForSelector('.title', {timeout: 15000});
    // 首次弹窗就是 Help，直接等它出现
    await page.waitForTimeout(1500);

    // 之前 escapeHtml 传入数字导致 TypeError 就是在这里崩溃的
    expect(errors).toEqual([]);
  });

  test('打开干员图鉴不应有 JS 报错', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await initPage(page);

    const guideBtn = page.locator('text=干员').first();
    if (await guideBtn.isVisible()) {
      await guideBtn.click();
      await page.waitForTimeout(1000);
    }
    expect(errors).toEqual([]);
  });

  test('输入 XSS payload 不应崩溃', async ({page}) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await initPage(page);
    await setInputValue(page, '#guess', '<script>alert(1)</script>');
    await page.locator('button.guess_input').click();
    await page.waitForTimeout(500);

    expect(errors).toEqual([]);
  });
});
