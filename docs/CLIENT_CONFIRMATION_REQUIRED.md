# Client Confirmation Required — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21
Everything below blocks or shapes the build. Nothing here will be invented. Items are grouped by
priority. Please answer inline or attach the requested files.

---

## 🔴 P0 — Hard blockers

1. ✅ **Trip-package PDFs** — RECEIVED (13 PDFs in `packages/`, 2026-07-23). Extracted to
   `docs/planning/extracted-packages/` and live on the site.
2. ✅ **Company brochure PDF** — RECEIVED (`packages/Yana Travels New Brochure 2025.pdf`).
   *(Still to be parsed into the About page.)*
3. 🔴 **Logo files** — STILL MISSING. Need vector (SVG/AI/EPS/PDF) + high-res PNG.
   *(Needed to finalise the purple palette and replace the text wordmark in the header.)*
4. 🔴 **Supabase project** — real project-ref + access token (to replace placeholders in `.mcp.json`)
   or confirmation to create a new Supabase project under the client's org.
5. **Who owns hosting & Supabase accounts?** (Recommended: client-owned.)

### Package data to confirm (now that PDFs are extracted)
- Confirm the **per-person prices** shown are current (extracted from the 2026 PDFs).
- Provide **departure dates**, **hotel names**, and **cancellation/visa policy** text per package
  (currently omitted, not invented).
- Confirm package **imagery** — the site currently uses representative placeholder photos.

## 🟠 P1 — Content & data facts (do not invent)

6. **Package prices, taxes, offers** — per package (from PDFs or a price sheet).
7. **Departure dates / seasons** — per package, if fixed-departure.
8. **Hotel / accommodation names** — per package, only if you want them shown.
9. **Inclusions & exclusions** — authoritative lists per package.
10. **Day-wise itineraries** — per package.
11. **Visa, documents required, cancellation policy, T&C** — per package and/or global.
12. **About Us story, mission, team** — real copy.
13. **Achievements / stats** (years in business, travellers served, awards) — only verified numbers.
14. **Testimonials** — real customer testimonials (name, location, text, permission). None will be
    fabricated; the section stays hidden if none are provided.
15. **Legal copy** — Privacy Policy and Terms & Conditions (provide or approve drafted text).
16. **Destination photography** — client-supplied or approval to license stock; no random stock
    stands in for real destinations without sign-off.

## 🟡 P2 — Business & scope decisions

17. **Official brand name** — "Yana Travels" vs "Yana India" (legal name + display name).
18. **v1 booking model** — enquiry-only (recommended) vs online payment/checkout (phase 2?).
19. **Language(s)** — English only in v1? Others later?
20. **Group "Kitchen Staff" tours** — describe the offering (which tours, what's included).
21. **Customized tours** — positioning/copy and how enquiries are handled.
22. **Package catalogue** — is the current list (30 domestic + 21 international + 16 weekend) the
    intended catalogue, or has it changed?
23. **Australia / New Zealand durations** — missing on current site.
24. **Admin roles** — confirm role matrix (proposed: `super_admin`, `editor`; may `editor` publish?).
25. **Enquiry notifications** — email provider + notification recipients (needed for autoresponder).

## 🟢 P3 — Contact & operations

26. **Confirm phone/WhatsApp** — +91 9513588143 current? Is it the WhatsApp number?
27. **Confirm both offices** — Bengaluru (Malleshwaram) + Udupi addresses still current?
28. **Office hours** — not stated on current site.
29. **Correct Instagram handle** — current link is an invite/contact link, not a clean profile.
30. **Email(s)** — info@yanaindia.com only, or additional (sales/support)?
31. **Domain** — migrate `yanaindia.com` now or build on a subdomain first? Registrar access?

## ⚠️ Security note (not a question — an action we are taking)
- The **current site publicly exposes full bank account number + IFSC**. We will **NOT** reproduce
  these on the new site (fraud/phishing risk). If account details must be shared with customers,
  it should be done privately (invoice/quote), not on a public web page.

---

### How this list is used
- P0 items unblock the technology setup and PDF extraction.
- P1 items are extracted from PDFs where possible, then confirmed; anything still missing renders
  as absent on the public site (never as invented content) and stays `NEEDS CLIENT CONFIRMATION`
  internally until resolved.
