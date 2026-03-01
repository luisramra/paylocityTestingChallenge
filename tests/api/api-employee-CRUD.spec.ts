import { test, expect, request } from '@playwright/test';


test('Employee CRUD Validation', async ({ request }) => {

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
  // 3️⃣ EDIT
  // -----------------------------

  const updatePayload = {
    id: employeeId,
    firstName: 'Rosa',
    lastName: 'Garcia',
    dependants: 3
  };

  const editResponse = await request.put('/Prod/api/Employees/11111111-1111-1111-1111-111111111111', {
    data: updatePayload
  });

  expect(editResponse.status()).toBe(200);

  const updated = await editResponse.json();

  const expectedAnnualCostUpdated = 1000 + (3 * 500);
  const expectedPerPaycheckUpdated = expectedAnnualCostUpdated / 26;
  const expectedNetUpdated = 2000 - expectedPerPaycheckUpdated;

  expect(updated.dependants).toBe(3);
  expect(updated.benefitsCost).toBeCloseTo(expectedPerPaycheckUpdated, 3);
  expect(updated.net).toBeCloseTo(expectedNetUpdated, 3);

  console.log('Updated Employee:', updated);

  const getAfterUpdate = await request.get(`/Prod/api/Employees/`);
  console.log('Before delete: ', await getAfterUpdate.json());
  // -----------------------------
  // 4️⃣ DELETE
  // -----------------------------

  const deleteResponse = await request.delete(`/Prod/api/Employees/${employeeId}`);
  expect(deleteResponse.status()).toBe(200);

  // -----------------------------
  // 5️⃣ VERIFY DELETE
  // -----------------------------

  const getAfterDelete = await request.get(`/Prod/api/Employees/${employeeId}`); 
  console.log('after delete:', await getAfterDelete.text());
  const secondDelete = await request.delete(`/Prod/api/Employees/${employeeId}`);
  console.log(secondDelete.status());
  expect(getAfterDelete.status()).toBe(404);

  const getAllAfterDelete = await request.get(`/Prod/api/Employees/`);
  console.log('All employees after delete: ', await getAllAfterDelete.json());
});