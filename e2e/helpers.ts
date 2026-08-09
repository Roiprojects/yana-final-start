import { expect, type Page } from "@playwright/test";

/** Admin credentials come from the environment (never hardcoded / committed). */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@yanaindia.com";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export async function adminLogin(page: Page) {
  if (!ADMIN_PASSWORD) {
    throw new Error(
      "ADMIN_PASSWORD is not set — add it to .env.local (or the environment) to run admin e2e tests.",
    );
  }
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(ADMIN_EMAIL);
  await page.getByLabel("Password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/admin$/, { timeout: 15000 });
}
