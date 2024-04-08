import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.goto('http://localhost:4200/');
  await expect(page.getByText('Score:')).toHaveText('Score: 0');
});
