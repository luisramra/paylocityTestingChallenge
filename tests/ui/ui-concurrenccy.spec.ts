import { test, expect } from '@playwright/test';
import { login } from '../../utils/login';

test('UI-005: concurrent edit after delete corrupts financial data', async ({ browser }) => {
    // Crear contexto A
    const pageA = await login(browser);
    // Crear empleado
    await pageA.click('button:has-text("Add Employee")');

    await pageA.fill('input[name="firstName"]', 'Concurrent');
    await pageA.fill('input[name="lastName"]', 'Bug');
    await pageA.fill('input[name="dependants"]', '1');

   await pageA.click('button#addEmployee');

    // Esperar que aparezca en tabla
    await expect(pageA.locator('tr:has-text("Concurrent")')).toBeVisible();

    // Abrir edición (sin guardar)
    await pageA.click('tr:has-text("Concurrent") i[class="fas fa-edit"]');

    // Crear contexto B

    const pageB = await login(browser);

    // Eliminar empleado en B
    const rowB = pageB.locator('tr', { hasText: 'Concurrent' });
    await expect(rowB).toBeVisible();
    await rowB.locator('i[class="fas fa-times"]').click();
    await pageB.click('button:has-text("Delete")'); // Confirmar eliminación
    // Confirmar que desaparece
    await expect(rowB).toBeHidden();

    // Volver a A y guardar edición
    await pageA.click('button:has-text("Update")');

    // Recargar para asegurar persistencia
    await pageA.reload();

    const rowA = pageA.locator('tr', { hasText: 'Concurrent' });

    await expect(rowA).toBeVisible();

    const salaryCell = rowA.locator('td').nth(5);
    const netCell = rowA.locator('td').nth(8);     

    await expect(salaryCell).toHaveText('52000');
    await expect(netCell).not.toContainText('-');

});