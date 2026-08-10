# Content Gap Report — Yana Travels

**Version:** 0.1 · **Date:** 2026-07-21 · **Lens:** Business Analyst
Based on audit of https://yanaindia.com/ (2026-07-21) + review of provided source folders.

---

## 1. Missing content (needed before build)

| Area                              | Gap                            | Impact                                           |
| --------------------------------- | ------------------------------ | ------------------------------------------------ |
| **Package prices**                | No prices anywhere on the site | Cannot show pricing; `NEEDS CLIENT CONFIRMATION` |
| **Itineraries**                   | No day-wise itineraries        | Package detail pages empty without PDFs          |
| **Departure dates**               | None published                 | Departures module has no data                    |
| **Inclusions/exclusions**         | None on site                   | Core package fields missing                      |
| **Hotels / accommodation**        | Not named                      | Cannot list; confirmed-only                      |
| **About Us copy**                 | Only a short generic blurb     | Need real company story from brochure            |
| **Achievements / stats / years**  | None verified                  | Do not invent trust numbers                      |
| **Testimonials**                  | None on site                   | Do not fabricate; collect real ones              |
| **Legal (Privacy, T&C)**          | Absent                         | Client must provide/approve                      |
| **Logo (vector)**                 | Not provided                   | Blocks final palette                             |
| **Brochure PDF**                  | Not provided                   | Blocks About + brochure page                     |
| **Trip-package PDFs**             | Not provided                   | Blocks entire package catalogue data             |
| **Group "kitchen staff" details** | Not on site                    | New concept; need client copy                    |
| **Customized tours**              | Not a distinct section today   | New; need positioning copy                       |
| **Office hours**                  | Not stated                     | Minor; confirm                                   |
| **High-res destination photos**   | Old site quality unknown/low   | Need licensed or client imagery                  |

## 2. Outdated / risky content on current site

| Issue                       | Detail                                                          | Action                                                  |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------- |
| 🔴 **Bank account exposed** | Full Axis Bank account no. + IFSC on public contact page        | **Do NOT reproduce.** Fraud risk; remove from new site. |
| WhatsApp-only funnel        | Every "Book Now" is a WhatsApp link; no structured lead capture | Add web enquiry forms → PostgreSQL via `/api/enquiries` |
| Third-party vendor lock     | "Powered by ITFEND", static HTML                                | Rebuild dynamic, client-owned                           |
| Instagram link              | Points to an invite/contact link, not a clean profile           | Confirm correct handle                                  |
| No prices/itineraries       | Purely brochure-ware                                            | Make dynamic & data-backed                              |

## 3. Inconsistent / low-quality content

| Issue             | Detail                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Spelling/labels   | "corparate.html", "Rann Ustav" (Utsav), "Dharmsala–Dalhouse" (Dharamshala–Dalhousie), "Black Papper" (unrelated folder) — standardise spellings on rebuild |
| Category overlap  | "Domestic/International Tours" vs "Weekend & Trekking" vs "Corporate/MICE" not cleanly modelled                                                            | Normalise via `categories` + `scope` + `tour_type` |
| Missing durations | Australia, New Zealand have no duration listed                                                                                                             | Confirm                                            |
| Two brand names   | "Yana Travels" (bank/account) vs "Yana India" (site)                                                                                                       | Confirm official legal + display name              |

## 4. Repeated content

- Same package cards/links repeated across home + category pages (expected) — in the rebuild these
  derive from one `tour_packages` source, eliminating manual duplication.
- Booking CTA (WhatsApp number) repeated site-wide — will be centralised in `site_settings`.

## 5. Content we CAN reuse (confirmed from site)

- Service list (11), destination lists (30 domestic + 21 international + 16 weekend), durations,
  contact phone/email, both office addresses, social links, tagline. These seed taxonomy and
  **destination stubs** — but **not** prices/itineraries (still needed).

## 6. Recommendations

1. Obtain logo, brochure, and package PDFs (top priority — unblocks everything).
2. Remove bank details from all public surfaces.
3. Confirm official brand name, correct Instagram, office hours.
4. Provide/approve legal copy.
5. Supply or approve licensed destination photography.
6. Decide payments/booking scope for v1.
