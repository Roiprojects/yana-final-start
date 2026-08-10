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

**Current phase: BUILD & HARDENING.** The planned stack was originally Next.js (App Router) +
Supabase; during development the stack was migrated to a **React SPA (Vite) + Express API +
PostgreSQL**. All planning documents in `/docs` have been updated to reflect the implemented
stack. Client confirmations pending in `docs/CLIENT_CONFIRMATION_REQUIRED.md` still block
production data (real admin credentials, logo, legal copy, hosting decision).

---

## 2. Technology (locked)

| Layer      | Choice                                                      | Notes                                                                             |
| ---------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Framework  | **React 19 SPA + Vite 6**                                   | No SSR. SPA fallback served by the API server                                     |
| Routing    | **React Router v7**                                         | `src/main.tsx` owns the route tree (public 16 + admin 23 + 404)                   |
| Language   | **TypeScript, `strict: true`**                              | No `any` without justification                                                    |
| UI         | **Tailwind CSS v4**                                         | CSS-first `@theme` tokens in `src/globals.css`                                    |
| Forms      | **React Hook Form + Zod**                                   | Zod is the single source of validation truth (shared `src/lib/schemas`)           |
| Icons      | **Lucide**                                                  | No other icon libraries                                                           |
| Animation  | **Framer Motion — only where it adds value**                | No gratuitous motion                                                              |
| API server | **Express 4** (`server/`)                                   | Serves `dist/` + SPA fallback + `/api/*` + uploads on the same origin             |
| Database   | **PostgreSQL (`pg`)**                                       | Client-provided instance (`DATABASE_URL` in `.env`). The ONLY production database |
| Auth       | **HMAC cookie** (`server/auth.ts`)                          | Admin panel only (public site is anonymous); routes gated by `requireAdmin`       |
| Storage    | **Local `public/uploads/`** via `POST /api/upload` (multer) | Images, PDFs, brochures                                                           |
| Testing    | **Playwright** (E2E); Vitest for units when added           | See `docs/TESTING_PLAN.md`                                                        |

### Hard technology rules

- **PostgreSQL is the only database**, reached **only** through the Express API (`server/db.ts`,
  `pg`). No second/temporary backend, no SQLite, no local JSON data store standing in for the
  database in production. `src/lib/data/packages.generated.json` is an offline/development
  fallback only — live data comes from the API.
- **Supabase is NOT used** — not for auth, storage, or hosting. **Lovable Cloud is NOT used.**
  No `@supabase/*` MCP tools, no `enable_database`.
- **The browser never talks to PostgreSQL.** Credentials live only in `server/` (env vars).
  The client uses relative `/api` paths (Vite dev proxies to :4000; in production Express serves
  API and static files on the same origin).
- Do not commit secrets. `.env` is git-ignored. `.mcp.json` holds no Supabase credentials.
- Deployment host is **undecided** — see `docs/DEPLOYMENT_PLAN.md` (`NEEDS CLIENT CONFIRMATION`).

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
filler or stock content. On the public UI, missing fields are simply **not rendered**.

Separate **confirmed** facts from **assumptions** everywhere. Assumptions must be labelled.

---

## 4. Source material

Source files belong in (do **not** overwrite or delete originals):

- `docs/source-files/logo/`
- `docs/source-files/brochure/`
- `docs/source-files/trip-packages/`

> ⚠️ **Logo still MISSING** (as of last client update). The brochure and 13 trip-package PDFs were
> received (in `packages/`) and extracted to `docs/planning/extracted-packages/*.json`. The logo
> is needed to finalise the brand palette and replace the text wordmark. See
> `docs/CLIENT_CONFIRMATION_REQUIRED.md`.

Extracted, structured package data stays in `docs/planning/extracted-packages/*.json`, each
retaining `source_pdf` and `source_pages`. **Do not import unverified data into PostgreSQL.**

---

## 5. Design direction (summary — full spec in DESIGN_SYSTEM.md)

Premium, modern, trustworthy travel brand — **implemented as a navy / gold / cream** theme.
Cream-white backgrounds, very light warm section washes, navy accents, gold highlights, dark
readable text, large destination photography, generous spacing, soft shadows, fine borders,
elegant rounded cards. **Fraunces** (display/serif) + **Manrope** (headings) + **Inter** (body).

> The earlier light-purple/lavender direction is **superseded** by the implemented navy/gold
> design. Final hues remain provisional until the logo is analysed — see DESIGN_SYSTEM.md.

**Avoid:** neon colours, all-dark sections, generic AI layouts, excessive gradients /
glassmorphism / animation, tiny text, overcrowded cards, fake testimonials, random stock content.

---

## 6. Working rules

1. **Use the specialised agents/skills** for their domains (analysis, design, PDF extraction,
   DB, security, testing) rather than forcing everything through one context.
2. Do **not** overwrite source PDFs. Do **not** delete existing files without permission.
3. Do **not** expose credentials in code, docs, or logs.
4. Do **not** use placeholder content where verified content exists.
5. Do **not** claim something is implemented unless it has been tested (Playwright green).
6. Clearly separate confirmed information from assumptions.
7. Maintain the checklist in `docs/DEVELOPMENT_PLAN.md` (done vs pending).
8. All admin changes persist to **PostgreSQL via the Express API** and must be reflected on the
   public site (same data source, no hard-coded mirrors).
9. Run `npm run lint`, `npm run typecheck`, and `npm run build` before finishing any task.

---

## 7. Document map

| File                                   | Purpose                                              |
| -------------------------------------- | ---------------------------------------------------- |
| `CLAUDE.md`                            | This constitution                                    |
| `docs/PRD.md`                          | Product requirements                                 |
| `docs/SITE_ARCHITECTURE.md`            | Public site IA & page specs                          |
| `docs/ADMIN_ARCHITECTURE.md`           | Admin panel modules & capabilities                   |
| `docs/DESIGN_SYSTEM.md`                | Colours, type, components, tokens                    |
| `docs/DATABASE_SCHEMA.md`              | PostgreSQL entities, relationships                   |
| `docs/PDF_EXTRACTION_REPORT.md`        | Extraction schema + validation workflow              |
| `docs/CONTENT_GAP_REPORT.md`           | Repeated / outdated / missing / inconsistent content |
| `docs/DEVELOPMENT_PLAN.md`             | Phases, acceptance criteria, build order, checklist  |
| `docs/TESTING_PLAN.md`                 | Test strategy & requirements                         |
| `docs/DEPLOYMENT_PLAN.md`              | Hosting (undecided), env, CI/CD, go-live             |
| `docs/CLIENT_CONFIRMATION_REQUIRED.md` | Every open item awaiting the client                  |

---

## 8. Definition of Done (any feature)

- TypeScript compiles with `strict` and no new `any`.
- Zod schema validates all inputs; RHF wired to it.
- Data reads/writes go through the Express API → PostgreSQL (auth-gated where required).
- Loading / empty / error / success states all handled.
- Responsive (mobile-first) and accessible (WCAG 2.1 AA target).
- Playwright covers the happy path + at least one failure path.
- No invented content; gaps marked `NEEDS CLIENT CONFIRMATION`.
