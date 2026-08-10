# Database Schema — Yana Travels (PostgreSQL)

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** Database Schema Architect

> PostgreSQL (client-provided instance) is the **only** database. It is reached **only** through
> the Express API (`server/db.ts`, `pg`) — the browser never connects directly. There is **no
> RLS**: access control lives in the API (`requireAdmin` for writes, public filter for reads).
> No data is imported until the PDF validation report is complete. Prices/dates/hotels stay empty
> (`NEEDS CLIENT CONFIRMATION`) until verified.

Conventions: `snake_case`, `id uuid default gen_random_uuid() primary key`, `created_at` /
`updated_at timestamptz default now()`, `created_by` / `updated_by uuid` (→ `admin_users`), soft
publish via `status`, visibility via `is_active`, ordering via `sort_order int`. FKs indexed.

---

## 1. Entity overview

**Content/taxonomy:** `categories`, `destinations`, `services`, `tour_packages`,
`package_itinerary`, `package_departures`, `package_media`.
**Marketing/site:** `hero_banners`, `home_sections`, `about_page`, `gallery_albums`,
`gallery_images`, `testimonials`, `brochures`, `site_settings`, `seo_meta`, `contact_info`.
**Leads:** `enquiries`.
**Admin:** `admin_users` (credentials + role), `audit_log`.

---

## 2. Relationships (text ER)

```
categories 1───∞ tour_packages ∞───1 destinations
tour_packages 1───∞ package_itinerary
tour_packages 1───∞ package_departures
tour_packages 1───∞ package_media
tour_packages ∞───1 brochures            (optional source PDF ref)
services            (standalone)
gallery_albums 1───∞ gallery_images
hero_banners / home_sections / testimonials / seo_meta / site_settings / contact_info  (site config)
enquiries           (public insert via API; admin read)
admin_users         (standalone; credentials via env, role stored here)
audit_log   ∞───1 admin_users
```

---

## 3. Key tables (columns abbreviated)

### tour_packages (core)

| column                                      | type                                                     | notes                            |
| ------------------------------------------- | -------------------------------------------------------- | -------------------------------- |
| id                                          | uuid pk                                                  |                                  |
| title                                       | text not null                                            |                                  |
| slug                                        | text unique not null                                     |                                  |
| category_id                                 | uuid fk categories                                       |                                  |
| destination_id                              | uuid fk destinations                                     |                                  |
| scope                                       | enum(`domestic`,`international`)                         |                                  |
| tour_type                                   | enum(`group`,`customized`)                               |                                  |
| group_subtype                               | enum(`standard`,`kitchen_staff`) null                    | for group tours                  |
| duration_days                               | int null                                                 | e.g. 5                           |
| duration_nights                             | int null                                                 |                                  |
| overview                                    | text null                                                |                                  |
| highlights                                  | jsonb null                                               | array of strings                 |
| accommodation                               | text null                                                | **hotel names = confirmed only** |
| meals_info                                  | text null                                                |                                  |
| transport_info                              | text null                                                |                                  |
| inclusions                                  | jsonb null                                               | array                            |
| exclusions                                  | jsonb null                                               | array                            |
| price_amount                                | numeric null                                             | **confirmed only**               |
| price_currency                              | text default 'INR'                                       |                                  |
| taxes_info                                  | text null                                                |                                  |
| pickup_location                             | text null                                                |                                  |
| drop_location                               | text null                                                |                                  |
| documents_required                          | jsonb null                                               |                                  |
| visa_info                                   | text null                                                |                                  |
| cancellation_policy                         | text null                                                |                                  |
| terms                                       | text null                                                |                                  |
| hero_image_url                              | text null                                                | `/uploads/...` path              |
| is_featured                                 | bool default false                                       |                                  |
| source_pdf                                  | text null                                                | provenance                       |
| source_pages                                | text null                                                | e.g. "2-4"                       |
| review_status                               | enum(`pending`,`in_review`,`verified`) default 'pending' | gate for publish                 |
| status                                      | enum(`draft`,`published`) default 'draft'                |                                  |
| is_active                                   | bool default true                                        |                                  |
| sort_order                                  | int default 0                                            |                                  |
| created_by/updated_by/created_at/updated_at |                                                          |                                  |

> **Publish guard:** a package may only be `status='published'` when `review_status='verified'`
> (enforced by a trigger/check + admin UI). Prevents unverified/invented data going live.

### package_itinerary

`id, package_id fk, day_number int, title, description, meals text, stay text, sort_order`.

### package_departures

`id, package_id fk, depart_date date, return_date date null, seats_total int null,
seats_available int null, price_override numeric null, status enum(open,closed,soldout),
is_active`. **All values confirmed-only.**

### package_media

`id, package_id fk, url, type enum(image,pdf), caption, sort_order, is_active`.

### categories

`id, name, slug unique, description, icon, hero_image_url, sort_order, is_active, status`.

### destinations

`id, name, slug unique, state, country, scope enum(domestic,international), hero_image_url,
description, sort_order, is_active, status`.

### services

