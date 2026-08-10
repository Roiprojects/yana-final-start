# Testing Plan — Yana Travels

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** QA / Playwright
Primary E2E tool: **Playwright**. Units: **Vitest** (to be added). Target coverage: **≥80%** on business logic.

---

## 1. Test layers

| Layer         | Tool                                                       | Scope                                        |
| ------------- | ---------------------------------------------------------- | -------------------------------------------- |
| Unit          | Vitest                                                     | Zod schemas, mappers, utils, data transforms |
| Component     | Vitest + Testing Library                                   | Cards, forms, states (loading/empty/error)   |
| Integration   | Playwright (against local PostgreSQL + the Express server) | API routes ↔ PostgreSQL, auth gating         |
| E2E           | Playwright                                                 | Full user & admin journeys across browsers   |
| Accessibility | Playwright + axe-core                                      | WCAG 2.1 AA checks per key page              |
| Performance   | Lighthouse CI / CWV                                        | Home, packages, package detail               |
| Security      | Manual + API-gating tests                                  | Auth gating, anon access, no secret leakage  |

---

## 2. Critical E2E journeys (must pass before "done")

**Public**

1. Home loads; hero + sections render live data; no console errors.
2. Packages listing: filter by scope/type/category, search, paginate.
3. Package detail: renders only present fields; missing fields absent (no invented data);
   enquiry CTA + WhatsApp link work.
4. General enquiry: validation errors show; valid submit persists to PostgreSQL via `/api/enquiries`; success feedback.
5. Customized enquiry: extra fields validate & persist.
6. Contact page: offices/phone/email shown; **no bank details present** (assert absence).
7. Gallery lightbox; brochure download.
8. Responsive: mobile nav drawer + sticky enquiry bar.
9. A11y: keyboard nav, focus visible, alt text, landmarks (axe clean on key pages).

**Admin** 10. Login: invalid creds error; valid login → dashboard. 11. Auth gating: unauthenticated `/admin/*` → redirect to login; admin API without cookie → 401. 12. Package CRUD: create draft → preview → publish → appears on public site. 13. Activate/deactivate & reorder reflect on public site. 14. Delete with confirm dialog; cancel aborts. 15. Media upload to `POST /api/upload`; invalid type/size rejected. 16. Enquiry module: new enquiry appears; status change persists. 17. Role gating: `editor` cannot access admin-management/settings (per confirmed matrix). 18. Change password; logout clears session.

**Security / API gating** 19. Public API never returns draft/unverified packages. 20. Public cannot write to any table except `enquiries` INSERT via `/api/enquiries`. 21. Secrets (DB URL, `AUTH_SECRET`, admin creds) never present in the client bundle (grep build output). 22. Publish blocked when `review_status != 'verified'`.

---

## 3. Test data & environments

- Use a dedicated **local PostgreSQL database / test instance** — never production.
- Seed deterministic fixtures (verified sample package, category, destination) for E2E.
- No real client PII in tests.

## 4. CI gates

- PR must pass: typecheck, lint, unit, component, and a smoke E2E subset.
- Full E2E + a11y + Lighthouse run on main/staging.
- Coverage threshold enforced; drops fail CI.

## 5. Definition of "tested"

A feature is only "done" when its unit/component tests and at least one happy-path + one
failure-path E2E test pass in CI. No feature is reported implemented on the strength of manual
inspection alone.

## 6. Open items

- Confirm local vs shared test-database strategy for E2E (a dedicated schema/database, not prod).
- Confirm email-notification testing (provider needed).
- Confirm target browsers/devices matrix.
