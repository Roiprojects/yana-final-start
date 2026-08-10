import { test, expect } from "@playwright/test";
import { adminLogin as login, hasAdminCreds } from "./helpers";

test.describe("admin shell", () => {
  test("login page renders the sign-in form (no sidebar)", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test.skip(
    !hasAdminCreds,
    "ADMIN_PASSWORD not set — add it to .env (or CI secrets) to run this test.",
  );
  test("dashboard renders with sidebar + real KPIs after login", async ({
    page,
  }) => {
    await login(page);
    await expect(
      page.getByRole("heading", { name: "Dashboard", level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Admin" })).toBeVisible();
    await expect(page.getByText("Manage packages")).toBeVisible();
  });

  test.skip(
    !hasAdminCreds,
    "ADMIN_PASSWORD not set — add it to .env (or CI secrets) to run this test.",
  );
  test("packages module lists real packages with toggles", async ({ page }) => {
    await login(page);
    await page.goto("/admin/packages");
    await expect(
      page.getByRole("heading", { name: "Tour Packages", level: 1 }),
    ).toBeVisible({ timeout: 20000 });
    await expect(page.getByText("Beautiful Bali")).toBeVisible({
      timeout: 20000,
    });
    await expect(page.getByRole("switch").first()).toBeVisible();
  });

  test.skip(
    !hasAdminCreds,
    "ADMIN_PASSWORD not set — add it to .env (or CI secrets) to run this test.",
  );
  test("logout returns to the login page", async ({ page }) => {
    await login(page);
    await page.getByRole("button", { name: /logout/i }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
