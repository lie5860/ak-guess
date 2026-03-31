/**
 * E2E 高级测试用例：
 * 涵盖：首发命中、单次失败后命中、再来一局、放弃模式（小刻饿了）及分享按钮功能
 */
import {test, expect, Page} from '@playwright/test';
import {initPage, submitGuess, dismissInitialDialog} from './helpers';

// 工具：为随机模式准备确定的随机种子（确保 Math.random = 0 也就是索引 0 "Lancet-2"）
async function ensureDeterministicRandom(page: Page) {
  await page.addInitScript(() => {
    Math.random = () => 0.0001; 
  });
}
const RANDOM_FIXED_ANSWER = 'Lancet-2';

// 工具：强制设置悖论模拟的内部数据以确保能复现极小概率事件（例如首次猜对）
async function forceParadoxState(page: Page, restList: number[]) {
  await page.evaluate((list) => {
    localStorage.setItem('paradoxData', JSON.stringify({
      data: [],
      restList: list,
      giveUp: 'false'
    }));
  }, restList);
  await dismissInitialDialog(page);
  await page.locator('text=悖论模拟').click();
  await page.waitForTimeout(1000);
  await dismissInitialDialog(page);
}

// ---------------------- 首次猜对 -> 新开一把 ----------------------
test.describe('1次成功猜对并尝试获取再来一局', () => {
  test('随机模式：首次猜对 -> 点击再来一局', async ({page}) => {
    await ensureDeterministicRandom(page);
    await initPage(page);
    await submitGuess(page, RANDOM_FIXED_ANSWER);
    
    // 断言胜利：所有图标全绿且弹出了再来一局/分享
    await expect(page.locator('.emoji.correct').first()).toBeVisible({timeout: 5000});
    await expect(page.locator('text=分享').first()).toBeVisible();
    await expect(page.locator('text=再来一局')).toBeVisible();

    await page.locator('text=再来一局！').click();
    await page.waitForTimeout(1000);
    // 判断重新开始了（输入框被清空，无历史记录行）
    // 源码中猜测结果行使用 .guesses .row，标题行始终存在，猜测结果行才有 .emoji
    await expect(page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos')).toHaveCount(0);
  });

  test('悖论模拟：首次猜对 -> 点击再来一局', async ({page}) => {
    await initPage(page);
    // 强制悖论模拟只剩唯一目标 Lancet-2(索引0) 从而保证必定触发胜利
    await forceParadoxState(page, [0]);
    // forceParadoxState 已切换到悖论模式，不要重复点击

    await submitGuess(page, 'Lancet-2');
    
    await expect(page.locator('text=再来一局')).toBeVisible({timeout: 5000});
    await page.locator('text=再来一局！').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos')).toHaveCount(0);
  });

  test('每日挑战：首次猜对 -> 检查分享（此模式通常不允许重复）', async ({page}) => {
    // Mock 每日 API 必定产生 Castle-3(索引1) 做为答案
    await page.route('*://akapi.saki.cc/**', async route => {
      await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ daily: 1, last_date: new Date().toISOString().split('T')[0], server_date: new Date().toISOString().split('T')[0] })});
    });
    await initPage(page);
    const dailyBtn = page.locator('text=每日挑战');
    // 不能用 if 守卫！必须断言按钮存在，否则测试静默通过
    await expect(dailyBtn.first()).toBeVisible({timeout: 5000});
    await dailyBtn.first().click();
    await page.waitForTimeout(1000);
    await dismissInitialDialog(page);

    await submitGuess(page, 'Castle-3');
    
    // 验证每日挑战通过，包含分享，但【不存在】"再来一局"
    await expect(page.locator('.emoji.correct').first()).toBeVisible({timeout: 5000});
    await expect(page.locator('text=再来一局！')).not.toBeVisible();
    await expect(page.locator('text=分享').first()).toBeVisible();
  });
});

