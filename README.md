# Yana Travels

Standalone React-based version of the Yana Travels website. Built with **Next.js (App Router) +
TypeScript + Tailwind CSS**, backed by **PostgreSQL** when a database is configured.

This folder is self-contained and preserves the public site, admin routes, premium homepage hero,
travel video assets, floating contact controls, package catalogue, and supporting assets.

## Features

- **Public site** — home, about, group & customized tours, filterable packages with cinematic
  detail pages (day-wise itinerary, inclusions/exclusions, pricing), services, gallery, brochure,
  contact, and two enquiry forms. Immersive photography, scroll animations, responsive.
- **Real package catalogue** — 13 packages extracted from the client's official trip-package PDFs
  (`docs/planning/extracted-packages/`) and served from PostgreSQL.
- **Admin panel** (`/admin`) — signed-cookie login gate, dashboard KPIs, enquiry management
  (status workflow), and a full package editor (create / edit / feature / hide / delete) that
  updates the public site instantly.
- Enquiry forms write to the database; validated with Zod on the server.

## Tech

Next.js 16 · React 19 · TypeScript (strict) · Tailwind v4 · PostgreSQL (`pg`) ·
React Hook Form + Zod · Lucide · Framer Motion · Playwright.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Admin: `/admin/login`.

The public site falls back to the bundled package catalogue when `DATABASE_URL` is not configured.
For admin actions and enquiry persistence, add the required environment variables in a local
`.env.local` file. Never commit that file or database credentials.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright end-to-end tests |

## Database

Schema lives in [`db/schema.sql`](db/schema.sql); [`db/setup.mjs`](db/setup.mjs) applies it and
seeds from the extracted package data. Env vars are documented in [`.env.example`](.env.example).

## Notes / TODO

- Image/PDF uploads for the admin need a storage provider (plain Postgres has none) — the package
  editor currently accepts an image **URL**.
- Raw source footage is intentionally excluded from this repository; the optimized homepage hero
  video and poster assets are included in `public/hero/`.

Planning docs live in [`docs/`](docs/).
