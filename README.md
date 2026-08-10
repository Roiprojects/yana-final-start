# Yana Travels

Premium, admin-managed website for **Yana Travels** ("Reach your dream with us"). This is a
**React single-page application** built with **Vite + React Router + Tailwind CSS**, backed by a
small **Node/Express API** that talks to the client's **PostgreSQL** database.

The app is self-contained: it preserves the public site, the `/admin` panel, the premium homepage
hero, travel video assets, floating contact controls, the package catalogue, and supporting assets.

## Architecture

Two processes run together:

- **`server/`** — Express API (`:4000`). Owns all database access (`pg`), HMAC-signed-cookie auth,
  file uploads, and the offline package fallback. In production it also serves the built SPA.
- **`src/`** — Vite React SPA (`:5173` in dev). A thin client (`src/lib/api/client.ts`) calls the
  API via relative `/api` paths (proxied by Vite in dev, same-origin in prod).

The browser never talks to Postgres directly — all credentials live server-side.

## Features

- **Public site** — home, about, group & customized tours, filterable packages with detail pages
  (day-wise itinerary, inclusions/exclusions, pricing), services, gallery, brochure, contact, and
  two enquiry forms. Immersive photography, scroll animations, responsive.
- **Real package catalogue** — packages extracted from the client's official trip-package PDFs and
  served from PostgreSQL.
- **Admin panel** (`/admin`) — signed-cookie login gate, dashboard KPIs, enquiry management (status
  workflow), and a full package editor (create / edit / feature / hide / delete) that updates the
  public site instantly.
- Enquiry forms write to the database; validated with Zod on the server.

## Tech

Vite · React 19 · React Router 7 · TypeScript (strict) · Tailwind v4 · Express · PostgreSQL (`pg`) ·
React Hook Form + Zod · Lucide · Framer Motion · Playwright.

## Getting started

```bash
npm install
npm run dev        # starts API (:4000) + Vite dev server (:5173) together
```

Open http://localhost:5173. Admin: http://localhost:5173/admin/login.

### Environment

Server env lives in `.env` (git-ignored) — copy `.env.example` if present:

| Variable                         | Purpose                                     |
| -------------------------------- | ------------------------------------------- |
| `DATABASE_URL`                   | Postgres connection string                  |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin login credentials                     |
| `AUTH_SECRET`                    | Long random string for HMAC session cookies |
| `PORT`                           | API server port (default 4000)              |

The public site falls back to the bundled offline catalogue when the database is unreachable, so the
site never hard-crashes on a DB hiccup. Admin actions and enquiry persistence require `DATABASE_URL`.

## Scripts

| Command             | Purpose                                           |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Run API + Vite dev server together                |
| `npm run build`     | Production build (`dist/`)                        |
| `npm run start`     | Serve built SPA + API together (Express on :4000) |
| `npm run typecheck` | `tsc --noEmit`                                    |
| `npm run lint`      | ESLint                                            |
| `npm run test:e2e`  | Playwright end-to-end tests                       |

## Database

Schema lives in [`db/schema.sql`](db/schema.sql); [`db/setup.mjs`](db/setup.mjs) applies it and seeds
from the extracted package data.

## Notes / TODO

- Image/PDF uploads for the admin go to `public/uploads/` via `/api/upload`. The package editor also
  accepts an image **URL**.
- Raw source footage is intentionally excluded from this repository; the optimized homepage hero
  video and poster assets are included in `public/hero/`.
- `dist/` is the Vite build output, ignored and recreated by `npm run build`.

Planning docs live in [`docs/`](docs/).
