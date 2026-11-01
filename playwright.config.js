import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1, timeout: 120000,
  use: { baseURL: 'http://127.0.0.1:4173', ...devices['Desktop Chrome'], trace: 'retain-on-failure' },
  webServer: { command: 'npm run preview', url: 'http://127.0.0.1:4173/fr/', reuseExistingServer: !process.env.CI },
});
