# Deployment Plan — Yana Travels

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** DevOps
Stack: **React SPA (Vite)** + **Express API server** + **PostgreSQL** (client-provided instance).
Lovable Cloud and Supabase are **not used**.

---

## 1. Hosting recommendation

> ⚠️ **HOSTING TARGET: `NEEDS CLIENT CONFIRMATION`** — undecided. The build does not depend on a
> specific host because the Express server serves both the built SPA (`dist/`) and the API on the
> same origin.

- The app is a **single Node process**: Express serves `dist/` (built SPA) + `public/uploads/` +
  `/api/*` + the SPA fallback. Any Node host that can run `npm start` works.
- Recommended candidate: a single VM / container (e.g. a small VPS or a PaaS like Railway,
  Render, Fly.io, or a client-owned VPS) running Node 20+. Confirm registrar access and whether we
  migrate `yanaindia.com` or use a subdomain during build.
- **Database stays at the client-provided PostgreSQL instance** (`DATABASE_URL`) — it is not
  co-hosted with the app unless the client chooses to move it.

## 2. Environments

| Env        | Purpose     | Data                                                                                               |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------- |
| Local      | Development | Local PostgreSQL (or dev database); seed fixtures; Vite dev :5173 + API :4000                      |
| Staging    | Client UAT  | Staging database (same Postgres instance, separate schema/db if feasible); verified sample content |
| Production | Live        | Client PostgreSQL; verified content only                                                           |

The SPA has no server-side environment — all env vars are consumed by `server/` only.

## 3. Environment variables (server-side only — never shipped to the browser)

- `DATABASE_URL` — PostgreSQL connection string (client-provided).
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — initial admin credentials (seeded by `db/setup.mjs`).
- `AUTH_SECRET` — HMAC session signing secret.
- `PORT` — HTTP port for the Express server (default `4000`; `start:server` overrides in CI).
- `SITE_URL` — canonical origin for SEO/OG (set when known).
- Email provider keys (if enquiry notifications/autoresponders are enabled).

Managed via the host's env settings + `.env` (git-ignored). **Never commit secrets.**

## 4. CI/CD

- Pipeline: install → typecheck → lint → build → Playwright E2E (server starts `npm run build && npm run start:server` on a test port) → deploy.
- Migrations: apply `db/schema.sql` via `db/setup.mjs` against staging then production — never
  ad-hoc SQL in prod. Idempotent/versioned.
- `main` branch → staging deploy; manual promote → production.

## 5. Go-live checklist

- PostgreSQL reachable from the host; `db/setup.mjs` applied; admin credentials real (not
  `NEEDS CLIENT CONFIRMATION`).
- `AUTH_SECRET` set to a long random value; session cookie `HttpOnly`/`Secure`/`SameSite` verified
  over HTTPS.
- Uploads directory writable; `public/uploads/` served; size/type limits enforced.
- Seed only **verified** content; no test data in prod.
- No `NEEDS CLIENT CONFIRMATION` values rendered on public pages.
- HTTPS + domain configured; SPA fallback returns `index.html` for non-API routes (no 404 on
  client-side routes).

## 6. Launch checklist

- All Phase 6/7 acceptance criteria met; E2E + a11y + Lighthouse green.
- SEO: sitemap.xml, robots.txt, canonical, OG images, structured data validated.
- 301 redirects from old `.html` URLs (e.g. `domestic.html` → `/packages?scope=domestic`) to
  preserve SEO — map during Phase 7.
- Analytics/consent configured (if used).
- Bank details confirmed absent; contact details correct.
- Client sign-off on staging → promote to production → smoke test live → monitor.

## 7. Post-launch

- Error monitoring + uptime checks (host-level).
- Database backups confirmed at the client-provided instance (or arranged).
- Content handover: admin training for staff.

## 8. Open items

- **Confirm host** (`NEEDS CLIENT CONFIRMATION`).
- Confirm domain migration plan & registrar access.
- Confirm email provider for enquiry notifications.
- Confirm who owns the hosting & database accounts (should be client).
