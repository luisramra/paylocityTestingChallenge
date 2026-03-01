import { test, expect } from '@playwright/test';


test('GET Prod/api/Employees requires authorization', async ({ request }) => {
  const response = await request.get('/Prod/api/Employees', {
    headers: {
      Authorization: ''
    }
  });
  expect(response.status()).toBe(401);
});