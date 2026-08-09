import { test, expect } from "@playwright/test";

test.describe("foundation smoke", () => {
  test("home page renders header, hero, and footer", async ({ page }) => {
    await page.goto("/");

    // Brand + tagline
    await expect(
      page.getByRole("link", { name: /yana travels/i }).first(),
    ).toBeVisible();

    // Hero heading
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();

    // Primary CTA
    await expect(
      page.getByRole("link", { name: /explore packages/i }),
    ).toBeVisible();

    // Footer legal links
    await expect(
      page.getByRole("link", { name: /privacy policy/i }),
    ).toBeVisible();
  });

  test("no bank details are exposed on the home page", async ({ page }) => {
    await page.goto("/");
    const body = (await page.textContent("body")) ?? "";
    // Guard against ever reintroducing the old site's exposed account details.
    expect(body).not.toContain("IFSC");
    expect(body).not.toContain("921020007318711");
  });
});
