# Design System — Yana Travels (Navy / Gold / Cream)

**Version:** 0.2 · **Date:** 2026-08-10 · **Lens:** UI/UX Designer

> **Supersedes the earlier light-purple/lavender v0.1 spec.** The implemented design is a bright,
> luxury **navy / gold / cream** theme. Hues remain provisional until the logo is provided
> (`docs/source-files/logo/` is still empty) — see §9.

---

## 1. Design principles

Premium, modern, trustworthy travel brand. Cream-white dominant with very light warm section
washes and **navy + gold** accents. Large destination photography carries the emotion; UI stays
calm — generous spacing, soft shadows, fine borders, elegant rounded cards, clean type with a
distinctive serif display face.

**Explicitly avoid:** neon colours, all-dark sections, generic AI layouts, excessive gradients,
heavy glassmorphism, excessive animation, tiny text, overcrowded cards, fake testimonials,
random stock content.

---

## 2. Colour tokens (implemented in `src/globals.css` `@theme`)

| Token                    | Hex       | Usage                                                   |
| ------------------------ | --------- | ------------------------------------------------------- |
| `--color-bg-main`        | `#FFFDF8` | Page background (cream-white)                           |
| `--color-bg-soft`        | `#F7F1E4` | Alternating/section background (light warm wash)        |
| `--color-primary`        | `#173F6B` | Primary navy — buttons, links, active states            |
| `--color-primary-hover`  | `#102F52` | Hover/pressed                                           |
| `--color-gold`           | `#C99B2D` | Gold highlight — accents, badges, underlines            |
| `--color-gold-soft`      | `#ECD8A0` | Soft gold fills, chips                                  |
| `--color-deep`           | `#10213A` | Deep navy — headings, footer bg                         |
| `--color-lavender`       | `#EEF3FB` | Soft blue-grey fills (kept for neutral tinted surfaces) |
| `--color-border-soft`    | `#E8DECB` | Fine borders, dividers, card outlines                   |
| `--color-text-main`      | `#18273B` | Primary body text                                       |
| `--color-text-secondary` | `#6C7788` | Secondary/muted text                                    |
| `--color-success`        | `#2E9E6B` | Success feedback (verify AA)                            |
| `--color-warning`        | `#C9821A` | Warnings                                                |
| `--color-danger`         | `#C0453B` | Destructive actions                                     |

**Contrast rules (WCAG 2.1 AA):** body text ≥ 4.5:1; large headings ≥ 3:1. `--color-text-secondary`
on `--color-bg-soft` must be re-checked — lighten background or darken text if it fails. CTA text
on `--color-primary` (navy) is white and passes AA.

**Usage discipline:** navy is the primary accent; gold is a highlight, not a flood. Most surface
area is cream/white; deep navy reserved for footer, key headings, and emphasis.

---

## 3. Typography

- Fonts are loaded via **Google Fonts `<link>` in `index.html`**, then exposed as CSS variables
  (`--font-fraunces`, `--font-manrope`, `--font-inter`) in `:root` and mapped through the
  Tailwind v4 `@theme` block in `src/globals.css`.
  - **Display:** Fraunces (400–900, optical sizing) — hero and large headings.
  - **Headings:** Manrope (500–800).
  - **Body:** Inter (400/500/600).
- Scale (rem, fluid via clamp on large headings):
  | Token   | Size / line     | Use             |
  | ------- | --------------- | --------------- |
  | display | 3.0–3.75 / 1.05 | Hero            |
  | h1      | 2.25 / 1.15     | Page title      |
  | h2      | 1.75 / 1.2      | Section         |
  | h3      | 1.375 / 1.3     | Card/subsection |
  | body-lg | 1.125 / 1.6     | Lead paragraph  |
  | body    | 1.0 / 1.65      | Default         |
  | small   | 0.875 / 1.5     | Meta/labels     |
- **No tiny text**: minimum on-screen body 16px. Measure ~65–75ch for long text.

---

## 4. Spacing, radius, shadow, borders

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Sections use generous vertical
  rhythm (64–96 desktop). Premium = whitespace.
- **Radius (tokens in `@theme`):** sm 8, md 12, lg 16, xl 24 (cards), pill for chips/buttons.
- **Shadows (soft, low-spread, on deep-navy):**
  - `shadow-sm`: `0 1px 2px rgba(16,33,58,.05)`
  - `shadow-md`: `0 12px 30px rgba(16,33,58,.08)`
  - `shadow-lg`: `0 16px 40px rgba(16,33,58,.10)` (hover lift on cards)
- **Borders:** 1px `--color-border-soft`; cards = fine border + soft shadow, not heavy.

---

## 5. Core components (spec)

- **Buttons:** primary (navy fill, white text), secondary (gold-soft/lavender fill), ghost (text +
  underline on hover). Pill radius, 44px min touch target, visible focus ring
  (`2px --color-primary` offset).
- **Cards (destination/package):** image (16:10) with subtle overlay, category badge, title,
  destination, duration icon, price/enquire line, CTA. Hover: lift + shadow-lg. Ample padding;
  never overcrowded.
- **Badges/chips:** gold-soft or lavender bg, deep-navy text, pill.
- **Inputs:** white bg, 1px border, focus = navy ring; label above; helper/error below (danger).
- **Navbar:** cream/white, sticky, condenses on scroll; dropdowns for Group/Customized.
- **Footer:** deep-navy bg, white/lavender text, columns, socials, brochure link.
- **Sections:** alternate `--color-bg-main` / `--color-bg-soft`; consistent max-width container (~1200px).
- **Lightbox / gallery:** full-screen, keyboard-navigable, captioned.
- **Forms feedback:** inline validation, toast success, error banners.

---

## 6. Motion (Framer Motion — restrained)

- Fade/slide-up on section reveal (once, ~250–400ms, `ease-out`), small hover lifts, page
  transitions. Respect `prefers-reduced-motion`. No parallax overload, no continuous loops.

---

## 7. Imagery

- Large, high-quality destination photography (client-provided or licensed — **no random stock**
  standing in for real destinations without approval). Consistent aspect ratios, descriptive alt
  text (admin-entered), lazy-loading. Static images live under `public/` or `/uploads/` and are
  referenced directly (no image-optimisation layer in the SPA).

---

## 8. Tailwind mapping (build-time)

- Tailwind **v4, CSS-first**: tokens are defined as CSS variables in the `@theme` block of
  `src/globals.css` and consumed through semantic utility classes (`bg-bg-soft`,
  `text-primary`, `border-border-soft`, `font-display`, etc.), never raw hex. There is **no**
  `tailwind.config.js` theme extension.

## 9. Open items

- Finalise palette from logo when provided (primary/deep/gold may shift).
- Confirm photography source & licensing.
- Confirm brand font licensing if not Fraunces/Manrope/Inter.
