# Admin Panel Architecture — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21  ·  **Lens:** Product Architect + Security
Auth: **Supabase Auth** · All data via Supabase with **RLS** · Route group `/(admin)` at `/admin/*`.

---

## 1. Access & security model

- Admin app lives under `/admin`, protected by Next.js middleware checking a valid Supabase
  session **and** an `admin` role (from `admin_users` / custom claim).
- **Roles (assumption — confirm):** `super_admin` (all, incl. admin management & settings),
  `editor` (content, no admin/user management). Start with these two; extend later.
- RLS: public/anon can only `SELECT` rows where `status = 'published'` and `is_active = true`
  on public-facing tables; all writes require authenticated admin. Enquiries: anon may `INSERT`
  only; admins may read/update.
- Security requirements: strong password policy, session expiry, audit trail on destructive
  actions, rate-limited login, no service-role key in the browser (server-only).
- **No bank details stored or displayed** in any public context.

---

## 2. Modules (22) & capabilities

Legend for standard capabilities (applied where the ✎ column says "full CRUD+"):
**Add · Edit · View · Delete · Activate/Deactivate · Draft · Preview · Publish · Reorder ·
Search · Filter · Pagination · Confirm dialogs · Image upload · PDF upload · Form validation ·
Loading / Empty / Error / Success states.**

| # | Module | Route | Notes / scope |
|---|---|---|---|
| 1 | **Login** | `/admin/login` | Supabase Auth; error + loading states; forgot-password. |
| 2 | **Dashboard** | `/admin` | KPIs: new enquiries, package counts, drafts, recent activity. Read-only widgets. |
| 3 | **Home-page management** | `/admin/home` | Toggle/reorder home sections; edit section copy. Full CRUD+ on section blocks. |
| 4 | **Hero-banner management** | `/admin/hero` | Slides: image, headline, subtext, CTA, order, active. Full CRUD+. |
| 5 | **About Us management** | `/admin/about` | Rich text, images, mission, offices. Draft/preview/publish. |
| 6 | **Group-tour management** | `/admin/group-tours` | Manage group tours + the kitchen-staff subtype. Full CRUD+. |
| 7 | **Customized-tour management** | `/admin/customized-tours` | Domestic/international customized entries + intro copy. Full CRUD+. |
| 8 | **Tour-package management** | `/admin/packages` | Core module: all package fields, media, itinerary link, review_status. Full CRUD+. |
| 9 | **Category management** | `/admin/categories` | Pilgrimage, honeymoon, trekking, MICE, etc. Slug, order, active. Full CRUD+. |
| 10 | **Destination management** | `/admin/destinations` | Destination, state, country, hero image. Full CRUD+. |
| 11 | **Itinerary management** | `/admin/packages/[id]/itinerary` | Day-wise items (day no., title, detail, meals, stay). Reorderable. Full CRUD+. |
| 12 | **Departure-date management** | `/admin/packages/[id]/departures` | Dates, seats, price override, status. **Confirmed data only.** Full CRUD+. |
| 13 | **Service management** | `/admin/services` | 11 services + copy, icon, order, active. Full CRUD+. |
| 14 | **Gallery management** | `/admin/gallery` | Albums + images to Storage; captions, order, active. Full CRUD+. |
| 15 | **Brochure / PDF management** | `/admin/brochure` | Upload/replace brochure + package PDFs to Storage; version, active. |
| 16 | **Contact management** | `/admin/contact` | Offices, phone, email, hours, social, map. Edit. |
| 17 | **Enquiry management** | `/admin/enquiries` | Read general + customized enquiries; status (new/contacted/closed); filter, search, paginate, export. |
| 18 | **Testimonials management** | `/admin/testimonials` | Real testimonials only; author, text, rating, active. Full CRUD+. |
| 19 | **SEO management** | `/admin/seo` | Per-page title, description, OG image, canonical, robots. |
| 20 | **Website-settings management** | `/admin/settings` | Logo, brand colours, WhatsApp number, socials, analytics IDs, toggles. |
| 21 | **Administrator management** | `/admin/admins` | super_admin only: invite/disable admins, assign roles. |
| 22 | **Change password** | `/admin/account/password` | Supabase update; re-auth. |
| — | **Logout** | action | Clears session everywhere. |

---

## 3. Shared admin UX patterns

- **List view:** search box, filter chips, column sort, pagination, bulk select
  (activate/deactivate/delete with confirm), row actions (view/edit/preview/delete).
- **Form view:** RHF + Zod; inline field errors; unsaved-changes guard; sticky
  save bar with **Save draft / Preview / Publish**; optimistic UI with rollback on error.
- **Media:** drag-drop upload to Supabase Storage; image cropping/aspect guidance; PDF size
  limits; progress + error handling; stored URL references in DB.
- **Confirmation dialogs** for delete / deactivate / publish-live.
- **States:** skeleton loaders, empty-state illustrations + CTA, error banners with retry,
  toast success feedback.
- **Draft/Publish:** rows carry `status ∈ {draft, published}`; **Preview** renders the public
  component with draft data via a signed preview route; **Publish** flips status + revalidates
  the public path/tag.
- **Reorder:** `sort_order` integer, drag handle; persists on drop.
- **Audit:** `created_by`, `updated_by`, timestamps on all tables; optional `audit_log` table.

---

## 4. Data-flow guarantee
Every admin write persists to **Supabase** (Postgres + Storage). Publishing revalidates the
relevant public route so changes appear on the live site — the single source of truth is the
database, not the code.

## 5. Open decisions
- Exact role matrix (2 roles vs more).
- Whether departures need seat/inventory tracking now or later.
- Whether enquiry export (CSV) and email notifications are in v1 (needs email provider).
