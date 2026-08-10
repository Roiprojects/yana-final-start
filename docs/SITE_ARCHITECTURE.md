# Public Site Architecture — Yana Travels

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** Product Architect
Framework: **React 19 SPA (Vite)** + **React Router v7** (client-side routing). Dynamic data is
fetched from the **Express API** (`/api/*`) → **PostgreSQL**. No SSR.

---

## 1. Information architecture

```
/                              Home
/about                         About Us
/group-tours                   Group Tours (hub)
  /group-tours/kitchen-staff   Group Tours with Kitchen Staff
  /group-tours/domestic        Domestic Group Tours
  /group-tours/international    International Group Tours
/customized-tours              Customized Tours (hub)
  /customized-tours/domestic   Domestic Customized Tours
  /customized-tours/international  International Customized Tours
/packages                      Tour Packages (filterable listing)
  /packages/:slug              Package Details (dynamic)
/services                      Services (listing)
  /services/:slug              Service detail (optional; else anchor sections)
/gallery                       Gallery
/brochure                      Brochure (view/download)
/contact                       Contact Us
/enquiry                       General Enquiry
/enquiry/customized            Customized Tour Enquiry
/privacy-policy                Privacy Policy
/terms                         Terms & Conditions
```

**Category & destination pages** are data-driven. `/packages` is the master catalogue;
the group/customized/domestic/international pages are **pre-filtered views** of the same
package dataset (via query/segment), avoiding duplicate content.

### Route → rendering strategy

| Route                                                   | Strategy                                                           | Reason                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- |
| `/`, `/about`, `/services`, `/privacy-policy`, `/terms` | SPA route → React component; data fetched from API                 | Content changes rarely; static copy in code |
| `/packages`, category hubs                              | SPA route → API fetch on load, client-side filters/sort/pagination | Reflect admin edits with no redeploy        |
| `/packages/:slug`                                       | SPA route → API fetch by slug; own not-found state                 | No SSR needed; SEO handled per page         |
| `/gallery`, `/brochure`                                 | SPA route → API + `/uploads` static files                          | Media managed in admin                      |
| `/enquiry*`, `/contact` form                            | SPA form → `POST /api/enquiries`                                   | Writes                                      |

> Because the site is an SPA, admin edits appear on the public site **immediately on next
> fetch** — there is no revalidation/deploy step for data changes. Only code changes need a
> rebuild (`npm run build`).

---

## 2. Global layout

- **Header:** logo, primary nav (Home, About, Group Tours ▾, Customized Tours ▾, Packages,
  Services, Gallery, Contact), prominent "Enquire" CTA + WhatsApp/phone. Sticky, condenses on scroll.
- **Footer:** office addresses (both), phone, email, social links, quick links, Privacy/Terms,
  brochure download. **No bank details.**
- **Mobile:** hamburger drawer with grouped nav; sticky bottom "Enquire / WhatsApp" bar.

---

## 3. Page specifications

### 3.1 Home (`/`)

Sections (all admin-managed, orderable, each toggleable):

1. **Hero banner** — rotating slides (image + headline + subtext + CTA). From hero-banner module.
2. **Trust strip** — offices, years, contact. _(Any stat = confirmed only, else omit.)_
3. **Tour categories** — Group / Customized / Domestic / International / Weekend & Trekking cards.
4. **Featured packages** — cards pulled from packages flagged `is_featured`.
5. **Services overview** — icon grid linking to `/services`.
6. **Why Yana** — value props (confirmed copy only).
7. **Gallery teaser** — few images → `/gallery`.
8. **Testimonials** — only if real testimonials exist; else section hidden. **No fake reviews.**
9. **Enquiry CTA band** → `/enquiry`.

### 3.2 About Us (`/about`)

Company story, mission, offices, team — **sourced from brochure PDF** (currently missing →
`NEEDS CLIENT CONFIRMATION`). Achievements/awards only if in brochure.

### 3.3 Group Tours hub + sub-pages

- Hub explains group-tour concept; three entry cards.
- **Kitchen Staff** — explains travelling kitchen/food arrangement (common for pilgrimage &
  regional-diet groups). Copy `NEEDS CLIENT CONFIRMATION`.
- **Domestic / International** — filtered package grids (`tour_type=group`, `scope=domestic|international`).

### 3.4 Customized Tours hub + sub-pages

- Explains bespoke planning; Domestic / International filtered views; strong CTA → `/enquiry/customized`.

### 3.5 Tour Packages (`/packages`)

- **Filters:** scope (domestic/international), tour type (group/customized), category
  (pilgrimage, honeymoon, trekking, MICE…), destination/state/country, duration range, search.
- **Sort:** duration, title, newest. **Pagination** (server-side).
- **Card:** image, title, destination, duration, "from ₹price" _(only if price confirmed, else
  "Enquire for price")_, category badge, CTA.

### 3.6 Package Details (`/packages/:slug`)

Renders only the fields that exist (all optional):

- Hero image + title, destination/state/country, duration, category & type badges.
- Overview, Highlights.
- **Day-wise itinerary** (accordion).
- Accommodation, Meals, Transportation.
- Inclusions / Exclusions (two columns).
- Price + taxes _(confirmed only)_, Departure dates _(confirmed only)_.
- Pickup/Drop, Documents required, Visa info, Cancellation policy, T&C.
- **Sticky enquiry card** (prefilled with package) + WhatsApp deep-link.
- Related packages.
- SEO: structured data where fields are verified.

> Any missing field is simply **not rendered** (no "TBD", no invented value). Internally the
> record carries `review_status`; unverified packages are not published.

### 3.7 Services (`/services`)

Grid of the 11 services (confirmed list). Optional `/services/:slug` detail if client provides copy.

### 3.8 Gallery (`/gallery`)

Masonry/grid from `public/uploads/` (managed via admin gallery module); categories/albums; lightbox; lazy-loaded.

### 3.9 Brochure (`/brochure`)

Embedded viewer + download button (PDF served from `public/uploads/`). Blocked until brochure supplied.

### 3.10 Contact (`/contact`)

Both office addresses, phone, email, social, map embeds, office hours _(confirm)_, general
enquiry form. **No bank details.**

### 3.11 Enquiry forms

- **General** (`/enquiry`): name, phone, email, destination/interest, travellers, dates, message.
- **Customized** (`/enquiry/customized`): adds trip type, budget range, preferred hotel category,
  domestic/international, flexible dates. Both → PostgreSQL `enquiries` (via `POST /api/enquiries`),
  admin-visible, with autoresponder email _(confirm email provider)_.

### 3.12 Legal

Privacy Policy & Terms — **client must provide/approve real legal text** (`NEEDS CLIENT CONFIRMATION`).

---

## 4. Cross-cutting

- **SEO:** per-route metadata via admin SEO module; sitemap.xml, robots.txt, Open Graph, canonical.
- **Analytics/consent:** cookie consent if analytics added _(confirm)_.
- **Accessibility:** semantic landmarks, keyboard nav, focus states, alt text (admin-entered).
- **Performance:** Vite static assets + route-level code splitting, lazy-loaded images, minimal client JS.
- **States:** every list has loading skeleton, empty state, error boundary.

## 5. Open decisions (see CLIENT_CONFIRMATION_REQUIRED.md)

- Final nav labels & ordering.
- Whether `/services/:slug` details exist or anchor sections suffice.
- Testimonials source.
- Map provider (Google Maps embed vs static).
