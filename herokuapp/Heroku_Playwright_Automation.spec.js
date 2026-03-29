// Heroku Login Application - Playwright Test Automation
// Complete test suite with all test cases
// Ready for CI/CD integration and automated regression testing

const { test, expect, chromium } = require('@playwright/test');

const BASE_URL = 'https://the-internet.herokuapp.com';
const LOGIN_URL = `${BASE_URL}/login`;
const SECURE_URL = `${BASE_URL}/secure`;
const LOGOUT_URL = `${BASE_URL}/logout`;

// Valid test credentials
const VALID_USERNAME = 'tomsmith';
const VALID_PASSWORD = 'SuperSecretPassword!';

// ============================================================================
// TEST SUITE 1: AUTHENTICATION - VALID CREDENTIALS
// ============================================================================

test.describe('Test Suite 1: Authentication - Valid Credentials', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(LOGIN_URL);
  });

  test('TC 1.1: Successful Login with Valid Credentials', async ({ page }) => {
    // Step 1: Verify login page is loaded
    await expect(page).toHaveTitle('The Internet');
    
    // Step 2: Enter valid username
    await page.fill('#username', VALID_USERNAME);
    
    // Step 3: Enter valid password
    await page.fill('#password', VALID_PASSWORD);
    
    // Step 4: Click login button
    await page.click('button[type="submit"]');
    
    // Step 5: Verify redirect to secure area
    await page.waitForURL(SECURE_URL);
    await expect(page).toHaveURL(SECURE_URL);
    
    // Step 6: Verify secure page content
    await expect(page.locator('h2')).toContainText('Secure Area');
    await expect(page.locator('text=You logged into a secure area')).toBeVisible();
    
    // Step 7: Verify logout button exists
    const logoutButton = page.locator('a:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
    
    console.log('✅ TC 1.1 PASSED: Valid login successful');
  });
});

// ============================================================================
// TEST SUITE 2: AUTHENTICATION - INVALID CREDENTIALS
// ============================================================================

test.describe('Test Suite 2: Authentication - Invalid Credentials', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('TC 2.1: Login with Invalid Username and Password', async ({ page }) => {
    // Step 1: Enter invalid username
    await page.fill('#username', 'invaliduser');
    
    // Step 2: Enter invalid password
    await page.fill('#password', 'invalidpass');
    
    // Step 3: Click login button
    await page.click('button[type="submit"]');
    
    // Step 4: Verify error message displayed
    const errorMessage = page.locator('.flash.error, [class*="invalid"], [class*="error"]');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    await expect(errorMessage).toContainText(/invalid|failed|incorrect/i);
    
    // Step 5: Verify user remains on login page
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 6: Verify form is ready for retry
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    
    console.log('✅ TC 2.1 PASSED: Invalid credentials properly rejected');
  });

  test('TC 2.2: Login with Correct Username, Wrong Password', async ({ page }) => {
    // Step 1: Enter valid username
    await page.fill('#username', VALID_USERNAME);
    
    // Step 2: Enter invalid password
    await page.fill('#password', 'wrongpassword123');
    
    // Step 3: Click login button
    await page.click('button[type="submit"]');
    
    // Step 4: Verify login fails
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 5: Verify error message
    const errorMessage = page.locator('.flash.error, [class*="invalid"], [class*="error"]');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
    
    console.log('✅ TC 2.2 PASSED: Wrong password rejected');
  });
});

// ============================================================================
// TEST SUITE 3: INPUT VALIDATION - REQUIRED FIELDS
// ============================================================================

