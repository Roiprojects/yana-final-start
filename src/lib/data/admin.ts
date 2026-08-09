import { query } from "@/lib/db";

// ── Enquiries ────────────────────────────────────────────────────────────────
export type EnquiryRow = {
  id: string;
  type: "general" | "customized";
  name: string;
  phone: string;
  email: string | null;
  destination_interest: string | null;
  travellers: number | null;
  travel_date: string | null;
  budget_range: string | null;
  hotel_category: string | null;
  scope: "domestic" | "international" | null;
  message: string | null;
  status: "new" | "contacted" | "closed";
  source: string | null;
  created_at: string;
};

export async function listEnquiries(status?: string): Promise<EnquiryRow[]> {
  const params: unknown[] = [];
  let where = "";
  if (status && ["new", "contacted", "closed"].includes(status)) {
    params.push(status);
    where = `where status = $1`;
  }
  const rows = await query<EnquiryRow>(
    `select id, type, name, phone, email, destination_interest, travellers,
            travel_date, budget_range, hotel_category, scope, message, status,
            source, created_at
       from enquiries ${where}
      order by created_at desc
      limit 200`,
    params,
  );
  return rows ?? [];
}

export type EnquiryCounts = {
  total: number;
  new: number;
  contacted: number;
  closed: number;
};

export async function enquiryCounts(): Promise<EnquiryCounts> {
  const rows = await query<{ status: string; n: string }>(
    `select status, count(*)::int n from enquiries group by status`,
  );
  const c: EnquiryCounts = { total: 0, new: 0, contacted: 0, closed: 0 };
  for (const r of rows ?? []) {
    const n = Number(r.n);
    c.total += n;
    if (r.status === "new") c.new = n;
    else if (r.status === "contacted") c.contacted = n;
    else if (r.status === "closed") c.closed = n;
  }
  return c;
}

// ── Packages (admin view) ────────────────────────────────────────────────────
export type AdminPackageRow = {
  id: string;
  title: string;
  slug: string;
  scope: "domestic" | "international";
  tour_type: "group" | "customized";
  price_amount: string | number | null;
  is_active: boolean;
  is_featured: boolean;
  status: "draft" | "published";
  sort_order: number;
};

export async function listAdminPackages(): Promise<AdminPackageRow[]> {
  const rows = await query<AdminPackageRow>(
    `select id, title, slug, scope, tour_type, price_amount, is_active,
            is_featured, status, sort_order
       from tour_packages
      order by sort_order asc`,
  );
  return rows ?? [];
}

export type EditablePackage = {
  id: string;
  title: string;
  slug: string;
  scope: "domestic" | "international";
  tour_type: "group" | "customized";
  category_name: string | null;
  destination_name: string | null;
  country: string | null;
  duration_days: number | null;
  duration_nights: number | null;
  overview: string | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  price_amount: string | number | null;
  taxes_info: string | null;
  hero_image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  status: "draft" | "published";
};

export async function getEditablePackage(
  id: string,
): Promise<EditablePackage | null> {
  const rows = await query<EditablePackage>(
    `select id, title, slug, scope, tour_type, category_name, destination_name,
            country, duration_days, duration_nights, overview, highlights,
            inclusions, exclusions, price_amount, taxes_info, hero_image_url,
            is_featured, is_active, status
       from tour_packages where id = $1 limit 1`,
    [id],
  );
  return rows?.[0] ?? null;
}

export async function packageCounts(): Promise<{
  total: number;
  published: number;
  featured: number;
}> {
  const rows = await query<{ total: string; published: string; featured: string }>(
    `select count(*)::int total,
            count(*) filter (where status='published' and is_active)::int published,
            count(*) filter (where is_featured)::int featured
       from tour_packages`,
  );
  const r = rows?.[0];
  return {
    total: Number(r?.total ?? 0),
    published: Number(r?.published ?? 0),
    featured: Number(r?.featured ?? 0),
  };
}

// ── Destinations ─────────────────────────────────────────────────────────────
export type AdminDestinationRow = {
  id: string;
  name: string;
  slug: string;
  scope: "domestic" | "international";
  country: string | null;
  description: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminDestinations(): Promise<AdminDestinationRow[]> {
  const rows = await query<AdminDestinationRow>(
    `select id, name, slug, scope, country, description, image_url, is_featured, is_active, sort_order
       from destinations
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Services ─────────────────────────────────────────────────────────────────
export type AdminServiceRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminServices(): Promise<AdminServiceRow[]> {
  const rows = await query<AdminServiceRow>(
    `select id, name, slug, description, is_active, sort_order
       from services
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export type AdminTestimonialRow = {
  id: string;
  customer_name: string;
  location: string | null;
  photo_url: string | null;
  rating: number;
  review: string;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminTestimonials(): Promise<AdminTestimonialRow[]> {
  const rows = await query<AdminTestimonialRow>(
    `select id, customer_name, location, photo_url, rating, review, is_active, sort_order
       from testimonials
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Gallery ──────────────────────────────────────────────────────────────────
export type AdminGalleryRow = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminGallery(): Promise<AdminGalleryRow[]> {
  const rows = await query<AdminGalleryRow>(
    `select id, title, category, image_url, is_active, sort_order
       from gallery
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── FAQs ─────────────────────────────────────────────────────────────────────
export type AdminFaqRow = {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminFaqs(): Promise<AdminFaqRow[]> {
  const rows = await query<AdminFaqRow>(
    `select id, question, answer, category, is_active, sort_order
       from faqs
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Contact Info / Offices ───────────────────────────────────────────────────
export type AdminOfficeRow = {
  id: string;
  office_name: string;
  address: string | null;
  city: string | null;
  pincode: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminOffices(): Promise<AdminOfficeRow[]> {
  const rows = await query<AdminOfficeRow>(
    `select id, office_name, address, city, pincode, phone, email, hours, is_active, sort_order
       from contact_info
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Hero Slides ─────────────────────────────────────────────────────────────
export type AdminHeroRow = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  cta_primary_text: string | null;
  cta_primary_link: string | null;
  is_active: boolean;
  sort_order: number;
};

export async function listAdminHeroSlides(): Promise<AdminHeroRow[]> {
  const rows = await query<AdminHeroRow>(
    `select id, title, subtitle, image_url, cta_primary_text, cta_primary_link, is_active, sort_order
       from hero_slides
      order by sort_order asc`,
  );
  return rows ?? [];
}

// ── Public Fetchers ─────────────────────────────────────────────────────────
export async function listPublicDestinations() {
  const rows = await query<AdminDestinationRow>(
    `select id, name, slug, scope, country, description, image_url, is_featured, is_active, sort_order
       from destinations
      where is_active = true
      order by sort_order asc`,
  );
  return rows ?? [];
}

export async function listPublicTestimonials() {
  const rows = await query<AdminTestimonialRow>(
    `select id, customer_name, location, photo_url, rating, review, is_active, sort_order
       from testimonials
      where is_active = true
      order by sort_order asc`,
  );
  return rows ?? [];
}

export async function listPublicFaqs() {
  const rows = await query<AdminFaqRow>(
    `select id, question, answer, category, is_active, sort_order
       from faqs
      where is_active = true
      order by sort_order asc`,
  );
  return rows ?? [];
}

export async function listPublicServices() {
  const rows = await query<AdminServiceRow>(
    `select id, name, slug, description, is_active, sort_order
       from services
      where is_active = true
      order by sort_order asc`,
  );
  return rows ?? [];
}



