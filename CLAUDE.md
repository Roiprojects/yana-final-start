# CLAUDE.md — Yana Travels Website (Project Constitution)

> This file governs how any AI agent or developer works in this repository.
> Read it fully before writing code. It is intentionally strict.

---

## 1. Project

**Client:** Yana Travels (brand: "Yana India", tagline "Reach your dream with us")
**Existing site:** https://yanaindia.com/ (static HTML, "Powered By ITFEND")
**Goal:** A complete, modern, premium rebuild — dynamic, admin-managed, database-backed.

This is a **from-scratch rebuild**. We study the old site only for content and business
understanding. **We never copy or import old site code.**

**Current phase: PLANNING & ANALYSIS ONLY.** Do not build public pages or write app code
until all planning documents in `/docs` are complete and the client confirmations in
`docs/CLIENT_CONFIRMATION_REQUIRED.md` are resolved.

---

## 2. Technology (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (latest stable), App Router** | Server Components first |
| Language | **TypeScript, `strict: true`** | No `any` without justification |
| UI | **React + Tailwind CSS** | Design tokens from `docs/DESIGN_SYSTEM.md` |
| Forms | **React Hook Form + Zod** | Zod is the single source of validation truth |
| Icons | **Lucide** | No other icon libraries |
| Animation | **Framer Motion — only where it adds value** | No gratuitous motion |
| Database | **Supabase PostgreSQL** | The ONLY production database |
| Auth | **Supabase Auth** | Admin panel only (public site is anonymous) |
| Storage | **Supabase Storage** | Images, PDFs, brochures |
| Testing | **Playwright** (+ Vitest for units) | See `docs/TESTING_PLAN.md` |

### Hard technology rules
- **Supabase is the only backend.** No second/temporary backend, no SQLite, no local JSON
  data store standing in for the database in production.
- **Do NOT enable or use Lovable Cloud.** The `claude.ai lovable` MCP tools and
  `enable_database` must not be called for this project.
- Do not commit secrets. `.env` files are git-ignored. `.mcp.json` currently holds
  **placeholder** Supabase credentials — real values come from the client (see confirmations doc).

---

## 3. Content integrity — the no-invention rule

The following must come **only** from verified client source material
(brochure PDF, trip-package PDFs, or explicit client confirmation). **Never invent them:**

- Package prices, taxes, offers
- Departure dates
- Hotel / accommodation names
- Destinations, states, countries
- Inclusions & exclusions
- Day-wise itineraries
- Travel guarantees
- Company achievements, awards, years-in-business, customer counts
- Testimonials (no fake reviews, ever)

**When information is missing, write the literal token `NEEDS CLIENT CONFIRMATION`** in place
of the value — in docs, seed data, and UI copy stubs. Never fill a gap with plausible-sounding
filler or stock content.

Separate **confirmed** facts from **assumptions** everywhere. Assumptions must be labelled.

---

## 4. Source material

Source files belong in (do **not** overwrite or delete originals):
- `docs/source-files/logo/`
- `docs/source-files/brochure/`
- `docs/source-files/trip-packages/`

> ⚠️ **As of 2026-07-21 these folders are EMPTY.** The logo, brochure, and trip-package PDFs
> have not been provided. PDF extraction (see `docs/PDF_EXTRACTION_REPORT.md`) is **blocked**
> until the client supplies them. Do not proceed with data extraction or Supabase seeding
> until they arrive and the validation report is complete.

Extracted, structured package data goes to `docs/planning/extracted-packages/*.json`, each
retaining `source_pdf` and `source_pages`. **Do not import unverified data into Supabase.**

---

## 5. Design direction (summary — full spec in DESIGN_SYSTEM.md)

Premium, modern, trustworthy travel brand. **Light purple / lavender** theme.
White backgrounds, very light lavender sections, logo-compatible purple accents, dark
readable text, large destination photography, generous spacing, soft shadows, fine borders,
elegant rounded cards.

**Avoid:** neon purple, all-dark-purple sections, generic AI layouts, excessive gradients /
glassmorphism / animation, tiny text, overcrowded cards, fake testimonials, random stock content.

Fonts: **Manrope** (headings) + **Inter** (body). Palette is provisional until the logo is
analysed — see DESIGN_SYSTEM.md.

---

## 6. Working rules

1. **Use the specialised agents/skills** for their domains (analysis, design, PDF extraction,
   DB, security, testing) rather than forcing everything through one context.
2. Do **not** overwrite source PDFs. Do **not** delete existing files without permission.
3. Do **not** expose credentials in code, docs, or logs.
4. Do **not** begin coding public pages until planning docs are complete and sign-off is given.
5. Do **not** use placeholder content where verified content exists.
6. Do **not** claim something is implemented unless it has been tested (Playwright/Vitest green).
7. Clearly separate confirmed information from assumptions.
8. Maintain the checklist in `docs/DEVELOPMENT_PLAN.md` (done vs pending).
9. All admin changes persist to Supabase and must be reflected on the public site.

---

## 7. Document map

| File | Purpose |
|---|---|
| `CLAUDE.md` | This constitution |
| `docs/PRD.md` | Product requirements |
| `docs/SITE_ARCHITECTURE.md` | Public site IA & page specs |
| `docs/ADMIN_ARCHITECTURE.md` | Admin panel modules & capabilities |
| `docs/DESIGN_SYSTEM.md` | Colours, type, components, tokens |
| `docs/DATABASE_SCHEMA.md` | Supabase entities, relationships, RLS |
| `docs/PDF_EXTRACTION_REPORT.md` | Extraction schema + validation workflow |
| `docs/CONTENT_GAP_REPORT.md` | Repeated / outdated / missing / inconsistent content |
| `docs/DEVELOPMENT_PLAN.md` | Phases, acceptance criteria, prompt order, checklist |
| `docs/TESTING_PLAN.md` | Test strategy & requirements |
| `docs/DEPLOYMENT_PLAN.md` | Hosting, env, CI/CD, go-live |
| `docs/CLIENT_CONFIRMATION_REQUIRED.md` | Every open item awaiting the client |

---

## 8. Definition of Done (any feature)

- TypeScript compiles with `strict` and no new `any`.
- Zod schema validates all inputs; RHF wired to it.
- Data reads/writes go through Supabase with RLS enforced.
- Loading / empty / error / success states all handled.
- Responsive (mobile-first) and accessible (WCAG 2.1 AA target).
- Playwright covers the happy path + at least one failure path.
- No invented content; gaps marked `NEEDS CLIENT CONFIRMATION`.
