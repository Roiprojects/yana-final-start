# Admin Panel Architecture — Yana Travels

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** Product Architect + Security
Auth: **Express HMAC cookie session** (`server/auth.ts`) · All data via the **Express API** →
**PostgreSQL** · Routes live under `/admin` (React Router), gated by `requireAdmin`.

---

## 1. Access & security model

- Admin app lives under `/admin` (React Router routes wrapped in `RequireAdmin`). The Express
  server guards every admin API route with `requireAdmin` (HMAC-signed cookie checked on each
  request); the browser is never trusted to gate admin data.
- **Roles (assumption — confirm):** `super_admin` (all, incl. admin management & settings),
  `editor` (content, no admin/user management). Start with these two; extend later.
- Authorization model: the **API is the gatekeeper** — public endpoints expose only
  `status = 'published'` and `is_active = true` rows; admin write/read endpoints require a valid
  admin session. There is no row-level security in the database; access control lives in
  `server/` middleware and route handlers.
- Security requirements: strong password policy, signed/expiring session cookie, audit trail on
  destructive actions, rate-limited login, secrets server-only (env vars).
- **No bank details stored or displayed** in any public context.

---

## 2. Modules (22) & capabilities

Legend for standard capabilities (applied where the ✎ column says "full CRUD+"):
**Add · Edit · View · Delete · Activate/Deactivate · Draft · Preview · Publish · Reorder ·
Search · Filter · Pagination · Confirm dialogs · Image upload · PDF upload · Form validation ·
Loading / Empty / Error / Success states.**

| #   | Module                          | Route                             | Notes / scope                                                                                         |
| --- | ------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1   | **Login**                       | `/admin/login`                    | Express HMAC session; error + loading states; forgot-password (confirm flow).                         |
| 2   | **Dashboard**                   | `/admin`                          | KPIs: new enquiries, package counts, drafts, recent activity. Read-only widgets.                      |
| 3   | **Home-page management**        | `/admin/home`                     | Toggle/reorder home sections; edit section copy. Full CRUD+ on section blocks.                        |
| 4   | **Hero-banner management**      | `/admin/hero`                     | Slides: image, headline, subtext, CTA, order, active. Full CRUD+.                                     |
| 5   | **About Us management**         | `/admin/about`                    | Rich text, images, mission, offices. Draft/preview/publish.                                           |
| 6   | **Group-tour management**       | `/admin/group-tours`              | Manage group tours + the kitchen-staff subtype. Full CRUD+.                                           |
| 7   | **Customized-tour management**  | `/admin/customized-tours`         | Domestic/international customized entries + intro copy. Full CRUD+.                                   |
| 8   | **Tour-package management**     | `/admin/packages`                 | Core module: all package fields, media, itinerary link, review_status. Full CRUD+.                    |
| 9   | **Category management**         | `/admin/categories`               | Pilgrimage, honeymoon, trekking, MICE, etc. Slug, order, active. Full CRUD+.                          |
| 10  | **Destination management**      | `/admin/destinations`             | Destination, state, country, hero image. Full CRUD+.                                                  |
| 11  | **Itinerary management**        | `/admin/packages/[id]/itinerary`  | Day-wise items (day no., title, detail, meals, stay). Reorderable. Full CRUD+.                        |
| 12  | **Departure-date management**   | `/admin/packages/[id]/departures` | Dates, seats, price override, status. **Confirmed data only.** Full CRUD+.                            |
| 13  | **Service management**          | `/admin/services`                 | 11 services + copy, icon, order, active. Full CRUD+.                                                  |
| 14  | **Gallery management**          | `/admin/gallery`                  | Albums + images uploaded to `public/uploads/`; captions, order, active. Full CRUD+.                   |
| 15  | **Brochure / PDF management**   | `/admin/brochure`                 | Upload/replace brochure + package PDFs to `public/uploads/`; version, active.                         |
| 16  | **Contact management**          | `/admin/contact`                  | Offices, phone, email, hours, social, map. Edit.                                                      |
| 17  | **Enquiry management**          | `/admin/enquiries`                | Read general + customized enquiries; status (new/contacted/closed); filter, search, paginate, export. |
| 18  | **Testimonials management**     | `/admin/testimonials`             | Real testimonials only; author, text, rating, active. Full CRUD+.                                     |
| 19  | **SEO management**              | `/admin/seo`                      | Per-page title, description, OG image, canonical, robots.                                             |
| 20  | **Website-settings management** | `/admin/settings`                 | Logo, brand colours, WhatsApp number, socials, analytics IDs, toggles.                                |
| 21  | **Administrator management**    | `/admin/admins`                   | super_admin only: invite/disable admins, assign roles.                                                |
| 22  | **Change password**             | `/admin/account/password`         | Express endpoint; re-auth.                                                                            |
| —   | **Logout**                      | action                            | Clears session everywhere.                                                                            |

---

## 3. Shared admin UX patterns

- **List view:** search box, filter chips, column sort, pagination, bulk select
  (activate/deactivate/delete with confirm), row actions (view/edit/preview/delete).
- **Form view:** RHF + Zod; inline field errors; unsaved-changes guard; sticky
  save bar with **Save draft / Preview / Publish**; optimistic UI with rollback on error.
- **Media:** drag-drop upload to `POST /api/upload` (multer → `public/uploads/`); image
  cropping/aspect guidance; PDF size limits; progress + error handling; stored URLs reference
  `/uploads/...` in the DB.
- **Confirmation dialogs** for delete / deactivate / publish-live.
- **States:** skeleton loaders, empty-state illustrations + CTA, error banners with retry,
  toast success feedback.
- **Draft/Publish:** rows carry `status ∈ {draft, published}`; **Preview** renders the public
  component with draft data; **Publish** flips status. Public API only returns published/active
  rows, so changes appear on the live site on next fetch.
- **Reorder:** `sort_order` integer, drag handle; persists on drop.
- **Audit:** `created_by`, `updated_by`, timestamps on all tables; optional `audit_log` table.

---

## 4. Data-flow guarantee

Every admin write persists to **PostgreSQL via the Express API**; media goes to
`public/uploads/`. Public pages read the same database through the public API — the single
source of truth is the database, not the code. No revalidation step is needed (SPA refetches).

## 5. Open decisions

- Exact role matrix (2 roles vs more).
- Whether departures need seat/inventory tracking now or later.
- Whether enquiry export (CSV) and email notifications are in v1 (needs email provider).