// ---------------------- 首次错误_随后猜对 -> 新开一把 ----------------------
test.describe('猜错后第二回合猜对并重新开始', () => {
  test('随机模式：1错1对 -> 再来一局', async ({page}) => {
    await ensureDeterministicRandom(page);
    await initPage(page);
    // 先保证猜一个是错的
    const wrongAnswer = '芬';
    await submitGuess(page, wrongAnswer);
    await submitGuess(page, RANDOM_FIXED_ANSWER);
    
    await expect(page.locator('text=再来一局！')).toBeVisible({timeout: 5000});
    await page.locator('text=再来一局！').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos')).toHaveCount(0);
  });

  test('悖论模拟：1错1对 -> 再来一局', async ({page}) => {
    await initPage(page);
    // 悖论模拟：设定2个答案供收敛 [Castle-3 (idx:1), Lancet-2(idx:0)]
    await forceParadoxState(page, [1, 0]);
    // forceParadoxState 已切换到悖论模式，不要重复点击
    // 第一次猜测 Lancet-2 迫使其收敛到 Castle-3
    await submitGuess(page, 'Lancet-2');
    await page.waitForTimeout(500);
    // 第二次猜 Castle-3 完成游戏
    await submitGuess(page, 'Castle-3');

    await expect(page.locator('text=再来一局！')).toBeVisible({timeout: 5000});
  });

  test('每日挑战：1错1对', async ({page}) => {
    await page.route('*://akapi.saki.cc/**', async route => {
      await route.fulfill({status: 200, contentType: 'application/json', body: JSON.stringify({ daily: 1, last_date: new Date().toISOString().split('T')[0], server_date: new Date().toISOString().split('T')[0] })});
    });
    await initPage(page);
    const dailyBtn = page.locator('text=每日挑战');
    // 不能用 if 守卫！必须断言按钮存在
    await expect(dailyBtn.first()).toBeVisible({timeout: 5000});
    await dailyBtn.first().click();
    await page.waitForTimeout(1000);
    await dismissInitialDialog(page);

    await submitGuess(page, '阿米娅'); // wrong
    await submitGuess(page, 'Castle-3'); // right

    await expect(page.locator('.emoji.correct').first()).toBeVisible({timeout: 5000});
    await expect(page.locator('text=分享').first()).toBeVisible();
  });
});

// ---------------------- 放弃游戏（小刻饿了） ----------------------
test.describe('游戏放弃机制与分享组件验证', () => {
  test('随机模式：猜1次后放弃', async ({page}) => {
    await ensureDeterministicRandom(page);
    await initPage(page);
    const wrongAnswer = '夜刀';
    
    await submitGuess(page, wrongAnswer);
    // 源码中结果行用 .guesses .row 内含 .emoji，检查至少有一个 emoji 证明猜过
    await expect(page.locator('.emoji.correct, .emoji.wrong, .emoji.up, .emoji.down, .emoji.wrongpos').first()).toBeVisible({timeout: 5000});

    // 点击小刻饿了
    const giveUpBtn = page.locator('text=小刻饿了！');
    await expect(giveUpBtn).toBeVisible();
    await giveUpBtn.click();
    
    // mdui.dialog 的确认按钮（源码中用 mdui.dialog 生成，按钮文本来自 i18n.get('yes') = "是"）
    await page.locator('.mdui-dialog-actions .mdui-btn:has-text("是")').first().click();
    await page.waitForTimeout(1000);

    // 检查再来一局按钮出现
    await expect(page.locator('text=再来一局！')).toBeVisible();
    // 分享按钮在 .share-body 内
    await expect(page.locator('.share-body >> text=分享').first()).toBeVisible();
  });

  test('悖论模拟：猜1次后放弃', async ({page}) => {
    await ensureDeterministicRandom(page);
    await initPage(page);
    await forceParadoxState(page, [0, 1, 2, 3]); // Some initial arbitrary list
    // forceParadoxState 已切换到悖论模式，不要重复点击
    await submitGuess(page, '白雪'); // 随意猜一个
    
    // 点击小刻饿了
    await page.locator('text=小刻饿了！').click();
    await page.locator('.mdui-dialog-actions .mdui-btn:has-text("是")').first().click();
    await page.waitForTimeout(1000);

    // 检查是否有分享组件（在 .share-body div 内）
    await expect(page.locator('.share-body >> text=分享').first()).toBeVisible();
  });
});

// ---------------------- 两种形态的分享按钮验证 ----------------------
test.describe('两种形态的分享按钮存在性', () => {
  // 分享功能由于依赖 navigator.clipboard 或 Web Share API，E2E仅断言存在性
  test('全部通关用例中，"分享"及"分享(带名称)"必须可显', async ({page}) => {
    await ensureDeterministicRandom(page);
    await initPage(page);
    await submitGuess(page, RANDOM_FIXED_ANSWER);
    
    // 源码中分享按钮在 .share-body 内，包含 "分享" 和 "分享(带名称)" 两个链接
    const shareBody = page.locator('.share-body');
    await expect(shareBody).toBeVisible({timeout: 3000});
    await expect(shareBody.locator('text=分享').first()).toBeVisible();
    await expect(shareBody.locator('text=分享(带名称)')).toBeVisible();
  });
});
