import { test, expect } from '@playwright/test';
import { login } from '../../utils/login';

test('UI-001: double click on Save sends multiple POST requests', async ({ browser }) => {

    // Login
    const page = await login(browser);

    // Contador de POST
    let postCount = 0;


    // Abrir modal Add Employee
    await page.click('button:has-text("Add Employee")');
    page.on('request', req => {
        if (
            req.method() === 'POST' &&
            req.url().includes('/api/employees')
        ) {
            postCount++;
        }
    });

    // Llenar formulario
    await page.fill('input[name="firstName"]', 'Auto');
    await page.fill('input[name="lastName"]', 'Duplicate');
    await page.fill('input[name="dependants"]', '2');

    // Doble click
    await page.dblclick('button#addEmployee');

    // Esperar un poco a que se envíen requests
    await page.waitForTimeout(1000);


    // Assert (esto fallará actualmente)
    expect(postCount).toBe(1);
});