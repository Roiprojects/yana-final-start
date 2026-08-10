# Product Requirements Document — Yana Travels Website

**Version:** 0.2 (Build) · **Date:** 2026-08-10 · **Status:** Implemented — React SPA + Express API + PostgreSQL
**Lens:** Product Manager / Business Analyst

> Confirmed facts are sourced from the live site https://yanaindia.com/ (audited 2026-07-21).
> Anything not so sourced is an **assumption** and labelled, or marked `NEEDS CLIENT CONFIRMATION`.

---

## 1. Company snapshot (confirmed from existing site)

| Field            | Value                                                                                            | Source                           |
| ---------------- | ------------------------------------------------------------------------------------------------ | -------------------------------- |
| Brand            | Yana Travels / "Yana India"                                                                      | site                             |
| Tagline          | "Reach your dream with us"                                                                       | site                             |
| Email            | info@yanaindia.com                                                                               | site                             |
| Phone / WhatsApp | +91 9513588143                                                                                   | site (booking is WhatsApp-based) |
| Bengaluru office | #20, 3rd Floor, 8th Cross, Sampige Road, Malleshwaram, Bengaluru 560003 (near Asha Sweet Center) | contact.html                     |
| Udupi office     | #4-153, Ramnath Building, Near Upavana Nursery, Hayagreeva Nagar, Kunjibettu Post, Udupi 576102  | contact.html                     |
| Facebook         | facebook.com/yana.reachyourdreamwithus                                                           | site                             |
| Instagram        | (invite link on site)                                                                            | site                             |
| Current vendor   | ITFEND (itfend.tech)                                                                             | footer                           |

> ⚠️ The existing contact page publicly exposes **full bank account + IFSC details**. This is a
> security/fraud risk and should **not** be reproduced on the new public site. See CONTENT_GAP_REPORT.

---

## 2. Problem statement

The current website is a **static brochure**: no prices, no itineraries, no departure dates,
no online enquiry — every booking funnels to a single WhatsApp number. Content can only be
changed by the external vendor. The business cannot update packages, publish offers, or
capture structured leads on its own.

## 3. Goals & success metrics

| Goal                                             | Success signal                                                                                  |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Convert browsers into qualified enquiries        | Enquiry form submissions captured in PostgreSQL via the Express API; measurable conversion rate |
| Let staff manage all content without a developer | 100% of packages/pages editable via admin panel                                                 |
| Present a premium, trustworthy brand             | Modern design system, real content, fast Core Web Vitals                                        |
| Structured, searchable package catalogue         | Filter by domestic/international, group/customized, category, duration                          |
| Reduce dependence on WhatsApp-only funnel        | Web enquiry + WhatsApp both available                                                           |

**Out of scope for v1 (assumption — confirm):** online payment/booking checkout, user accounts
for travellers, multi-currency pricing, blog/CMS articles. These can be phase 2.

## 4. Target users / personas (assumption — refine with client)

1. **Leisure traveller / family** — browses domestic & international group tours, wants price,
   itinerary, dates, and an easy enquiry.
2. **Pilgrimage traveller** — Chardham, Kashi, Amarnath, Ayodhya; often wants group tours with
   **kitchen staff** (sattvic/regional food en route).
3. **Corporate / MICE buyer** — wants a customised proposal, not a fixed package.
4. **Admin/staff** — creates and updates packages, banners, gallery, handles enquiries.

## 5. Confirmed service catalogue (from existing site)

**Services (11):** Bike Trips, Honeymoon Packages, Historic Destinations, Pilgrimage Packages,
MICE, Cruises, Children's Programme, Flight Booking, Visa, Forex, Hotel Booking.

**Tour categories present today:** Domestic Tours, International Tours, Weekend Getaway &
Trekking, Corporate Outing / MICE.

**Domestic packages (30, durations only — no prices):** Andaman (5d), Assam–Meghalaya (7d),
Assam–Meghalaya–Arunachal (9d), Golden Triangle (5d), Goa (3d), Gujarat–Statue of Unity (3d),
Rann Utsav (7d), Shimla–Manali (5d), Amarnath Yatra (4d), Kerala (5d), Leh–Ladakh (5d),
Meghalaya (4d), Puri–Konark (4d), Kashmir (5d), Nagaland–Manipur–Hornbill (5d), Shirdi (3d),
Mahabaleshwar (3d), Hyderabad (3d), Ayodhya–Kashi–Gaya (7d), Chardham Yatra (12d),
Badri–Kedarnath (7d), Pondicherry (3d), Kashi–Gaya (5d), Rajasthan (9d), Dharamshala–Dalhousie (5d),
Madurai–Rameshwaram–Kanyakumari (4d), Ooty (3d), Gujarat–Rajasthan (12d),
Sikkim–Darjeeling–Gangtok (7d), Golden Temple–Amritsar–Wagah (5d).

