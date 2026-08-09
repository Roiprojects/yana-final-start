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
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=92&sat=10&con=10&exp=4`;
}

export const heroImage = "photo-1506744038136-46273834b3fb"; // alpine lake panorama

export const experienceImage = "photo-1500530855697-b586d89ba3ee"; // luxury road trip mood

export const ctaImage = "photo-1499856871958-5b9627545d1a"; // elevated city escape

/** Thematic collections — safe, evocative groupings (not specific-place claims). */
export const collections = [
  {
    title: "Mountains & the North",
    blurb: "Himalayan valleys, high passes, and alpine calm.",
    image: "photo-1464822759023-fed622ff2c3b",
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
    image: "photo-1524492412937-b28074a5d7da",
    href: "/group-tours/domestic",
  },
  {
    title: "International Escapes",
    blurb: "Iconic cities and horizons beyond India.",
    image: "photo-1499856871958-5b9627545d1a",
    href: "/group-tours/international",
  },
] as const;