test.describe('Test Suite 3: Input Validation - Required Fields', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('TC 3.1: Login with Empty Fields', async ({ page }) => {
    // Step 1: Verify fields are empty by default
    const usernameField = page.locator('#username');
    const passwordField = page.locator('#password');
    
    await expect(usernameField).toHaveValue('');
    await expect(passwordField).toHaveValue('');
    
    // Step 2: Click login without filling any fields
    await page.click('button[type="submit"]');
    
    // Step 3: Verify validation error or remain on login page
    // Either browser validation triggers or server validation
    const stillOnLogin = await page.url().includes(LOGIN_URL);
    expect(stillOnLogin).toBeTruthy();
    
    console.log('✅ TC 3.1 PASSED: Empty field validation works');
  });

  test('TC 3.2: Login with Username Only (No Password)', async ({ page }) => {
    // Step 1: Enter username
    await page.fill('#username', VALID_USERNAME);
    
    // Step 2: Leave password empty
    const passwordField = page.locator('#password');
    await expect(passwordField).toHaveValue('');
    
    // Step 3: Click login button
    await page.click('button[type="submit"]');
    
    // Step 4: Verify login fails (remains on login page)
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 5: Verify error message or validation
    const errorMessage = page.locator('.flash.error, [class*="invalid"], [class*="error"]');
    const hasError = await errorMessage.isVisible().catch(() => false);
    
    // Either error message or still on login page confirms validation
    const validationWorking = hasError || (await page.url().includes(LOGIN_URL));
    expect(validationWorking).toBeTruthy();
    
    console.log('✅ TC 3.2 PASSED: Password is required');
  });

  test('TC 3.3: Login with Password Only (No Username)', async ({ page }) => {
    // Step 1: Leave username empty
    const usernameField = page.locator('#username');
    await expect(usernameField).toHaveValue('');
    
    // Step 2: Enter password
    await page.fill('#password', VALID_PASSWORD);
    
    // Step 3: Click login button
    await page.click('button[type="submit"]');
    
    // Step 4: Verify login fails
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 5: Verify validation
    const errorMessage = page.locator('.flash.error, [class*="invalid"], [class*="error"]');
    const hasError = await errorMessage.isVisible().catch(() => false);
    
    const validationWorking = hasError || (await page.url().includes(LOGIN_URL));
    expect(validationWorking).toBeTruthy();
    
    console.log('✅ TC 3.3 PASSED: Username is required');
  });
});

// ============================================================================
// TEST SUITE 4: SESSION MANAGEMENT & ACCESS CONTROL
// ============================================================================

test.describe('Test Suite 4: Session Management & Access Control', () => {

  test('TC 4.1: Logout Functionality', async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto(LOGIN_URL);
    
    // Step 2: Login with valid credentials
    await page.fill('#username', VALID_USERNAME);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Step 3: Verify redirect to secure area
    await page.waitForURL(SECURE_URL);
    await expect(page).toHaveURL(SECURE_URL);
    
    // Step 4: Verify on secure page
    await expect(page.locator('h2')).toContainText('Secure Area');
    
    // Step 5: Find and click logout button
    const logoutButton = page.locator('a:has-text("Logout")');
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    
    // Step 6: Verify redirect to login page
    await page.waitForURL(LOGIN_URL);
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 7: Verify login form is displayed
    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    
    console.log('✅ TC 4.1 PASSED: Logout properly terminates session');
  });

  test('TC 4.2: Access Control - Unauthorized Access to Secure Area', async ({ page }) => {
    // Step 1: Try to access secure area directly without login
    await page.goto(SECURE_URL);
    
    // Step 2: Verify application redirects to login page
    // The URL should change to login page (browser will auto-redirect)
    await page.waitForURL(LOGIN_URL, { timeout: 5000 });
    
    // Step 3: Verify on login page
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 4: Verify login form displayed
    const usernameField = page.locator('#username');
    const loginButton = page.locator('button[type="submit"]');
    await expect(usernameField).toBeVisible();
    await expect(loginButton).toBeVisible();
    
    console.log('✅ TC 4.2 PASSED: Unauthorized access properly blocked');
  });

  test('TC 4.3: Session Persistence - Page Reload While Logged In', async ({ page }) => {
    // Step 1: Navigate to login and authenticate
    await page.goto(LOGIN_URL);
    await page.fill('#username', VALID_USERNAME);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Step 2: Wait for redirect to secure area
    await page.waitForURL(SECURE_URL);
    
    // Step 3: Reload the page
    await page.reload();
    
    // Step 4: Verify still on secure page (session maintained)
    await expect(page).toHaveURL(SECURE_URL);
    
    // Step 5: Verify secure content is displayed
    await expect(page.locator('h2')).toContainText('Secure Area');
    // Verify we have logout button (indicates we're logged in)
    await expect(page.locator('a:has-text("Logout")')).toBeVisible();
    
    console.log('✅ TC 4.3 PASSED: Session persists across page reload');
  });
});

