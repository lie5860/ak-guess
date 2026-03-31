/**
 * E2E 测试共享工具函数
 *
 * 解决的核心问题：
 * 1. 首次访问会弹出 Help 教程弹窗，挡住输入框 → dismissInitialDialog()
 * 2. page.fill() 对中文输入可能不触发 autocomplete → setInputValue()
 * 3. CDN 脚本通过 //unpkg.com 加载，HTTP 下 CORS 问题 → playwright.config 用 --disable-web-security
 */
import {Page} from '@playwright/test';

/**
 * 关闭首次访问自动弹出的 Help 教程弹窗
 */
export async function dismissInitialDialog(page: Page) {
  const closeIcon = page.locator('.mdui-dialog-open .close-icon');
  if (await closeIcon.isVisible({timeout: 2000}).catch(() => false)) {
    await closeIcon.click();
    await page.waitForTimeout(500);
  }
}

/**
 * 设置输入框的值并触发 input 事件
 * 使用原生 DOM API 确保 autocomplete 的 addEventListener('input') 被正确触发
 */
export async function setInputValue(page: Page, selector: string, value: string) {
  await page.evaluate(({sel, val}) => {
    const input = document.querySelector(sel) as HTMLInputElement;
    if (!input) throw new Error(`找不到元素: ${sel}`);
    const nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )?.set;
    if (nativeSetter) {
      nativeSetter.call(input, val);
    } else {
      input.value = val;
    }
    input.dispatchEvent(new Event('input', {bubbles: true}));
  }, {sel: selector, val: value});
  await page.waitForTimeout(300);
}

/**
 * 通过联想输入并提交一个角色猜测
 */
export async function submitGuess(page: Page, name: string) {
  await setInputValue(page, '#guess', name);
  const suggestions = page.locator('.autocomplete-items');
  if (await suggestions.isVisible().catch(() => false)) {
    const option = suggestions.locator('div', {hasText: name}).first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
      await page.waitForTimeout(200);
    }
  }
  await page.locator('button.guess_input').click();
  await page.waitForTimeout(800);
}

/**
 * 标准的页面初始化流程：加载 → 等就绪 → 关弹窗
 */
export async function initPage(page: Page) {
  await page.goto('/');
  await page.waitForSelector('#guess', {timeout: 15000});
  await page.waitForTimeout(500);
  await dismissInitialDialog(page);
  await page.waitForTimeout(300);
}
