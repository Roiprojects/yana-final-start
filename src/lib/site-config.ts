/**
 * Static site configuration — CONFIRMED values only (from the live-site audit, 2026-07-21).
 * These are fallbacks; editable values will later come from Supabase `site_settings` / `contact_info`.
 *
 * NOTE: No bank details are stored here or anywhere public (see docs/CONTENT_GAP_REPORT.md).
 * Anything not verified is left out rather than invented.
 */

export const siteConfig = {
  name: "Yana Travels",
  tagline: "Reach your dream with us",
  // Brand appears as both "Yana Travels" and "Yana India" — NEEDS CLIENT CONFIRMATION.
  email: "info@yanaindia.com",
  phone: "+91 9513588143",
  whatsapp: "919513588143", // used for wa.me links
  social: {
    facebook: "https://www.facebook.com/yana.reachyourdreamwithus/",
    // Exact Instagram link from yanaindia.com. It is an invite link, not a permanent
    // profile handle — a stable @handle still NEEDS CLIENT CONFIRMATION.
    instagram:
      "https://www.instagram.com/invites/contact/?i=pagoxoloh51o&utm_content=ixj413b",
  },
  founded: 2015,
  offices: [
    {
      name: "Udupi",
      note: "",
      address: "Corporate Office, Udupi",
    },
    {
      name: "Bengaluru",
      note: "",
      address:
        "#20, 3rd Floor, S L Plaza, 8th Cross Sampige Road, Malleshwaram, Bengaluru-560003",
    },
    {
      name: "Hubli",
      note: "",
      address:
        "#45, 3rd Floor, Satellite Complex, Koppikar Road, Hubli - 580020",
    },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Group Tours",
    href: "/group-tours",
    children: [
      { label: "With Kitchen Staff", href: "/group-tours/kitchen-staff" },
      { label: "Domestic", href: "/group-tours/domestic" },
      { label: "International", href: "/group-tours/international" },
    ],
  },
  {
    label: "Customized Tours",
    href: "/customized-tours",
    children: [
      { label: "Domestic", href: "/customized-tours/domestic" },
      { label: "International", href: "/customized-tours/international" },
      { label: "View All Packages", href: "/packages" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function whatsappLink(
  message?: string,
  whatsappNumber?: string,
): string {
  const base = `https://wa.me/${whatsappNumber ?? siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