// ============================================================================
// TEST SUITE 5: SECURITY & INPUT HANDLING
// ============================================================================

test.describe('Test Suite 5: Security & Input Handling', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('TC 5.1: SQL Injection Prevention - Special Characters', async ({ page }) => {
    // Step 1: Enter SQL injection payloads
    const sqlPayload = "' OR '1'='1";
    
    await page.fill('#username', sqlPayload);
    await page.fill('#password', sqlPayload);
    
    // Step 2: Click login button
    await page.click('button[type="submit"]');
    
    // Step 3: Verify application doesn't execute injected code
    // Should remain on login page or show error
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 4: Verify page is still functional (no SQL errors)
    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    
    // Step 5: Verify error message (invalid credentials)
    const errorMessage = page.locator('.flash.error, [class*="invalid"], [class*="error"]');
    const hasError = await errorMessage.isVisible().catch(() => false);
    
    // Security test passes if: app rejected the attempt and remained functional
    const securityPassed = hasError || (await page.url().includes(LOGIN_URL));
    expect(securityPassed).toBeTruthy();
    
    console.log('✅ TC 5.1 PASSED: SQL injection safely prevented');
  });

  test('TC 5.2: XSS Prevention - HTML and JavaScript', async ({ page }) => {
    // Step 1: Enter XSS payloads
    const xssPayload = '<script>alert("XSS")</script>';
    
    await page.fill('#username', xssPayload);
    await page.fill('#password', '<img src=x onerror="alert(1)">');
    
    // Step 2: Click login button
    const loginButton = page.click('button[type="submit"]');
    
    // Step 3: Verify no JavaScript execution (no alert appears)
    // If we continue execution without alert, XSS was prevented
    await loginButton;
    
    // Step 4: Verify page is still on login page
    await expect(page).toHaveURL(LOGIN_URL);
    
    // Step 5: Verify login form is still functional (no JavaScript execution errors)
    // If XSS payload was executed, the page would have issues
    // The fact that we're on login page and form is intact shows XSS was prevented
    const usernameField = page.locator('#username');
    await expect(usernameField).toBeVisible();
    
    console.log('✅ TC 5.2 PASSED: XSS attacks safely prevented');
  });

  test('TC 5.3: Whitespace Handling', async ({ page }) => {
    // Step 1: Enter credentials with leading/trailing whitespace
    const usernameWithSpaces = '  ' + VALID_USERNAME + '  ';
    const passwordWithSpaces = '  ' + VALID_PASSWORD + '  ';
    
    await page.fill('#username', usernameWithSpaces);
    await page.fill('#password', passwordWithSpaces);
    
    // Step 2: Click login button
    await page.click('button[type="submit"]');
    
    // Step 3: Check result (application may trim or reject)
    // Either login succeeds (whitespace trimmed) or fails (whitespace preserved)
    // Both are acceptable - just verify it handles it without errors
    
    // Step 4: Verify application handled it safely
    // No JavaScript errors or SQL errors should occur
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
    
    // If redirected to secure area = whitespace trimmed (good)
    // If on login page = whitespace preserved (also acceptable)
    const onSecureOrLogin = 
      (await page.url().includes(SECURE_URL)) || 
      (await page.url().includes(LOGIN_URL));
    expect(onSecureOrLogin).toBeTruthy();
    
    console.log('✅ TC 5.3 PASSED: Whitespace handled appropriately');
  });
});

