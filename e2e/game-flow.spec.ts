/**
 * E2E 全流程测试：完整游戏流程（随机模式）
 */
import {test, expect} from '@playwright/test';
import {initPage, submitGuess, setInputValue} from './helpers';

test.describe('随机模式 - 游戏核心流程', () => {
  test.beforeEach(async ({page}) => {
    await initPage(page);
  });

  test('提交有效角色名应显示猜测结果', async ({page}) => {
    await submitGuess(page, '芬');
    // 结果用 div.emoji 展示（correct/wrong/up/down/wrongpos）
    const resultEmojis = page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos');
    await expect(resultEmojis.first()).toBeVisible({timeout: 5000});
  });

  test('提交不存在的角色名应显示错误提示', async ({page}) => {
    await setInputValue(page, '#guess', '完全不存在XYZ');
    await page.locator('button.guess_input').click();
    await expect(page.locator('.mdui-snackbar')).toBeVisible({timeout: 3000});
  });

  test('重复提交同一角色应显示提示', async ({page}) => {
    await submitGuess(page, '芬');
    await submitGuess(page, '芬');
    await expect(page.locator('.mdui-snackbar')).toBeVisible({timeout: 3000});
  });

  test('提交后输入框应被清空', async ({page}) => {
    await submitGuess(page, '黑角');
    await expect(page.locator('#guess')).toHaveValue('', {timeout: 3000});
  });

  test('连续猜测 3 个角色应全部显示结果', async ({page}) => {
    await submitGuess(page, '芬');
    await submitGuess(page, '黑角');
    await submitGuess(page, '夜刀');

    // 每猜一个有5个属性对比，3个 = 15 个 emoji
    const resultEmojis = page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos');
    const count = await resultEmojis.count();
    expect(count).toBeGreaterThanOrEqual(15);
  });
});
