import { test, expect, request } from '@playwright/test';


test('CREATE Employee Negative Dependants Validation', async ({ request }) => {

  // -----------------------------
  // CREATE with invalid dependants
  // -----------------------------

  const newEmployee = {
    firstName: 'Luis',
    lastName: 'Ramos',
    dependants: "two"
  };

 const createResponse = await request.post('/Prod/api/Employees', {
    data: newEmployee
  });

  
  expect(createResponse.status()).toBe(400);
  const created = await createResponse.json();
  console.log('Created Employee:', created);
  const employeeId = created.id;
});

test('CREATE Employee Negative firstName Validation', async ({ request }) => {

  // -----------------------------
  // CREATE with invalid firstName
  // -----------------------------

  const newEmployee = {
    firstName: 2,
    lastName: 'Ramos',
    dependants: 2
  };

 const createResponse = await request.post('/Prod/api/Employees', {
    data: newEmployee
  });

  
  expect(createResponse.status()).toBe(400);
  const created = await createResponse.json();
  console.log('Created Employee:', created);
  const employeeId = created.id;
});

test('CREATE Employee Negative lastName Validation', async ({ request }) => {

  // -----------------------------
  // CREATE with invalid lastName
  // -----------------------------

  const newEmployee = {
    firstName: 'Luis',
    lastName: 2,
    dependants: 2
  };

 const createResponse = await request.post('/Prod/api/Employees', {
    data: newEmployee
  });

  
  expect(createResponse.status()).toBe(400);
  const created = await createResponse.json();
  console.log('Created Employee:', created);
  const employeeId = created.id;
});

test('CREATE Employee Negative salary Validation', async ({ request }) => {

  // -----------------------------
  // CREATE with invalid salary
  // -----------------------------

  const newEmployee = {
    firstName: 'luis',
    lastName: 'Ramos',
    dependants: "2", 
  };

 const createResponse = await request.post('/Prod/api/Employees', {
    data: newEmployee
  });

  const created = await createResponse.json();
  console.log('Created Employee:', created);
  const employeeId = created.id;
  
  expect(createResponse.status()).toBe(400);
});
