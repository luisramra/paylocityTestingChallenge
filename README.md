This repository contains my submission for the Software Test Engineer assessment.

The project includes:

    API automated tests (Playwright)
    UI automated tests (Playwright)
    Manual bug findings for both API and UI
    Concurrency and data integrity validation scenarios

▶️ How to Run the Project
1️⃣ Install dependencies
npm install
2️⃣ Create .env file
UI_USERNAME=yourUsername
UI_PASSWORD=yourPassword
(API token if required)

3️⃣ Run all tests
npx playwright test
4️⃣ Run specific test
npx playwright test tests/ui/ui-005-concurrency.spec.ts
5️⃣ View HTML report
npx playwright show-report
⚙️ Project Structure
/tests
  /api
  /ui
/utils
playwright.config.ts
🧠 Design Decisions

Playwright chosen for unified API + UI testing

Unique data generation used to prevent environment pollution

Concurrency tests use isolated browser contexts

Workers limited to 1 to avoid state interference

Environment variables used for credentials security

🚨 Notes

Some automated tests intentionally fail because they validate confirmed defects in the system (e.g., duplicate submission behavior and concurrency corruption).

These failing assertions are included to explicitly demonstrate defect reproducibility.