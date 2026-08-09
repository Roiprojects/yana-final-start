# PDF Extraction & Validation Report — Yana Travels

**Version:** 0.1  ·  **Date:** 2026-07-21  ·  **Lens:** Data extraction (PDF skills)
**Status:** 🟢 **EXTRACTED — 13 package PDFs + brochure provided (2026-07-23) in `packages/`.**
Logo still not provided.

---

## 1. Current status

| Source | Location | Found? |
|---|---|---|
| Trip-package PDFs (13) | `packages/*.pdf` (repo root) | ✅ provided |
| Company brochure PDF | `packages/Yana Travels New Brochure 2025.pdf` | ✅ provided |
| Logo (vector/PNG) | `docs/source-files/logo/` | ❌ still missing |

The 13 trip-package PDFs were extracted with `pdftotext -layout` and parsed into structured JSON
at `docs/planning/extracted-packages/*.json` (title, scope, tour type, destination, duration,
overview, highlights, **day-wise itinerary**, inclusions, exclusions, **per-person price**, source
provenance). The site renders these via `src/lib/data/packages.generated.json` until Supabase is
connected. **Prices are the per-person figures stated in the PDFs, shown as "from ₹X per person"
with an "indicative — enquire for current quote" note** (no invented values; missing fields omitted).

### Extraction log
| # | Package | Days | Price (₹/pp) | Itinerary | Incl. | Excl. |
|---|---|---|---|---|---|---|
| 1 | Andaman Family | 5 | (enquire) | 5 | ✓ | ✓ |
| 2 | Best of Europe | 13 | 2,80,000 | 13 | ✓ | – |
| 3 | England & Europe | 16 | 3,65,000 | 16 | ✓ | – |
| 4 | Beautiful Bali | 7 | 59,500 | 7 | ✓ | ✓ |
| 5 | China | 9 | 1,79,000 | 9 | ✓ | – |
| 6 | Nepal Muktinath | 8 | 65,000 | 8 | ✓ | ✓ |
| 7 | Singapore & Malaysia | 7 | 97,000 | 7 | – | ✓ |
| 8 | Singapore·Malaysia·Thailand | 11 | 1,21,000 | 11 | – | ✓ |
| 9 | Sri Lanka (Ramayana) | 7 | 49,500 | 5 | ✓ | ✓ |
| 10 | Chardham by Helicopter | 6 | 2,45,000 | 6 | ✓ | – |
| 11 | Leh·Ladakh·Kargil | 7 | 35,500 | 7 | ✓ | – |
| 12 | Odisha | 4 | 20,500 | 4 | ✓ | ✓ |
| 13 | Vietnam | 6 | 57,500 | 6 | ✓ | – |

**Still to confirm with client:** exact departure dates, hotel names per day, cancellation/visa
policy text, and any price validity/season. These are omitted (not invented) until confirmed.
The brochure PDF is not yet parsed into the About page.

---

## 2. Extraction workflow (to run once PDFs are provided)

1. **Ingest** — copy client PDFs (read-only) into the correct `source-files/` subfolder. Never
   overwrite originals.
2. **Inventory** — list every PDF; record filename, page count, and whether it is text-based or
   scanned (image) → use the `pdf` / `pdf-processing-pro` skills.
3. **Text extraction** — for text PDFs, extract per-page text + tables. For scanned PDFs, run
   **OCR** (pdf-processing-pro OCR) and flag lower confidence.
4. **Structure** — map extracted text to the package schema (§4). One JSON file per package in
   `docs/planning/extracted-packages/`, named `{slug}.json`.
5. **Provenance** — every file records `source_pdf` and `source_pages` for each field group.
6. **Confidence tagging** — each field: `extracted` (verbatim from PDF), `inferred` (derived —
   must be confirmed), or `missing` → `NEEDS CLIENT CONFIRMATION`.
7. **Validation report** — produce a per-package table of extracted vs missing vs uncertain;
   list conflicts (e.g. price differs between brochure and package PDF).
8. **Client review** — client confirms/corrects. Only then is `review_status` set to `verified`.
9. **Seed** — only `verified` packages are seeded into Supabase (still `draft` until published).

**Do not skip step 8.** No unverified data enters the database.

---

## 3. Validation rules
- Prices must be numeric + currency; reject "call for price" as a price (leave null).
- Dates must parse to real calendar dates; ambiguous formats flagged.
- Itinerary day numbers contiguous; gaps flagged.
- Inclusions/exclusions must be explicit lists from the PDF, not inferred.
- Hotel names only if literally named in the PDF.
- Any figure appearing only in marketing copy (e.g. "10,000+ happy travellers") is **not**
  treated as verified unless the client confirms.

---

## 4. Target JSON schema (per package)
See `docs/planning/extracted-packages/_TEMPLATE.json`. Fields:
`package_title, slug, tour_category, scope (domestic|international), tour_type (group|customized),
group_subtype, destination, state, country, duration_days, duration_nights, overview,
highlights[], itinerary[{day, title, detail, meals, stay}], accommodation, meals_info,
transport_info, inclusions[], exclusions[], price{amount,currency}, taxes_info, departures[],
pickup_location, drop_location, documents_required[], visa_info, cancellation_policy, terms,
contact{phone,email}, source_pdf, source_pages, field_confidence{...}, review_status`.

---

## 5. Extraction log (to be filled)

| PDF file | Pages | Type (text/scan) | Package(s) | JSON output | review_status | Notes |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | **Awaiting source files** |

---

## 6. Failed/blocked attempts (this session)
- ❌ No PDFs to open — `pdf` / `pdf-processing-pro` skills not run (nothing to process).
- ✅ Live website audited instead (see PRD & CONTENT_GAP_REPORT) to recover destination list,
  service list, contact info, and durations — but **not** prices/itineraries (not on site).
