import { test, expect } from "@playwright/test";
import { adminLogin as login, hasAdminCreds } from "./helpers";

// Unique per run so a leftover row from a previous failed run can't clash on slug.
const SLUG = `e2e-test-goa-${Date.now()}`;

test.skip(
  !hasAdminCreds,
  "ADMIN_PASSWORD not set — add it to .env (or CI secrets) to run this test.",
);
test("create → appears public → edit → delete", async ({ page }) => {
  await login(page);

  // Create
  await page.goto("/admin/packages/new");
  await page.getByLabel("Title *").fill("E2E Test Goa Getaway");
  await page.getByLabel("Slug *").fill(SLUG);
  await page.getByLabel("Destination").fill("Goa");
  await page.getByLabel("Days").fill("4");
  await page.getByLabel("Nights").fill("3");
  await page.getByLabel("Price (₹ per person)").fill("18999");
  await page.getByLabel("Overview").fill("A short e2e test package.");
  await page
    .getByLabel("Highlights (one per line)")
    .fill("Beaches\nSunset cruise");
  await page.getByRole("button", { name: /create package/i }).click();
  await expect(page).toHaveURL(/\/admin\/packages$/, { timeout: 15000 });
  await expect(page.getByText("E2E Test Goa Getaway")).toBeVisible({
    timeout: 20000,
  });

  // Appears on public detail page
  await page.goto(`/packages/${SLUG}`);
  await expect(
    page.getByRole("heading", { name: "E2E Test Goa Getaway" }),
  ).toBeVisible({ timeout: 20000 });
  await expect(page.getByText(/₹18,999/).first()).toBeVisible({
    timeout: 10000,
  });

  // Edit
  await page.goto("/admin/packages");
  await page
    .getByRole("row", { name: /E2E Test Goa Getaway/ })
    .getByRole("link", { name: /edit/i })
    .click();
  await expect(page).toHaveURL(/\/edit$/, { timeout: 15000 });
  const title = page.getByLabel("Title *");
  await expect(title).toHaveValue("E2E Test Goa Getaway", { timeout: 15000 });
  await title.fill("E2E Test Goa Updated");
  await page.getByRole("button", { name: /save changes/i }).click();
  await expect(page).toHaveURL(/\/admin\/packages$/, { timeout: 15000 });
  await expect(page.getByText("E2E Test Goa Updated")).toBeVisible();

  // Delete
  await page
    .getByRole("row", { name: /E2E Test Goa Updated/ })
    .getByRole("link", { name: /edit/i })
    .click();
  await expect(page).toHaveURL(/\/edit$/, { timeout: 15000 });
  await page.getByRole("button", { name: /^delete$/i }).click();
  await page.getByRole("button", { name: /yes, delete/i }).click();
  await expect(page).toHaveURL(/\/admin\/packages$/, { timeout: 15000 });
  await expect(page.getByText("E2E Test Goa Updated")).toHaveCount(0);
});
