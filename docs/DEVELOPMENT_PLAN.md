# Development Plan — Yana Travels

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** Project Manager
**Phase now:** Build & hardening — React SPA (Vite) + Express API + PostgreSQL is implemented
and verified. Production data (real admin creds, logo, legal copy, hosting) still pending client.

---

## 1. Phases

### Phase 0 — Planning & analysis ✅

Website audit, architecture, design system, DB schema, extraction workflow, gap & confirmation
reports. **Exit:** all `/docs` files created; confirmations list issued.

### Phase 1 — Client inputs & sign-off 🟡 (partially blocking)

Package PDFs + brochure received; extraction done. **Still pending:** logo, real admin
credentials, legal copy, hosting decision. **Exit:** confirmations resolved; `.env` holds real
(git-ignored) values.

### Phase 2 — Foundations ✅

Vite + React 19 SPA scaffold, TS strict, Tailwind v4 tokens, fonts, base layout
(header/footer), Express API server, `pg` wiring, env handling, CI lint/typecheck, Playwright
harness. **Exit:** `npm run build` succeeds; API serves `dist/` + SPA fallback; smoke e2e green.

### Phase 3 — Database & auth ✅ (schema; data pending)

`db/schema.sql` migrations for all tables + `db/setup.mjs` applied against the client-provided
PostgreSQL. HMAC cookie auth (`server/auth.ts`) + `requireAdmin` gating. Public API filters to
published/active rows; admin API role-gated. **Exit:** schema applied; admin can log in; no
public writes except enquiries via `POST /api/enquiries`.

### Phase 4 — PDF extraction & validation ✅

13 package PDFs + brochure extracted → `extracted-packages/*.json` → validation report. **Exit:**
13 packages structured; prices/itineraries live via the package data layer; dates/hotels/policy
still `NEEDS CLIENT CONFIRMATION`.

### Phase 5 — Admin panel 🟡

Login, dashboard, 23 panel routes under `/admin`, generic module CRUD (destinations, services,
testimonials, gallery, faqs, contact_info, hero_slides) + tour-package CRUD + enquiries status
workflow + upload — all wired to the admin API. **Pending:** modules for about, home sections,
seo, settings, admins, brochure, categories, itinerary, departures, group/customized tours still
generic scaffolds awaiting schema/API for those tables. **Exit:** every content type manageable
end-to-end; tests green.

### Phase 6 — Public website ✅

Home, About, Group/Customized hubs + subpages, Packages listing + details, Services, Gallery,
Brochure, Contact, both Enquiry flows, Privacy/Terms — 16 routes wired to the API. **Exit:** all
pages render live data; enquiries persist to PostgreSQL; responsive + accessible.

### Phase 7 — SEO, performance, hardening ⏳

Metadata/OG/sitemap/robots/structured data, image optimisation, Core Web Vitals, security review,
a11y audit. **Exit:** Lighthouse/CWV targets met; security & a11y checklists pass.

### Phase 8 — UAT & launch ⏳

Client UAT on staging, content load, final confirmations, go-live (see DEPLOYMENT_PLAN.md).

---

## 2. Acceptance criteria (project-level)

- No invented content anywhere; gaps show `NEEDS CLIENT CONFIRMATION` in data, not on public UI.
- All content editable via admin and reflected on the public site (same PostgreSQL source).
- PostgreSQL is the sole database, reached only through the Express API; Supabase/Lovable not used.
- TypeScript strict, no new `any`; Zod validates all inputs (client + server share `src/lib/schemas`).
- Every list: loading/empty/error states; every mutation: confirm + success/error feedback.
- Public API hides drafts/unverified rows; admin API gated by HMAC cookie (`requireAdmin`).
- Bank details absent from all public surfaces.
- WCAG 2.1 AA; Core Web Vitals "Good".
- Playwright covers critical journeys (browse → package → enquiry; admin login → CRUD → publish).
- No feature claimed "done" without passing tests.

## 3. Recommended order of build prompts

1. **Scaffold & design tokens** (Phase 2) ✅
2. **Schema + migrations** (`db/schema.sql`, `db/setup.mjs`) (Phase 3) ✅
3. **Auth + admin shell** (`server/auth.ts`, `/admin` layout) (Phase 3) ✅
4. **Admin: settings, categories, destinations, services** (taxonomy first) 🟡 destinations/services done; settings/categories pending
5. **Admin: tour-package + itinerary + departures + media** (core) 🟡 packages done; itinerary/departures pending
6. **Admin: hero, home sections, about, gallery, brochure, testimonials, SEO, contact.** 🟡 hero/gallery/testimonials/contact/faqs done; home/about/brochure/seo pending
7. **Admin: enquiries + admin management + change password.** 🟡 enquiries done; admins/change-password pending
8. **PDF extraction + validation → seed verified packages** (Phase 4) ✅ extracted; seeding verified data pending confirmation
9. **Public: layout, home, about.** ✅
10. **Public: packages listing + package details.** ✅
11. **Public: group/customized hubs, services, gallery, brochure.** ✅
12. **Public: contact + enquiry forms (wire to Express API).** ✅
13. **Public: privacy/terms; SEO/sitemap; structured data.** 🟡 pages done; SEO/sitemap pending
14. **Performance, a11y, security hardening.** ⏳
15. **E2E Playwright suite + UAT fixes.** 🟡 38 passing; admin tests gated on real creds
16. **Deployment + go-live.** ⏳

> Admin before public where data is needed, so public pages have real (verified) content to
> render. Extraction (step 8) is done and can be re-run when new PDFs arrive.

## 4. Live checklist

| #   | Item                                                                  | Status                                                                                                                                                           |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | Planning docs (12 files)                                              | ✅ done (updated 2026-08-10 for implemented stack)                                                                                                               |
| 0   | Website audit                                                         | ✅ done                                                                                                                                                          |
| 0   | Extraction JSON template                                              | ✅ done                                                                                                                                                          |
| 1   | Package PDFs (13) + brochure received & extracted                     | ✅ done (logo still pending)                                                                                                                                     |
| 1   | PostgreSQL `DATABASE_URL`                                             | ✅ provided & wired (client instance)                                                                                                                            |
| 1   | Real admin credentials (`ADMIN_EMAIL`/`ADMIN_PASSWORD`/`AUTH_SECRET`) | ⛔ placeholder `NEEDS CLIENT CONFIRMATION` — blocks admin e2e                                                                                                    |
| 1   | Confirmation questions answered                                       | ⛔ pending client                                                                                                                                                |
| 1   | Legal copy provided                                                   | ⛔ pending client                                                                                                                                                |
| 2   | Scaffold + tokens + layout + Express/Postgres wiring + Playwright     | ✅ done & verified (build + 38 e2e green)                                                                                                                        |
| 3   | Schema + auth + API gating                                            | ✅ schema applied; `requireAdmin` tested; data pending real creds                                                                                                |
| 4   | Extraction + validation                                               | ✅ 13 packages extracted → JSON + live on site (dates/hotels pending client)                                                                                     |
| 5   | Admin panel                                                           | 🟡 shell + core CRUD done (packages, destinations, services, testimonials, gallery, faqs, contact_info, hero_slides, enquiries); remaining modules are scaffolds |
| 6   | Public site                                                           | ✅ all 18 routes (16 public + 404) render from API + offline fallback; enquiry forms persist                                                                     |
| 7   | SEO/perf/security/a11y                                                | ⏳ not started                                                                                                                                                   |
| 8   | UAT + launch                                                          | ⏳ not started                                                                                                                                                   |
