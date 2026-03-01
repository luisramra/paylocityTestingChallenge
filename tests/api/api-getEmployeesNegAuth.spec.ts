import { test, expect } from '@playwright/test';

test('GET /Prod/api/Employees Incorrect Auth', async ({ request }) => {
  const response = await request.get('/Prod/api/Employees', {
    headers: {
      Authorization: `Basic ABCDE123`
    }
  });
  expect(response.status()).toBe(401);
});