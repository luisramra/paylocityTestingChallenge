import { test, expect, request } from '@playwright/test';


test('GET Employee Validation', async ({ request }) => {

  // -----------------------------
  // CREATE
  // -----------------------------

  const newEmployee = {
    firstName: 'Luis',
    lastName: 'Ramos',
    dependants: 2
  };

 const createResponse = await request.post('/Prod/api/Employees', {
    data: newEmployee
  });

  expect(createResponse.status()).toBe(200);

  const created = await createResponse.json();
  const employeeId = created.id;

  expect(created.firstName).toBe('Luis');
  expect(created.dependants).toBe(2);
  console.log('Created Employee:', created);

  // -----------------------------
  // VALIDATE BUSINESS RULES
  // -----------------------------

  const expectedAnnualCost = 1000 + (2 * 500);
  const expectedPerPaycheck = expectedAnnualCost / 26;
  const expectedNet = 2000 - expectedPerPaycheck;

  expect(created.salary).toBe(52000);
  expect(created.gross).toBe(2000);
  expect(created.benefitsCost).toBeCloseTo(expectedPerPaycheck, 3);
  expect(created.net).toBeCloseTo(expectedNet, 3);

  // -----------------------------
  // Consult the created employee
  // -----------------------------

  

  const consultResponse = await request.get(`/Prod/api/Employees/${employeeId}`);
  expect(consultResponse.status()).toBe(200);

  const consulted = await consultResponse.json();
  console.log('Consulted Employee:', consulted);
  expect(consulted.firstName).toBe('Luis');
  expect(consulted.dependants).toBe(2);

  // -----------------------------
  // Consult Non-existent employee  
  // -----------------------------
  const consultNonExistent = await request.get(`/Prod/api/Employees/11111111-1111-1111-1111-111111111111`);
  const consultNonExistentBody = await consultNonExistent.text();
  console.log('Consult Non-existent Employee Response:', consultNonExistentBody);
  expect(consultNonExistent.status()).toBe(404);
  
  // -----------------------------
  // DELETE
  // -----------------------------

  const deleteResponse = await request.delete(`/Prod/api/Employees/${employeeId}`);
  expect(deleteResponse.status()).toBe(200);

});