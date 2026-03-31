/**
 * E2E 全流程测试：自动补全交互
 */
import {test, expect} from '@playwright/test';
import {initPage, setInputValue} from './helpers';

test.describe('自动补全交互', () => {
  test.beforeEach(async ({page}) => {
    await initPage(page);
  });

  test('输入中文角色名应弹出联想列表', async ({page}) => {
    await setInputValue(page, '#guess', '阿米');
    const suggestions = page.locator('.autocomplete-items');
    await expect(suggestions).toBeVisible({timeout: 3000});
    // "阿米"应匹配到 阿米娅、阿米娅(近卫)、阿米娅(医疗) 等
    const items = suggestions.locator('> div');
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(1);
    // 第一个应包含"阿米娅"
    await expect(items.first()).toContainText('阿米娅');
  });

  test('输入英文名应能匹配到角色', async ({page}) => {
    await setInputValue(page, '#guess', 'Blaze');
    const suggestions = page.locator('.autocomplete-items');
    await expect(suggestions).toBeVisible({timeout: 3000});
  });

  test('输入不存在的角色名不应弹出联想列表', async ({page}) => {
    await setInputValue(page, '#guess', 'XYZNOTEXIST不存在');
    await page.waitForTimeout(300);
    await expect(page.locator('.autocomplete-items')).not.toBeVisible({timeout: 2000});
  });

  test('点击联想选项应填入输入框', async ({page}) => {
    await setInputValue(page, '#guess', '夜刀');
    const suggestions = page.locator('.autocomplete-items');
    await expect(suggestions).toBeVisible({timeout: 3000});
    await suggestions.locator('div').first().click();
    await expect(page.locator('#guess')).toHaveValue('夜刀');
    await expect(suggestions).not.toBeVisible();
  });

  test('清空输入后联想列表应消失', async ({page}) => {
    await setInputValue(page, '#guess', '芬');
    await expect(page.locator('.autocomplete-items')).toBeVisible({timeout: 3000});
    await setInputValue(page, '#guess', '');
    await page.waitForTimeout(300);
    await expect(page.locator('.autocomplete-items')).not.toBeVisible({timeout: 2000});
  });
});
