# Source Files — REQUIRED FROM CLIENT (currently empty)

These folders must hold the client's original, approved source material. As of **2026-07-21
they are empty** and all PDF-driven work is blocked.

Place files exactly here (do not rename originals; treat them as read-only):

| Folder           | Expected contents                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `logo/`          | Yana Travels logo — vector (SVG/AI/PDF/EPS) preferred, plus high-res PNG. Used to finalise the purple palette. |
| `brochure/`      | Company brochure PDF (company profile, services, achievements, contact).                                       |
| `trip-packages/` | One PDF per approved tour package (title, itinerary, price, dates, inclusions/exclusions, etc.).               |

**Rules**

- Do not overwrite or delete any file placed here.
- Do not import any data derived from these files into PostgreSQL until the validation report
  in `docs/PDF_EXTRACTION_REPORT.md` is complete and signed off.
- Extracted structured data is written to `docs/planning/extracted-packages/`, not here.
