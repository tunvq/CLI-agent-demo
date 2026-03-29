import { test, expect, Page } from '@playwright/test';

// =====================================
// AI Interview - Playwright Test Suite
// URL: https://interview.koffi.vn/
// Auth: SSO via Keycloak
// =====================================

const BASE_URL = 'https://interview.koffi.vn';
const SSO_USERNAME = 'tu.nguyen@zamo.io';
const SSO_PASSWORD = 'admin';

// ─────────────────────────────────────
// Shared login helper
// ─────────────────────────────────────
async function loginWithSSO(page: Page): Promise<void> {
  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle');

  // Click "Sign in with SSO" on landing page
  await page.click('button:has-text("Sign in with SSO")');
  await page.waitForURL(/auth\/realms\/zamo/);

  // Fill Keycloak login form
  await page.fill('#username', SSO_USERNAME);
  await page.fill('#password', SSO_PASSWORD);
  await page.click('#kc-login');

  // Wait for redirect back to the app
  await page.waitForURL(`${BASE_URL}/interview-templates`, { timeout: 15000 });
}

// =====================================
// Test Suite 1: Authentication
// =====================================
test.describe('TC-001: Authentication - SSO Login', () => {

  test('TC-001: Successful SSO Login', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verify landing page
    await expect(page.locator('text=Sign in with SSO')).toBeVisible();
    await expect(page.locator('text=Practice smarter. Land your next job.')).toBeVisible();

    // Click SSO button
    await page.click('button:has-text("Sign in with SSO")');
    await page.waitForURL(/auth\/realms\/zamo/);

    // Fill Keycloak credentials
    await page.fill('#username', SSO_USERNAME);
    await page.fill('#password', SSO_PASSWORD);
    await page.click('#kc-login');

    // Assert redirect to Interview Templates
    await page.waitForURL(`${BASE_URL}/interview-templates`, { timeout: 15000 });
    await expect(page).toHaveURL(`${BASE_URL}/interview-templates`);
    await expect(page.locator('h1')).toContainText('Mock Interview Templates');
  });

  test('TC-002: Login with Invalid Credentials', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("Sign in with SSO")');
    await page.waitForURL(/auth\/realms\/zamo/);

    await page.fill('#username', 'invalid@test.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('#kc-login');

    // Should stay on Keycloak page with error
    await expect(page).toHaveURL(/auth\/realms\/zamo/);
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('TC-003: Login with Empty Fields', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("Sign in with SSO")');
    await page.waitForURL(/auth\/realms\/zamo/);

    // Try to submit without filling fields
    await page.click('#kc-login');

    // Should remain on login page
    await expect(page).toHaveURL(/auth\/realms\/zamo/);
  });

  test('TC-005: Access Protected Pages Without Login', async ({ page }) => {
    // Navigate directly without logging in
    await page.goto(`${BASE_URL}/interview-templates`);
    // Should be redirected to SSO
    await expect(page).toHaveURL(/auth\/realms\/zamo|${BASE_URL}\/login|${BASE_URL}\/?$/);
  });

});