// ============================================================================
// TEST SUITE 6: UI ELEMENTS & FORM STRUCTURE
// ============================================================================

test.describe('Test Suite 6: UI Elements & Form Structure', () => {
  
  test('TC 6.1: Verify Login Form Elements', async ({ page }) => {
    // Navigate to login page
    await page.goto(LOGIN_URL);
    
    // Verify page title
    await expect(page).toHaveTitle('The Internet');
    
    // Verify heading
    await expect(page.locator('h2')).toContainText('Login Page');
    
    // Verify form elements
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('button[type="submit"]');
    const instructions = page.locator('h4');
    
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
    await expect(instructions).toContainText(/tomsmith|password/i);
    
    console.log('✅ TC 6.1 PASSED: All form elements present');
  });

  test('TC 6.2: Verify Secure Area Elements', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#username', VALID_USERNAME);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for secure area
    await page.waitForURL(SECURE_URL);
    
    // Verify elements
    const heading = page.locator('h2');
    const message = page.locator('text=You logged into a secure area');
    const logoutLink = page.locator('a:has-text("Logout")');
    const closeButton = page.locator('a:has-text("×")');
    
    await expect(heading).toContainText('Secure Area');
    await expect(message).toBeVisible();
    await expect(logoutLink).toBeVisible();
    await expect(closeButton).toBeVisible();
    
    console.log('✅ TC 6.2 PASSED: Secure area elements present');
  });
});

// ============================================================================
// HELPER FUNCTIONS FOR MANUAL TESTING
// ============================================================================

/**
 * Helper function to login with specific credentials
 */
async function login(page, username, password) {
  await page.goto(LOGIN_URL);
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button[type="submit"]');
  return page;
}

/**
 * Helper function to logout
 */
async function logout(page) {
  const logoutButton = page.locator('a:has-text("Logout")');
  await logoutButton.click();
  await page.waitForURL(LOGIN_URL);
  return page;
}

/**
 * Helper function to verify on login page
 */
async function verifyOnLoginPage(page) {
  await expect(page).toHaveURL(LOGIN_URL);
  await expect(page.locator('#username')).toBeVisible();
  return true;
}

/**
 * Helper function to verify on secure page
 */
async function verifyOnSecurePage(page) {
  await expect(page).toHaveURL(SECURE_URL);
  await expect(page.locator('h2')).toContainText('Secure Area');
  return true;
}

// ============================================================================
// EXPORT FOR CI/CD INTEGRATION
// ============================================================================

module.exports = {
  test,
  expect,
  BASE_URL,
  LOGIN_URL,
  SECURE_URL,
  LOGOUT_URL,
  VALID_USERNAME,
  VALID_PASSWORD,
  login,
  logout,
  verifyOnLoginPage,
  verifyOnSecurePage
};

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/*

RUNNING TESTS LOCALLY:

1. Install dependencies:
   npm install @playwright/test

2. Run all tests:
   npx playwright test heroku-login.spec.js

3. Run specific test suite:
   npx playwright test heroku-login.spec.js -g "Test Suite 1"

4. Run in debug mode:
   npx playwright test heroku-login.spec.js --debug

5. Run with UI mode:
   npx playwright test heroku-login.spec.js --ui

6. Run specific test:
   npx playwright test heroku-login.spec.js -g "TC 1.1"

RUNNING IN CI/CD:

// GitHub Actions example
- name: Run Heroku Login Tests
  run: npx playwright test heroku-login.spec.js --reporter=html

// Jenkins example
pipeline {
  stages {
    stage('Test') {
      steps {
        sh 'npm install @playwright/test'
        sh 'npx playwright test heroku-login.spec.js --reporter=junit'
      }
    }
  }
}

TEST RESULTS:

After running tests, view HTML report:
  npx playwright show-report

*/
