# Development Plan — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21  ·  **Lens:** Project Manager
**Phase now:** Planning complete → awaiting client inputs before build starts.

---

## 1. Phases

### Phase 0 — Planning & analysis ✅ (this deliverable)
Website audit, architecture, design system, DB schema, extraction workflow, gap & confirmation
reports. **Exit:** all `/docs` files created; confirmations list issued.

### Phase 1 — Client inputs & sign-off 🔒 (blocking)
Collect logo + brochure + package PDFs; answer confirmation questions; provide Supabase project
credentials; approve legal copy. **Exit:** source files present, confirmations resolved,
`.mcp.json` holds real (git-ignored) credentials.

### Phase 2 — Foundations
Next.js + TS strict scaffold, Tailwind + design tokens, `next/font`, base layout (header/footer),
Supabase client (server/browser split), env handling, CI lint/typecheck, Playwright harness.
**Exit:** app builds, tokens render, Supabase connects, one smoke test green.

### Phase 3 — Database & auth
Author migrations for all tables (DATABASE_SCHEMA.md), enable RLS + policies, storage buckets,
seed **verified** taxonomy only (categories, services, destination stubs, contact_info, settings).
Supabase Auth + admin middleware + roles. **Exit:** RLS tested; admin can log in; no anon writes
except enquiries.

### Phase 4 — PDF extraction & validation
Run PDF skills on provided PDFs → `extracted-packages/*.json` → validation report → client review
→ mark `verified`. **Exit:** validation report signed; verified packages ready to seed.

### Phase 5 — Admin panel
Build the 22 modules with full CRUD+ patterns, media upload, draft/preview/publish, RLS-safe
writes, validation, all UI states. **Exit:** every content type manageable end-to-end; tests green.

### Phase 6 — Public website
Home, About, Group/Customized hubs + subpages, Packages listing + details, Services, Gallery,
Brochure, Contact, both Enquiry flows, Privacy/Terms. Wire to Supabase; ISR/tag revalidation on
publish. **Exit:** all pages render live data; enquiries persist; responsive + accessible.

### Phase 7 — SEO, performance, hardening
Metadata/OG/sitemap/robots/structured data, image optimisation, Core Web Vitals, security review,
a11y audit. **Exit:** Lighthouse/CWV targets met; security & a11y checklists pass.

### Phase 8 — UAT & launch
Client UAT on staging, content load, final confirmations, go-live (see DEPLOYMENT_PLAN.md).

---

## 2. Acceptance criteria (project-level)
- No invented content anywhere; gaps show `NEEDS CLIENT CONFIRMATION` in data, not on public UI.
- All content editable via admin and reflected on the public site after publish.
- Supabase is the sole backend/auth/storage; Lovable Cloud not used.
- TypeScript strict, no new `any`; Zod validates all inputs.
- Every list: loading/empty/error states; every mutation: confirm + success/error feedback.
- RLS prevents anon reads of drafts and anon writes (except enquiry insert).
- Bank details absent from all public surfaces.
- WCAG 2.1 AA; Core Web Vitals "Good".
- Playwright covers critical journeys (browse → package → enquiry; admin login → CRUD → publish).
- No feature claimed "done" without passing tests.

## 3. Recommended order of build prompts
1. **Scaffold & design tokens** (Phase 2).
2. **Supabase schema + migrations + RLS + storage** (Phase 3).
3. **Supabase Auth + admin shell + middleware/roles** (Phase 3).
4. **Admin: settings, categories, destinations, services** (taxonomy first).
5. **Admin: tour-package + itinerary + departures + media** (core).
6. **Admin: hero, home sections, about, gallery, brochure, testimonials, SEO, contact.**
7. **Admin: enquiries + admin management + change password.**
8. **PDF extraction + validation → seed verified packages** (Phase 4, once PDFs exist).
9. **Public: layout, home, about.**
10. **Public: packages listing + package details.**
11. **Public: group/customized hubs, services, gallery, brochure.**
12. **Public: contact + enquiry forms (wire to Supabase).**
13. **Public: privacy/terms; SEO/sitemap; structured data.**
14. **Performance, a11y, security hardening.**
15. **E2E Playwright suite + UAT fixes.**
16. **Deployment + go-live.**

> Build admin before public where data is needed, so public pages have real (verified) content
> to render. Extraction (step 8) can run in parallel once PDFs arrive.

## 4. Live checklist

| # | Item | Status |
|---|---|---|
| 0 | Planning docs (12 files) | ✅ done |
| 0 | Website audit | ✅ done |
| 0 | Extraction JSON template | ✅ done |
| 1 | Package PDFs (13) + brochure received & extracted | ✅ done (logo still pending) |
| 1 | Supabase real credentials | ⛔ pending client |
| 1 | Confirmation questions answered | ⛔ pending client |
| 1 | Legal copy provided | ⛔ pending client |
| 2 | Scaffold + tokens + layout + Supabase wiring + Playwright | ✅ done & verified (build + 4 e2e green) |
| 3 | Schema + RLS + auth | 🟡 in progress — SQL can be authored now; **apply/seed/RLS-tests blocked** on real Supabase creds |
| 4 | Extraction + validation | ✅ 13 packages extracted → JSON + live on site (dates/hotels pending client) |
| 5 | Admin panel | 🟡 shell done (login, sidebar, dashboard, 22 module scaffolds) — CRUD/data pending Supabase |
| 6 | Public site | 🟡 shells done (all 18 routes, 404); enquiry forms wired to a Supabase Server Action; package listing/detail render from a data layer (real Supabase path + flag-gated sample fixtures). Live data pending Supabase creds |
| 7 | SEO/perf/security/a11y | ⏳ not started |
| 8 | UAT + launch | ⏳ not started |