**International packages (21, durations only):** Singapore (4d), Malaysia (4d), Dubai (4d),
Thailand (9d), Vietnam (5d), Cambodia (5d), Maldives (4d), Bali (7d), Nepal (5d), Bhutan (5d),
Sri Lanka (5d), Philippines (5d), Japan (7d), Australia (—), New Zealand (—), China (7d),
Hong Kong–Macau (5d), Mauritius (6d), Europe (15d), Turkey (6d), Russia (7d).

**Weekend & trekking (16):** Bangalore surrounds, Coorg, Chikmagalur, Kodachadri, Dandeli,
Gokarna, Yana Caves, Kabini, Bandipur, Nagarhole, Mysore, Hampi, Sakleshpur, Belur, Jog Falls,
Shivanasamudra Falls.

> **Prices, itineraries, hotels, dates, inclusions/exclusions are NOT on the current site.**
> They must come from the trip-package PDFs (currently missing) → `NEEDS CLIENT CONFIRMATION`.

## 6. New requirements introduced by this brief (beyond current site)

- **Group Tours** split into: _with Kitchen Staff_, _Domestic_, _International_.
- **Customized Tours** split into: _Domestic_, _International_.
- Dedicated **Tour Packages** listing + **Package Details** pages (dynamic).
- **Gallery**, **Brochure** download, **Services** detail.
- Two enquiry flows: **Customized Tour Enquiry** and **General Enquiry**.
- **Privacy Policy** and **Terms & Conditions**.
- Full **admin panel** (22 modules — see ADMIN_ARCHITECTURE.md).

## 7. Functional requirements (high level)

- FR1 — Public catalogue browsable by category, domestic/international, group/customized, duration.
- FR2 — Package detail page renders overview, highlights, day-wise itinerary, inclusions,
  exclusions, accommodation, meals, transport, price, departures, policies — each field optional
  and only shown when present.
- FR3 — Enquiry forms (general + customized) validate via Zod and persist to PostgreSQL through the Express API; admin sees
  them in an Enquiry module with status workflow.
- FR4 — Every content surface (home hero, sections, about, services, gallery, packages, SEO,
  settings) is admin-editable and reflected live.
- FR5 — Admin auth via Express HMAC-cookie sessions (`server/auth.ts`, `requireAdmin`); role-gated.
- FR6 — Draft → Preview → Publish workflow for content; activate/deactivate; reorder.
- FR7 — Image & PDF upload via `POST /api/upload` (multer → `public/uploads/`), admin-auth-gated.
- FR8 — WhatsApp deep-link + web enquiry both offered on package/contact pages.

## 8. Non-functional requirements

- Performance: Core Web Vitals "Good"; images optimised (Vite static assets), lazy-loaded.
- Accessibility: WCAG 2.1 AA target.
- SEO: per-page metadata, Open Graph, sitemap, structured data (Trip/Product where valid).
- Security: admin routes gated by HMAC auth on the Express API; no secrets in client; no bank details on public site.
- Reliability: graceful empty/error states; no crash on missing package fields.
- i18n: English v1 (assumption). Additional languages = phase 2.

## 9. Assumptions register

| #   | Assumption                                                 | Confirm?        |
| --- | ---------------------------------------------------------- | --------------- |
| A1  | No online payments in v1                                   | ✅ needs client |
| A2  | English only in v1                                         | ✅ needs client |
| A3  | Enquiry (not instant booking) is the primary conversion    | ✅ needs client |
| A4  | Same two offices (Bengaluru, Udupi) remain current         | ✅ needs client |
| A5  | Phone +91 9513588143 is current and is also WhatsApp       | ✅ needs client |
| A6  | Package list from old site is still the intended catalogue | ✅ needs client |

See `docs/CLIENT_CONFIRMATION_REQUIRED.md` for the full list.
