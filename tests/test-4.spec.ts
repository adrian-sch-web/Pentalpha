import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page.getByTestId('score')).toHaveText("Score: 0");
});