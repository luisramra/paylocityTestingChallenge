import { test, expect } from '@playwright/test';

test('GET /Prod/api/Employees returns a list with auth', async ({ request }) => {
  const response = await request.get('/Prod/api/Employees', {
    headers: {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
});
