# Design System — Yana Travels (Light Purple)

**Version:** 0.1 (provisional)  ·  **Date:** 2026-07-21  ·  **Lens:** UI/UX Designer

> ⚠️ **Palette is provisional.** The Yana Travels **logo has not been provided**
> (`docs/source-files/logo/` is empty). Final purple hues, contrast checks, and the accent
> must be re-derived from the logo before build. Until then, use the values below.

---

## 1. Design principles
Premium, modern, trustworthy travel brand. White-dominant with **very light lavender** section
washes and **logo-compatible purple** accents. Large destination photography carries the emotion;
UI stays calm — generous spacing, soft shadows, fine borders, elegant rounded cards, clean type.

**Explicitly avoid:** neon purple, dark-purple-everywhere, generic AI layouts, excessive
gradients, heavy glassmorphism, excessive animation, tiny text, overcrowded cards, fake
testimonials, random stock content.

---

## 2. Colour tokens (provisional — verify against logo & WCAG)

| Token | Hex | Usage |
|---|---|---|
| `--bg-main` | `#FCFAFF` | Page background |
| `--bg-soft` | `#F6F1FF` | Alternating/section background (light lavender) |
| `--primary` | `#7456D8` | Primary purple — buttons, links, active states |
| `--primary-hover` | `#5E43BE` | Hover/pressed (derive; verify contrast) |
| `--deep` | `#35234F` | Deep purple — headings on light, footer bg |
| `--lavender` | `#DCCFFF` | Soft fills, badges, chips |
| `--border` | `#E9E0F7` | Fine borders, dividers, card outlines |
| `--text-main` | `#241C2D` | Primary body text |
| `--text-secondary` | `#746A7E` | Secondary/muted text |
| `--white` | `#FFFFFF` | Cards, surfaces |
| `--success` | `#2E9E6B` | Success feedback (verify AA) |
| `--warning` | `#C9821A` | Warnings |
| `--danger` | `#C0453B` | Destructive actions |

**Contrast rules (WCAG 2.1 AA):** body text ≥ 4.5:1; large headings ≥ 3:1. `--text-secondary`
on `--bg-soft` must be re-checked — lighten background or darken text if it fails. CTA text on
`--primary` must be white and pass AA (verify; darken primary if needed).

**Usage discipline:** purple is an **accent**, not a flood. Most surface area is white/lavender;
deep purple reserved for footer, key headings, and emphasis.

---

## 3. Typography

- **Headings:** Manrope (600/700/800). **Body:** Inter (400/500/600). Load via `next/font`.
- Scale (rem, fluid via clamp on large headings):
  | Token | Size / line | Use |
  |---|---|---|
  | display | 3.0–3.75 / 1.05 | Hero |
  | h1 | 2.25 / 1.15 | Page title |
  | h2 | 1.75 / 1.2 | Section |
  | h3 | 1.375 / 1.3 | Card/subsection |
  | body-lg | 1.125 / 1.6 | Lead paragraph |
  | body | 1.0 / 1.65 | Default |
  | small | 0.875 / 1.5 | Meta/labels |
- **No tiny text**: minimum on-screen body 16px. Measure ~65–75ch for long text.

---

## 4. Spacing, radius, shadow, borders

- **Spacing scale (px):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Sections use generous vertical
  rhythm (64–96 desktop). Premium = whitespace.
- **Radius:** sm 8, md 12, lg 16, xl 24 (cards), pill for chips/buttons.
- **Shadows (soft, low-spread):**
  - `shadow-sm`: `0 1px 2px rgba(53,35,79,.06)`
  - `shadow-md`: `0 6px 20px rgba(53,35,79,.08)`
  - `shadow-lg`: `0 16px 40px rgba(53,35,79,.10)` (hover lift on cards)
- **Borders:** 1px `--border`; cards = fine border + soft shadow, not heavy.

---

## 5. Core components (spec)

- **Buttons:** primary (filled purple, white text), secondary (lavender fill), ghost (text +
  underline on hover). Pill radius, 44px min touch target, visible focus ring
  (`2px --primary` offset).
- **Cards (destination/package):** image (16:10) with subtle overlay, category badge, title,
  destination, duration icon, price/enquire line, CTA. Hover: lift + shadow-lg. Ample padding;
  never overcrowded.
- **Badges/chips:** lavender bg, deep-purple text, pill.
- **Inputs:** white bg, 1px border, focus = purple ring; label above; helper/error below (danger).
- **Navbar:** white, blur-free, sticky, condenses on scroll; dropdowns for Group/Customized.
- **Footer:** deep-purple bg, white/lavender text, columns, socials, brochure link.
- **Sections:** alternate `--white` / `--bg-soft`; consistent max-width container (~1200px).
- **Lightbox / gallery:** full-screen, keyboard-navigable, captioned.
- **Forms feedback:** inline validation, toast success, error banners.

---

## 6. Motion (Framer Motion — restrained)
- Fade/slide-up on section reveal (once, ~250–400ms, `ease-out`), small hover lifts, page
  transitions. Respect `prefers-reduced-motion`. No parallax overload, no continuous loops.

---

## 7. Imagery
- Large, high-quality destination photography (client-provided or licensed — **no random stock**
  standing in for real destinations without approval). Consistent aspect ratios, `next/image`,
  descriptive alt text (admin-entered), lazy-loading.

---

## 8. Tailwind mapping (build-time)
Expose tokens as CSS variables in `globals.css`, map in `tailwind.config` (`theme.extend.colors`,
`borderRadius`, `boxShadow`, `fontFamily`). Components consume semantic classes
(`bg-bg-soft`, `text-primary`, etc.), never raw hex.

## 9. Open items
- Finalise palette from logo (primary/deep may shift).
- Confirm photography source & licensing.
- Confirm brand font licensing if not Manrope/Inter.