`id, name, slug unique, description, icon, image_url, sort_order, is_active, status`.
Seed (confirmed list, copy TBD): Bike Trips, Honeymoon, Historic Destinations, Pilgrimage, MICE,
Cruises, Children's Programme, Flight Booking, Visa, Forex, Hotel Booking.

### hero_banners

`id, title, subtitle, image_url, cta_label, cta_href, sort_order, is_active, status`.

### home_sections

`id, key text unique, title, body, config jsonb, is_active, sort_order`.

### about_page

`id (singleton), body_richtext, mission, vision, images jsonb, status, updated_by`.
**Content NEEDS CLIENT CONFIRMATION (from brochure).**

### gallery_albums / gallery_images

Albums: `id, title, slug, cover_url, sort_order, is_active`.
Images: `id, album_id fk, url, caption, alt_text, sort_order, is_active`.

### testimonials

`id, author_name, author_location, rating int null, body, avatar_url, is_active, status`.
**Only real testimonials. No seed data.**

### brochures

`id, title, pdf_url, version, is_active, uploaded_by, created_at`. (Public: main brochure.)

### enquiries

| column               | type                                           | notes                    |
| -------------------- | ---------------------------------------------- | ------------------------ |
| id                   | uuid pk                                        |                          |
| type                 | enum(`general`,`customized`)                   |                          |
| name, phone, email   | text                                           | phone required           |
| destination_interest | text null                                      |                          |
| package_id           | uuid fk null                                   | when from a package page |
| travellers           | int null                                       |                          |
| travel_date          | date null                                      |                          |
| budget_range         | text null                                      | customized               |
| hotel_category       | text null                                      | customized               |
| scope                | enum(domestic,international) null              |                          |
| message              | text null                                      |                          |
| status               | enum(`new`,`contacted`,`closed`) default 'new' |                          |
| source               | text                                           | which page               |
| created_at           | timestamptz                                    |                          |

Public may `INSERT` via `POST /api/enquiries` (rate-limited); only admins may `SELECT`/`UPDATE`
(through the admin API).

### site_settings (singleton jsonb-ish)

`logo_url, whatsapp_number, phone, email, socials jsonb, analytics jsonb, brand_colors jsonb,
feature_flags jsonb, updated_by`.

### seo_meta

`id, path unique, title, description, og_image_url, canonical, robots, updated_by`.

### contact_info

`id, office_name, address, city, pincode, phone, email, hours, map_embed, sort_order, is_active`.
Seed: Bengaluru (Malleshwaram) + Udupi offices. **No bank details stored.**

### admin_users

`id uuid pk, full_name, role enum(super_admin,editor), password_hash text, is_active,
created_at`. Credentials are seeded from env (`ADMIN_EMAIL` / `ADMIN_PASSWORD`) by
`db/setup.mjs`; the HMAC session secret lives in env (`AUTH_SECRET`).

### audit_log

`id, admin_id fk, action, entity, entity_id, diff jsonb, created_at`.

---

## 4. API access model (replaces RLS)

| Table group                                                                                                                                                   | Public API (no auth)                                                                                 | Admin API (`requireAdmin`)                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Public content (packages, categories, destinations, services, hero, home_sections, about, gallery, testimonials, brochures, seo, contact_info, site_settings) | `SELECT` where `status='published' AND is_active=true` (and `review_status='verified'` for packages) | full CRUD (role-gated)                       |
| `enquiries`                                                                                                                                                   | `INSERT` only (`POST /api/enquiries`)                                                                | `SELECT`/`UPDATE`                            |
| `admin_users`, `audit_log`                                                                                                                                    | none                                                                                                 | super_admin (admin_users), admins read audit |

The `requireAdmin` middleware (`server/auth.ts`) verifies the HMAC-signed session cookie on
every admin API request. Secrets (`DATABASE_URL`, `AUTH_SECRET`, `ADMIN_*`) are server-only env
vars and never reach the browser.

---

## 5. Media storage

- Uploads go through `POST /api/upload` (multer) into `public/uploads/`, grouped by purpose
  (`logos/`, `packages/`, `gallery/`, `brochures/`, `hero/`). The DB stores the `/uploads/...`
  path. Admin-gated uploads; size/type limits enforced in `server/` + admin UI.

---

## 6. Indexes (initial)

- `tour_packages(slug)`, `(category_id)`, `(destination_id)`, `(scope, tour_type)`,
  `(status, is_active, review_status)`, `(is_featured)`.
- `package_itinerary(package_id, day_number)`, `package_departures(package_id, depart_date)`.
- `enquiries(status, created_at)`, `gallery_images(album_id)`, `seo_meta(path)`.
- Full-text (optional) on `tour_packages(title, overview)` via `tsvector` for search.

## 7. Open items

- Confirm role matrix & whether `editor` may publish.
- Confirm departures/inventory needed in v1.
- Confirm currency handling (INR only?).
- Migrations are authored in `db/schema.sql` and applied with `db/setup.mjs` against the
  client-provided `DATABASE_URL`; idempotent, versioned, and applied by an operator (or CI).
