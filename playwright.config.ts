import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files recursively in the project
  testDir: '.',
  testMatch: '**/*.spec.ts',

  // Timeout per test
  timeout: 30_000,

  // Fail fast in CI – run retries locally
  retries: process.env.CI ? 1 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Reporter: console + HTML
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],

  use: {
    // Run headless in CI, headed locally
    headless: true,

    // Slow down clicks slightly for SSO redirects
    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    // Capture screenshot on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
