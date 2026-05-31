import { expect, test } from '@playwright/test';
import { dismissInitialDialog } from './helpers';

const createTransferPayload = (lang: string, playTimes: number, winTimes: number) => ({
  lang,
  timestamp: 1700000000000,
  recordData: {
    RANDOM_MODE: {
      playTimes,
      winTimes,
      totalTryTimes: 3,
      winTryTimes: 2,
      straightWins: winTimes,
      maxStraightWins: winTimes,
      minWinTimes: winTimes ? 2 : 0,
      roles: winTimes ? { char_002_amiya: { cost: 2, winTime: winTimes } } : {},
    },
    DAILY_MODE: {
      playTimes: 0,
      winTimes: 0,
      totalTryTimes: 0,
      winTryTimes: 0,
      straightWins: 0,
      maxStraightWins: 0,
      minWinTimes: 0,
      roles: {},
    },
    PARADOX_MODE: {
      playTimes: 0,
      winTimes: 0,
      totalTryTimes: 0,
      winTryTimes: 0,
      straightWins: 0,
      maxStraightWins: 0,
      minWinTimes: 0,
      roles: {},
    },
    version: 1,
  },
});

const enTransferPayload = createTransferPayload('en_US', 2, 1);
const zhTransferPayload = createTransferPayload('zh_CN', 3, 2);

const setupZhPage = async (page) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('__lang', 'zh_CN');
    localStorage.setItem('firstOpen', 'yes');
  });
  await page.reload();
  await page.waitForSelector('#guess', { timeout: 15000 });
  await dismissInitialDialog(page);
};

const routeDailyAndTransfer = async (
  page,
  options: {
    queryPayload?: typeof enTransferPayload;
    queryFails?: boolean;
    generatedCode?: string;
    onGenerateBody?: (body: unknown) => void;
  },
) => {
  await page.route('**/*akapi.saki.cc/**', async (route) => {
    const request = route.request();
    const url = request.url();

    if (url.includes('/api/transfer/query.php')) {
      if (options.queryFails) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ code: 1, message: 'invalid' }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ code: 0, data: { payload: options.queryPayload } }),
      });
      return;
    }

    if (url.includes('/api/transfer/generate.php')) {
      options.onGenerateBody?.(request.postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          code: 0,
          data: { transferCode: options.generatedCode || 'ZH-CLOUD-CODE' },
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        daily: 1,
        last_date: new Date().toISOString().split('T')[0],
        server_date: new Date().toISOString().split('T')[0],
      }),
    });
  });
};

const openImportTab = async (page) => {
  await page.locator('text=数据备份').click();
  await expect(page.locator('.mdui-dialog-open')).toBeVisible();
  await page.waitForTimeout(500);
  await page.locator('text=还原进度').click({ force: true });
};

test('同语言导入码查询成功时直接展示数据对比', async ({ page }) => {
  await routeDailyAndTransfer(page, { queryPayload: zhTransferPayload });
  await setupZhPage(page);

  await openImportTab(page);
  await page.locator('.mdui-textfield-input').fill('ZH-CLOUD-CODE');
  await page.locator('text=查询').click();

  await expect(page.getByTestId('transfer-language-mismatch')).not.toBeVisible();
  await expect(page.getByTestId('transfer-compare-table')).toBeVisible();
  await expect(page.getByTestId('transfer-cloud-lang')).toContainText('CN');
  await expect(
    page.getByTestId('transfer-compare-table').getByText('3 / 0 / 0').first(),
  ).toBeVisible();
  await expect(
    page.getByTestId('transfer-compare-table').getByText('2 / 0 / 0').first(),
  ).toBeVisible();
});

test('同语言确认覆盖后写入当前语言本地记录', async ({ page }) => {
  await routeDailyAndTransfer(page, { queryPayload: zhTransferPayload });
  await setupZhPage(page);

  await openImportTab(page);
  await page.locator('.mdui-textfield-input').fill('ZH-CLOUD-CODE');
  await page.locator('text=查询').click();
  await page.locator('text=确认覆盖').click();
  await page.locator('.mdui-color-red:has-text("是")').click();
  await page.waitForTimeout(900);

  const savedRecord = await page.evaluate(() => JSON.parse(localStorage.getItem('record') || '{}'));
  expect(savedRecord.RANDOM_MODE.playTimes).toBe(3);
  expect(savedRecord.RANDOM_MODE.winTimes).toBe(2);
  expect(savedRecord.RANDOM_MODE.roles.char_002_amiya.winTime).toBe(2);
});

test('无效导入码展示错误提示并保留输入界面', async ({ page }) => {
  await routeDailyAndTransfer(page, { queryFails: true });
  await setupZhPage(page);

  await openImportTab(page);
  await page.locator('.mdui-textfield-input').fill('BAD-CODE');
  await page.locator('text=查询').click();

  await expect(page.locator('.mdui-snackbar')).toContainText('引继码无效或已过期', {
    timeout: 3000,
  });
  await expect(page.locator('.mdui-textfield-input')).toBeVisible();
});

test('跨语言导入提示取消后停留在当前语言且不展示对比', async ({ page }) => {
  await routeDailyAndTransfer(page, { queryPayload: enTransferPayload });
  await setupZhPage(page);

  await openImportTab(page);
  await page.locator('.mdui-textfield-input').fill('EN-CLOUD-CODE');
  await page.locator('text=查询').click();
  await expect(page.getByTestId('transfer-language-mismatch')).toBeVisible();

  await page.getByTestId('transfer-language-mismatch').locator('button:has-text("否")').click();

  await expect(page).not.toHaveURL(/lang=en_US/);
  await expect(page.getByTestId('transfer-language-mismatch')).not.toBeVisible();
  await expect(page.getByTestId('transfer-compare-table')).not.toBeVisible();
  await expect(page.locator('.mdui-textfield-input')).toBeVisible();
});

test('生成备份码会上传当前语言 payload 并展示服务端返回码', async ({ page }) => {
  let generatedPayload: unknown;
  await routeDailyAndTransfer(page, {
    generatedCode: 'ZH-GENERATED-CODE',
    onGenerateBody: (body) => {
      generatedPayload = body;
    },
  });
  await setupZhPage(page);

  await page.locator('text=数据备份').click();
  await expect(page.locator('.mdui-dialog-open')).toBeVisible();
  await page.locator('text=生成备份引继码').click();

  await expect(page.getByText('ZH-GENERATED-CODE')).toBeVisible();
  expect(generatedPayload).toMatchObject({ lang: 'zh_CN' });
});

test('导入数据语言不一致时先切换语言，再展示导入对比', async ({ page }) => {
  await routeDailyAndTransfer(page, { queryPayload: enTransferPayload });
  await setupZhPage(page);

  await openImportTab(page);
  await page.locator('.mdui-textfield-input').fill('EN-CLOUD-CODE');
  await page.locator('text=查询').click();

  await expect(page.getByTestId('transfer-language-mismatch')).toBeVisible();
  await expect(page.getByTestId('transfer-language-mismatch')).toContainText('当前语言不一致');

  await page.getByTestId('transfer-switch-language').click();

  await expect(page).toHaveURL(/lang=en_US/, { timeout: 15000 });
  await expect(page.getByTestId('transfer-compare-table')).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId('transfer-cloud-lang')).toContainText('EN');
  await expect(
    page.getByTestId('transfer-compare-table').getByText('1 / 0 / 0').first(),
  ).toBeVisible();
});
