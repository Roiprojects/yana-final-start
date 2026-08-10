import { defineConfig, devices } from "@playwright/test";

// Load local env (admin creds, DB url) so tests can read them without hardcoding secrets.
try {
  process.loadEnvFile(".env");
} catch {
  // .env not present (e.g. CI) — rely on process env instead.
}

// Dedicated port so the Express server can't clash with other local dev servers.
const PORT = process.env.PLAYWRIGHT_PORT ?? "3100";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
      // Admin UI collapses its sidebar on small screens — admin flows are
      // desktop-only; public-site tests still run on both projects.
      testIgnore: /admin.*\.spec\.ts/,
    },
  ],
  webServer: {
    // Production-style: build the SPA, then serve it + the API from Express.
    command: "npm run build && npm run start:server",
    url: baseURL,
    env: { PORT },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
