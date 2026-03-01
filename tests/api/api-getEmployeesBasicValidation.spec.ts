import { test, expect } from '@playwright/test';

test('GET /Prod/api/Employees Basic validation of rules', async ({ request }) => {
  const response = await request.get('/Prod/api/Employees', {
    headers: {
      Authorization: `Basic ${process.env.AUTH_TOKEN}`
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);

  body.forEach((employee: any) => {

    expect(employee.salary).toBe(52000);
    expect(employee.gross).toBe(2000);

    const expectedAnnualCost = 1000 + (employee.dependants * 500);
    const expectedCostPerPaycheck = expectedAnnualCost / 26;
    const expectedNet = employee.gross - expectedCostPerPaycheck;

    expect(employee.benefitsCost).toBeCloseTo(expectedCostPerPaycheck, 2);
    expect(employee.net).toBeCloseTo(expectedNet, 2);
  });

});