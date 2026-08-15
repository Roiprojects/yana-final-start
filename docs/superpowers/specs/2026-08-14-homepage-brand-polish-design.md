# Homepage Brand Polish Design

Date: 2026-08-14

## Goal
Apply the client-requested branding and homepage polish changes to the favicon, homepage hero, header wordmark, trust cards, and footer office list without introducing admin-schema changes.

## Approved Direction
- Keep the change set focused on the public site.
- Use the existing navbar blue as the favicon background color behind the logo mark.
- Update the `Yana Travels` wordmark styling in the homepage hero and sticky header to a newer stacked look.
- Remove the gold outer ring around the blue icon tiles in the travel-style cards.
- Rewrite the hero benefits panel to five shorter items with `Since 2015` first.
- Use the navbar blue as the icon background color in the hero benefit cards.
- Ensure the footer shows Udupi, Bengaluru, and Hubli when fallback content is used.

## Scope

### Favicon
- Replace the favicon asset with a blue-backed version of the existing logo.
- Keep favicon wiring simple by continuing to serve it from `index.html`.

### Header and Hero Branding
- Keep the existing logo image asset.
- Change only the wordmark typography, spacing, and visual treatment for the stacked `Yana` / `Travels` text in the homepage hero and sticky header.
- Preserve the existing responsive layout and search placement.

### Travel-Style Cards
- Keep the four current cards and destinations unchanged.
- Remove only the gold ring/border around the blue icon tile.
- Do not flatten the entire card styling or remove the main card border.

### Hero Benefits Panel
- Reduce copy length so each card feels tighter.
- Expand from four items to five items.
- Put `Since 2015` first.
- Use the navbar blue for icon badges on every benefit card.
- Keep the glass-card layout and motion language unless a smaller refinement is needed for better density.

### Footer Offices
- Preserve API-first behavior for office data.
- Improve fallback behavior so the public footer still shows Udupi, Bengaluru, and Hubli when API data is missing or incomplete.
- Do not add database migrations for this change.

## Constraints
- Stay within the current React, Tailwind, and Express architecture.
- Follow existing visual patterns instead of introducing a new design system.
- Avoid unrelated refactors.
- Validate with targeted end-to-end coverage plus build/type checks.

## Verification
- Confirm the homepage renders the updated five-card benefits panel.
- Confirm the footer displays Bengaluru and Hubli in fallback mode.
- Confirm the travel-style icon tile no longer has the gold outer ring.
- Confirm the favicon points to the new blue-backed asset.
- Run targeted Playwright coverage for the public homepage plus `npm run typecheck` and `npm run build`.
