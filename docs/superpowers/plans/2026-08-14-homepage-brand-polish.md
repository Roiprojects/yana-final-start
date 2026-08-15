# Homepage Brand Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved favicon, header wordmark, homepage card, hero benefits, and footer office changes requested in the `changes/` visual brief.

**Architecture:** Keep the work inside the existing public-site React components and static assets. Use a small Playwright homepage assertion to lock in the visible behavior, then implement the minimal component and asset changes needed to satisfy it.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS v4, Playwright, Express static asset serving

## Global Constraints

- Keep the change set focused on the public site.
- Use the existing navbar blue as the favicon background color behind the logo mark.
- Update the `Yana Travels` wordmark styling in the homepage hero and sticky header to a newer stacked look.
- Remove the gold outer ring around the blue icon tiles in the travel-style cards.
- Rewrite the hero benefits panel to five shorter items with `Since 2015` first.
- Use the navbar blue as the icon background color in the hero benefit cards.
- Ensure the footer shows Udupi, Bengaluru, and Hubli when fallback content is used.

---

### Task 1: Lock Homepage Expectations With Playwright

**Files:**
- Modify: `e2e/public-pages.spec.ts`
- Test: `e2e/public-pages.spec.ts`

**Interfaces:**
- Consumes: public homepage route `/`
- Produces: a failing Playwright assertion that describes the required homepage/footer behavior

- [ ] **Step 1: Write the failing test**

```ts
test("homepage shows five compact benefit cards and all fallback offices", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByText("Since 2015")).toBeVisible();
  await expect(page.getByText("Best Price Guarantee")).toBeVisible();
  await expect(page.getByText("24/7 Support")).toBeVisible();
  await expect(page.getByText("Bengaluru")).toBeVisible();
  await expect(page.getByText("Hubli")).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: FAIL because `Since 2015`, `24/7 Support`, and the extra footer offices are not present yet.

- [ ] **Step 3: Write minimal implementation**

```ts
// Production code changes happen in Tasks 2-4.
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add e2e/public-pages.spec.ts
git commit -m "test: cover homepage brand polish"
```

### Task 2: Update Shared Branding and Favicon

**Files:**
- Create: `public/brand/favicon-blue.png`
- Modify: `index.html`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/pages/home.tsx`

**Interfaces:**
- Consumes: existing `/brand/yana-logo.png` asset and public homepage/header layout
- Produces: updated favicon asset reference and the refined stacked wordmark treatment

- [ ] **Step 1: Write the failing test**

```ts
await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
  "href",
  "/brand/favicon-blue.png",
);
await expect(page.getByLabel("Yana Travels home").first()).toContainText(
  "Yana",
);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: FAIL because the favicon still points to the old file and the updated UI is not present yet.

- [ ] **Step 3: Write minimal implementation**

```ts
<link rel="icon" href="/brand/favicon-blue.png" type="image/png" />
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: PASS after Tasks 3-4 are complete.

- [ ] **Step 5: Commit**

```bash
git add index.html public/brand/favicon-blue.png src/components/layout/site-header.tsx src/pages/home.tsx
git commit -m "feat: refresh homepage branding treatment"
```

### Task 3: Tighten Homepage Cards and Benefits Panel

**Files:**
- Modify: `src/pages/home.tsx`
- Modify: `src/components/marketing/hero-features-panel.tsx`

**Interfaces:**
- Consumes: homepage category-card layout and hero benefits panel
- Produces: five shorter hero benefits and icon tiles without the gold outer ring

- [ ] **Step 1: Write the failing test**

```ts
await expect(page.getByText("Since 2015")).toBeVisible();
await expect(page.getByText("24/7 Support")).toBeVisible();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: FAIL because the panel still has four longer entries.

- [ ] **Step 3: Write minimal implementation**

```ts
const benefits = [
  { id: "since-2015", title: "Since 2015", subtitle: "Trusted travel experts" },
  { id: "best-price", title: "Best Price Guarantee", subtitle: "Smart value" },
  { id: "assistance", title: "24/7 Support", subtitle: "Always reachable" },
  { id: "payment", title: "Flexible Payment", subtitle: "Pay with ease" },
  { id: "advisor", title: "Expert Advisor", subtitle: "Guidance at every step" },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/pages/home.tsx src/components/marketing/hero-features-panel.tsx
git commit -m "feat: tighten homepage cards and benefits"
```

### Task 4: Harden Footer Office Fallbacks

**Files:**
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/lib/site-config.ts`

**Interfaces:**
- Consumes: `siteConfig.offices`
- Produces: fallback office list with Udupi, Bengaluru, and Hubli for footer rendering

- [ ] **Step 1: Write the failing test**

```ts
await expect(page.getByText("Bengaluru")).toBeVisible();
await expect(page.getByText("Hubli")).toBeVisible();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: FAIL because the current fallback only renders `Udupi`.

- [ ] **Step 3: Write minimal implementation**

```ts
const officeList =
  offices.length >= 3
    ? offices
    : siteConfig.offices.map((office) => ({
        office_name: office.name,
        address: office.address,
      }));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/site-footer.tsx src/lib/site-config.ts
git commit -m "fix: restore missing footer office fallbacks"
```

### Task 5: Final Verification

**Files:**
- Modify: none
- Test: `e2e/public-pages.spec.ts`

**Interfaces:**
- Consumes: completed UI and asset changes
- Produces: verified buildable change set

- [ ] **Step 1: Run targeted homepage e2e**

Run: `npx playwright test e2e/public-pages.spec.ts -g "homepage shows five compact benefit cards and all fallback offices"`
Expected: PASS

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: apply homepage brand polish"
```
