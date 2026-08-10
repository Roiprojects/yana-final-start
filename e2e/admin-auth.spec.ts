import { test, expect } from "@playwright/test";
import { adminLogin, ADMIN_EMAIL, hasAdminCreds } from "./helpers";

test.describe("admin auth", () => {
  test("unauthenticated /admin redirects to login", async ({ page }) => {
    const res = await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
    expect(res).toBeTruthy();
  });

  test("unauthenticated /admin/enquiries redirects to login", async ({
    page,
  }) => {
    await page.goto("/admin/enquiries");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("wrong credentials show an error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(ADMIN_EMAIL);
    await page.getByLabel("Password").fill("definitely-not-the-password");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });

  test.skip(
    !hasAdminCreds,
    "ADMIN_PASSWORD not set — add it to .env (or CI secrets) to run this test.",
  );
  test("valid login reaches the dashboard with real data", async ({ page }) => {
    await adminLogin(page);
    await expect(
      page.getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
    // packages page lists real seeded packages (DB-backed, allow for first compile)
    await page.goto("/admin/packages");
    await expect(page.getByText("Beautiful Bali")).toBeVisible({
      timeout: 20000,
    });
  });
});