// =====================================
// Test Suite 2: Navigation
// =====================================
test.describe('Navigation - Sidebar', () => {

  test.beforeEach(async ({ page }) => {
    await loginWithSSO(page);
  });

  test('TC-006: Navigate to Interview Templates', async ({ page }) => {
    await page.click('a[href="/interview-templates"]');
    await expect(page).toHaveURL(`${BASE_URL}/interview-templates`);
    await expect(page.locator('h1')).toContainText('Mock Interview Templates');
    await expect(page.locator('text=New Template')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('TC-007: Navigate to Interview Sessions', async ({ page }) => {
    await page.click('a[href="/interview-sessions"]');
    await expect(page).toHaveURL(`${BASE_URL}/interview-sessions`);
    await expect(page.locator('h1')).toContainText('Interview Sessions');
    await expect(page.locator('text=Your Interview History')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('TC-008: Navigate to Usage Requests', async ({ page }) => {
    await page.click('a[href="/usage-requests"]');
    await expect(page).toHaveURL(`${BASE_URL}/usage-requests`);
    await expect(page.locator('h1')).toContainText('My Usage Requests');
    await expect(page.locator('text=New Request')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('TC-028: Browser Refresh Maintains Session', async ({ page }) => {
    await page.goto(`${BASE_URL}/interview-templates`);
    await page.reload();
    await expect(page).toHaveURL(`${BASE_URL}/interview-templates`);
    await expect(page.locator('h1')).toContainText('Mock Interview Templates');
  });

});

// =====================================
// Test Suite 3: Interview Templates
// =====================================
test.describe('Interview Templates', () => {

  test.beforeEach(async ({ page }) => {
    await loginWithSSO(page);
    await page.goto(`${BASE_URL}/interview-templates`);
  });

  test('TC-010: Templates List Displays Correctly', async ({ page }) => {
    // Verify table headers
    await expect(page.locator('th:has-text("Job Title")')).toBeVisible();

    // Verify at least one row exists
    const rows = page.locator('tbody tr');
    await expect(rows.first()).toBeVisible();
  });

  test('TC-011: New Template Button Visible and Clickable', async ({ page }) => {
    // Verify "New Template" CTA is visible
    const newTemplateButton = page.locator('button:has-text("New Template")');
    await expect(newTemplateButton).toBeVisible();

    // Click it and verify navigation/modal opens
    await newTemplateButton.click();
    await page.waitForTimeout(1000);
    // Verify a form or new page opened (URL changed or dialog appeared)
    const hasDialog = await page.locator('[role="dialog"]').isVisible().catch(() => false);
    const urlChanged = page.url() !== `${BASE_URL}/interview-templates`;
    expect(hasDialog || urlChanged).toBeTruthy();
  });

  test('TC-012: Click Template Row to View Details', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();
    await firstRow.click();
    await page.waitForTimeout(1000);
    // URL should change to include a template ID
    expect(page.url()).not.toBe(`${BASE_URL}/interview-templates`);
  });

});

// =====================================
// Test Suite 4: Interview Sessions
// =====================================
test.describe('Interview Sessions', () => {

  test.beforeEach(async ({ page }) => {
    await loginWithSSO(page);
    await page.goto(`${BASE_URL}/interview-sessions`);
  });

  test('TC-014: Sessions List Displays Correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Interview Sessions');
    await expect(page.locator('text=Your Interview History')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // Verify columns
    await expect(page.locator('th:has-text("Job Title")')).toBeVisible();
    await expect(page.locator('th:has-text("Company")')).toBeVisible();
  });

  test('TC-016: Click Session Row to View Report', async ({ page }) => {
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();
    await firstRow.click();
    await page.waitForTimeout(1000);
    // URL should change to a session detail/report page
    expect(page.url()).not.toBe(`${BASE_URL}/interview-sessions`);
  });

});

// =====================================
// Test Suite 5: Usage Requests
// =====================================
test.describe('Usage Requests', () => {

  test.beforeEach(async ({ page }) => {
    await loginWithSSO(page);
    await page.goto(`${BASE_URL}/usage-requests`);
  });

  test('TC-018: Usage Requests List Displays Correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('My Usage Requests');
    await expect(page.locator('text=Request Increased Usage')).toBeVisible();
    await expect(page.locator('text=New Request')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();

    // Verify columns
    await expect(page.locator('th:has-text("Requested Sessions")')).toBeVisible();
    await expect(page.locator('th:has-text("Requested Time")')).toBeVisible();
    await expect(page.locator('th:has-text("Reason")')).toBeVisible();
  });

  test('TC-019: New Request Button Opens Form', async ({ page }) => {
    const newRequestButton = page.locator('button:has-text("New Request")');
    await expect(newRequestButton).toBeVisible();
    await newRequestButton.click();
    await page.waitForTimeout(1000);
    // Verify modal or form opened
    const hasDialog = await page.locator('[role="dialog"]').isVisible().catch(() => false);
    const urlChanged = page.url() !== `${BASE_URL}/usage-requests`;
    expect(hasDialog || urlChanged).toBeTruthy();
  });

});

// =====================================
// Test Suite 6: Smoke Test
// =====================================
test.describe('TC-029: Smoke Test - Critical Path', () => {

  test('TC-029: Full Smoke Test', async ({ page }) => {
    // Step 1: Login
    await loginWithSSO(page);
    await expect(page).toHaveURL(`${BASE_URL}/interview-templates`);

    // Step 2: Verify Interview Templates
    await expect(page.locator('h1')).toContainText('Mock Interview Templates');
    await expect(page.locator('table')).toBeVisible();

    // Step 3: Navigate to Interview Sessions
    await page.click('a[href="/interview-sessions"]');
    await expect(page).toHaveURL(`${BASE_URL}/interview-sessions`);
    await expect(page.locator('h1')).toContainText('Interview Sessions');
    await expect(page.locator('table')).toBeVisible();

    // Step 4: Navigate to Usage Requests
    await page.click('a[href="/usage-requests"]');
    await expect(page).toHaveURL(`${BASE_URL}/usage-requests`);
    await expect(page.locator('h1')).toContainText('My Usage Requests');
    await expect(page.locator('table')).toBeVisible();

    // Step 5: Navigate back to Interview Templates
    await page.click('a[href="/interview-templates"]');
    await expect(page).toHaveURL(`${BASE_URL}/interview-templates`);

    // Success!
    console.log('✅ Smoke test passed: All 3 core sections are accessible.');
  });

});
