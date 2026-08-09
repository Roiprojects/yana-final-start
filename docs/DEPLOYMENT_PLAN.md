# Deployment Plan — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21  ·  **Lens:** DevOps
Stack: **Next.js (App Router)** front + **Supabase** (DB/Auth/Storage). Lovable Cloud **not used**.

---

## 1. Hosting recommendation
- **Frontend:** Vercel (first-class Next.js App Router, ISR, preview deployments) — *recommended;
  confirm with client.* Alternative: Netlify or a Node host.
- **Backend:** Supabase managed project (client-owned org). Single production project + a
  staging/branch for testing.
- **DNS/domain:** `yanaindia.com` — confirm registrar access and whether we migrate the existing
  domain or use a subdomain during build.

## 2. Environments

| Env | Purpose | Data |
|---|---|---|
| Local | Development | Supabase local or dev branch; seed fixtures |
| Preview | Per-PR (Vercel) | Points at staging Supabase |
| Staging | Client UAT | Staging Supabase; verified sample content |
| Production | Live | Production Supabase; verified content only |

## 3. Environment variables (server-side unless noted)
- `NEXT_PUBLIC_SUPABASE_URL` (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public)
- `SUPABASE_SERVICE_ROLE_KEY` (**server only — never exposed to browser**)
- `SITE_URL`, revalidation secret, email provider keys (if enquiry emails enabled).
- Managed via host's env settings + `.env.local` (git-ignored). **`.mcp.json` placeholders must be
  replaced with real, git-ignored credentials — never committed.**

## 4. CI/CD
- Git repo (not yet initialised — `git init` on approval). Branch protection on `main`.
- Pipeline: install → typecheck → lint → unit/component → build → smoke E2E → deploy preview.
- Merge to `main` → staging deploy; manual promote → production.
- Supabase migrations applied via CI (migration files in repo) against staging then production;
  never ad-hoc SQL in prod.

## 5. Supabase go-live checklist
- RLS enabled + policies verified on **every** table (run `get_advisors` security scan).
- Storage bucket policies correct (public read where intended; authenticated writes only).
- Backups/PITR enabled; retention confirmed.
- Auth: password policy, email templates, redirect URLs set for prod domain.
- Seed only **verified** content; no test data in prod.
- No `NEEDS CLIENT CONFIRMATION` values rendered on public pages.

## 6. Launch checklist
- All Phase 6/7 acceptance criteria met; E2E + a11y + Lighthouse green.
- SEO: sitemap.xml, robots.txt, canonical, OG images, structured data validated.
- 301 redirects from old `.html` URLs (e.g. `domestic.html` → `/packages?scope=domestic`) to
  preserve SEO — map during Phase 7.
- Analytics/consent configured (if used).
- Bank details confirmed absent; contact details correct.
- Client sign-off on staging → promote to production → smoke test live → monitor.

## 7. Post-launch
- Error monitoring + uptime checks.
- Supabase advisors reviewed periodically.
- Content handover: admin training for staff.

## 8. Open items
- Confirm host (Vercel vs other).
- Confirm domain migration plan & registrar access.
- Confirm email provider for enquiry notifications.
- Confirm who owns the Supabase & hosting accounts (should be client).
