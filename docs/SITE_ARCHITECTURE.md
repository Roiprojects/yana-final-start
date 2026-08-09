# Public Site Architecture — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21  ·  **Lens:** Product Architect
Framework: **Next.js App Router** (Server Components first, dynamic data from Supabase).

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
  /packages/[slug]             Package Details (dynamic)
/services                      Services (listing)
  /services/[slug]             Service detail (optional; else anchor sections)
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
| Route | Strategy | Reason |
|---|---|---|
| `/`, `/about`, `/services`, `/privacy-policy`, `/terms` | Static + ISR (revalidate on publish) | Content changes rarely |
| `/packages`, category hubs | Server-rendered + ISR / tag-revalidate | Reflect admin edits |
| `/packages/[slug]` | SSG with `generateStaticParams` + ISR fallback | SEO + freshness |
| `/gallery`, `/brochure` | ISR | Media managed in admin |
| `/enquiry*`, `/contact` form | Client components → Server Action / route handler → Supabase | Writes |

> Admin **Publish** triggers revalidation (tag/path) so public pages update without a redeploy.

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
2. **Trust strip** — offices, years, contact. *(Any stat = confirmed only, else omit.)*
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
- **Card:** image, title, destination, duration, "from ₹price" *(only if price confirmed, else
  "Enquire for price")*, category badge, CTA.

### 3.6 Package Details (`/packages/[slug]`)
Renders only the fields that exist (all optional):
- Hero image + title, destination/state/country, duration, category & type badges.
- Overview, Highlights.
- **Day-wise itinerary** (accordion).
- Accommodation, Meals, Transportation.
- Inclusions / Exclusions (two columns).
- Price + taxes *(confirmed only)*, Departure dates *(confirmed only)*.
- Pickup/Drop, Documents required, Visa info, Cancellation policy, T&C.
- **Sticky enquiry card** (prefilled with package) + WhatsApp deep-link.
- Related packages.
- SEO: structured data where fields are verified.

> Any missing field is simply **not rendered** (no "TBD", no invented value). Internally the
> record carries `review_status`; unverified packages are not published.

### 3.7 Services (`/services`)
Grid of the 11 services (confirmed list). Optional `/services/[slug]` detail if client provides copy.

### 3.8 Gallery (`/gallery`)
Masonry/grid from Supabase Storage; categories/albums; lightbox; lazy-loaded.

### 3.9 Brochure (`/brochure`)
Embedded viewer + download button (PDF from Storage). Blocked until brochure supplied.

### 3.10 Contact (`/contact`)
Both office addresses, phone, email, social, map embeds, office hours *(confirm)*, general
enquiry form. **No bank details.**

### 3.11 Enquiry forms
- **General** (`/enquiry`): name, phone, email, destination/interest, travellers, dates, message.
- **Customized** (`/enquiry/customized`): adds trip type, budget range, preferred hotel category,
  domestic/international, flexible dates. Both → Supabase `enquiries`, admin-visible, with
  autoresponder email *(confirm email provider)*.

### 3.12 Legal
Privacy Policy & Terms — **client must provide/approve real legal text** (`NEEDS CLIENT CONFIRMATION`).

---

## 4. Cross-cutting
- **SEO:** per-route metadata via admin SEO module; sitemap.xml, robots.txt, Open Graph, canonical.
- **Analytics/consent:** cookie consent if analytics added *(confirm)*.
- **Accessibility:** semantic landmarks, keyboard nav, focus states, alt text (admin-entered).
- **Performance:** next/image, route-level code splitting, minimal client JS.
- **States:** every list has loading skeleton, empty state, error boundary.

## 5. Open decisions (see CLIENT_CONFIRMATION_REQUIRED.md)
- Final nav labels & ordering.
- Whether `/services/[slug]` details exist or anchor sections suffice.
- Testimonials source.
- Map provider (Google Maps embed vs static).
