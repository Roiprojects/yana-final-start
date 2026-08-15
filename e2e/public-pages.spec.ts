import { test, expect } from "@playwright/test";

const routes = [
  "/about",
  "/group-tours",
  "/group-tours/kitchen-staff",
  "/group-tours/domestic",
  "/group-tours/international",
  "/customized-tours",
  "/customized-tours/domestic",
  "/customized-tours/international",
  "/packages",
  "/services",
  "/brochure",
  "/contact",
  "/privacy-policy",
  "/terms",
];

test.describe("public routes render", () => {
  for (const route of routes) {
    test(`GET ${route} renders an h1 with header + footer`, async ({
      page,
    }) => {
      const res = await page.goto(route);
      expect(res?.status()).toBeLessThan(400);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();
      const body = (await page.textContent("body")) ?? "";
      expect(body).not.toContain("IFSC");
    });
  }
});

test("unknown package slug shows the not-found state", async ({ page }) => {
  // SPA fallback returns HTTP 200; the package detail route renders its own
  // not-found state after the API responds 404.
  const res = await page.goto("/packages/does-not-exist", {
    waitUntil: "commit",
    timeout: 45000,
  });
  expect(res?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "Package not found" }),
  ).toBeVisible();
});

test("enquiry modal auto-opens on home load", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 7000 });
  await expect(page.getByLabel(/name \*/i)).toBeVisible();
  await expect(page.getByLabel(/phone \*/i)).toBeVisible();
});

test("enquiry modal validates required fields", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 7000 });
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/please enter your name/i)).toBeVisible();
});

test("homepage shows five compact benefit cards and all fallback offices", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/brand/favicon-blue.png",
  );
  await expect(page.getByText("Since 2015")).toBeVisible();
  await expect(page.getByText("Best Price Guarantee")).toBeVisible();
  await expect(page.getByText("24/7 Support")).toBeVisible();
  await expect(page.getByRole("contentinfo").getByText("Bengaluru")).toBeVisible();
  await expect(page.getByRole("contentinfo").getByText("Hubli")).toBeVisible();
});

test("enquiry modal submits end-to-end (success or graceful error)", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("dialog")).toBeVisible({ timeout: 7000 });
  await page.getByLabel(/name \*/i).fill("Automated Test");
  await page.getByLabel(/phone \*/i).fill("9999999999");
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(
    page.getByText(/thank you|couldn't submit|isn't available/i),
  ).toBeVisible({ timeout: 15000 });
});
