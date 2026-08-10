/**
 * Curated placeholder photography (verified Unsplash IDs) used for atmosphere until
 * the client provides real destination photography.
 *
 * IMPORTANT: These are DECORATIVE/thematic — they are never labelled as a specific
 * package, price, or factual claim (see the no-invention rule in CLAUDE.md). Themes
 * are broad and safe ("Beaches & Islands"), not pin-point place assertions.
 * Swap for client assets (or Supabase Storage) when available.
 */

export function unsplash(id: string, w = 1920): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=92`;
}

export const heroImage = "photo-1519681393784-d120267933ba"; // bright alpine lake panorama

export const experienceImage = "photo-1469474968028-56623f02e42e"; // bright mountain landscape

export const ctaImage = "photo-1472214103451-9374bd1c798e"; // bright open landscape

/** Thematic collections — safe, evocative groupings (not specific-place claims). */
export const collections = [
  {
    title: "Mountains & the North",
    blurb: "Himalayan valleys, high passes, and alpine calm.",
    image: "photo-1506905925346-21bda4d32df4",
    href: "/group-tours/domestic",
  },
  {
    title: "Beaches & Islands",
    blurb: "Sun, sea, and slow island mornings.",
    image: "photo-1507525428034-b723cf961d3e",
    href: "/packages",
  },
  {
    title: "Heritage & Pilgrimage",
    blurb: "Timeless monuments and journeys of the spirit.",
    image: "photo-1548013146-72479768bada",
    href: "/group-tours/domestic",
  },
  {
    title: "International Escapes",
    blurb: "Iconic cities and horizons beyond India.",
    image: "photo-1436491865332-7a61a109cc05",
    href: "/group-tours/international",
  },
] as const;
