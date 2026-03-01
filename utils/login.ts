import { Browser, expect } from '@playwright/test';

export async function login(browser: Browser) {

  const context = await browser.newContext({
    extraHTTPHeaders: {}
  });

  const page = await context.newPage();

  await page.goto('/Prod/Account/LogIn');

  await page.locator('#Username').fill(process.env.UI_USERNAME!);
  await page.locator('#Password').fill(process.env.UI_PASSWORD!);

  await expect(page.locator('#Username')).toHaveValue(process.env.UI_USERNAME!);
  await expect(page.locator('#Password')).toHaveValue(process.env.UI_PASSWORD!);

  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('button[type="submit"]').click(),
  ]);

  await expect(page).not.toHaveURL(/LogIn/);

  return page;
}