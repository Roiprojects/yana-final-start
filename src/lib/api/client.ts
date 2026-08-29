import type { PackageDetail, PackageListItem, ItineraryDay } from "@/lib/types/tour";
import type {
  PublicFaq,
  PublicGalleryItem,
  PublicOffice,
  PublicTestimonial,
  SiteSettings,
} from "@/lib/types/content";
import { siteConfig } from "@/lib/site-config";
import generatedRaw from "@/lib/data/packages.generated.json";

type Generated = {
  package_title: string;
  slug: string;
  scope: "domestic" | "international";
  tour_type: "group" | "customized";
  group_subtype: "standard" | "kitchen_staff" | null;
  category_name: string | null;
  destination_name: string | null;
  country: string | null;
  duration_days: number | null;
  duration_nights: number | null;
  overview: string | null;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  price_amount: number | null;
  price_currency: string;
  taxes_info: string | null;
  hero_image_url: string | null;
  is_featured: boolean;
  source_pdf: string | null;
  source_pages: string | null;
  review_status: string;
};

const generated = generatedRaw as Generated[];

const curatedPackageImages = new Set([
  "andaman-family-4n5d",
  "best-of-europe-12n13d",
  "england-europe-15n16d",
  "bali-6n7d",
  "china-8n9d",
  "nepal-muktinath-7n8d",
  "singapore-malaysia-6n7d",
  "singapore-malaysia-thailand-10n11d",
  "sri-lanka-ramayana-6n7d",
  "chardham-helicopter-5n6d",
  "leh-ladakh-kargil-6n7d",
  "odisha-3n4d",
  "kerala-backwaters-munnar-5n6d",
  "kashmir-paradise-5n6d",
  "royal-rajasthan-forts-6n7d",
  "south-india-temple-heritage-5n6d",
  "himachal-shimla-manali-5n6d",
  "vietnam-5n6d",
]);

function packageImage(slug: string, fallback: string | null): string | null {
  return curatedPackageImages.has(slug) ? `/packages/${slug}.jpg` : fallback;
}

function genToListItem(g: Generated): PackageListItem {
  return {
    id: g.slug,
    title: g.package_title,
    slug: g.slug,
    scope: g.scope,
    tour_type: g.tour_type,
    duration_days: g.duration_days,
    duration_nights: g.duration_nights,
    price_amount: g.price_amount,
    price_currency: g.price_currency,
    hero_image_url: packageImage(g.slug, g.hero_image_url),
    overview: g.overview,
    category_name: g.category_name,
    destination_name: g.destination_name,
  };
}

function localList(filters: PackageListQuery): PackageListItem[] {
  return generated
    .filter((p) => (filters.scope ? p.scope === filters.scope : true))
    .filter((p) => (filters.tourType ? p.tour_type === filters.tourType : true))
    .filter((p) =>
      filters.groupSubtype ? p.group_subtype === filters.groupSubtype : true,
    )
    .filter((p) => (filters.featured ? p.is_featured : true))
    .map(genToListItem);
}

function localDetail(slug: string): PackageDetail | null {
  const g = generated.find((p) => p.slug === slug);
  if (!g) return null;
  const now = new Date().toISOString();
  return {
    id: g.slug,
    title: g.package_title,
    slug: g.slug,
    category_id: null,
    destination_id: null,
    scope: g.scope,
    tour_type: g.tour_type,
    group_subtype: g.group_subtype,
    duration_days: g.duration_days,
    duration_nights: g.duration_nights,
    overview: g.overview,
    highlights: g.highlights,
    accommodation: null,
    meals_info: null,
    transport_info: null,
    inclusions: g.inclusions,
    exclusions: g.exclusions,
    price_amount: g.price_amount,
    price_currency: g.price_currency,
    taxes_info: g.taxes_info,
    pickup_location: null,
    drop_location: null,
    documents_required: null,
    visa_info: null,
    cancellation_policy: null,
    terms: null,
    hero_image_url: packageImage(g.slug, g.hero_image_url),
    is_featured: g.is_featured,
    source_pdf: g.source_pdf,
    source_pages: g.source_pages,
    review_status: "verified",
    status: "published",
    is_active: true,
    sort_order: 0,
    created_at: now,
    updated_at: now,
    category_name: g.category_name,
    destination_name: g.destination_name,
    itinerary: g.itinerary,
  };
}

/**
 * Typed fetch client for the Express API with fallback for static hosting.
 */
async function parse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(`Non-JSON response received: ${contentType || "HTML"}`);
  }
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    throw new Error("Failed to parse JSON response");
  }
  if (!res.ok || body === null || body === undefined) {
    const err = (body as { error?: string })?.error;
    throw new Error(err || `Request failed (${res.status})`);
  }
  return body as T;
}

function qs(
  params: Record<string, string | number | boolean | undefined>,
): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "",
  );
  if (entries.length === 0) return "";
  return (
    "?" +
    new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
  );
}

export type PackageListQuery = {
  scope?: "domestic" | "international";
  tourType?: "group" | "customized";
  groupSubtype?: "standard" | "kitchen_staff";
  featured?: boolean;
};

export type ListPackagesResult = {
  items: PackageListItem[];
  sample: boolean;
};

export const api = {
  // ── Auth ───────────────────────────────────────────────────────────────
  async login(email: string, password: string): Promise<{ ok: boolean }> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return parse(res);
  },
  async logout(): Promise<{ ok: boolean }> {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    return parse(res);
  },
  async me(): Promise<{ ok: boolean; email?: string }> {
    const res = await fetch("/api/auth/me");
    return parse(res);
  },

  // ── Public packages ────────────────────────────────────────────────────
  async listPackages(
    filters: PackageListQuery = {},
  ): Promise<ListPackagesResult> {
    try {
      const res = await fetch(
        `/api/packages${qs({
          scope: filters.scope,
          tourType: filters.tourType,
          groupSubtype: filters.groupSubtype,
          featured: filters.featured,
        })}`,
      );
      return await parse<ListPackagesResult>(res);
    } catch {
      return {
        items: localList(filters),
        sample: false,
      };
    }
  },
  async getPackage(slug: string): Promise<PackageDetail> {
    try {
      const res = await fetch(`/api/packages/${encodeURIComponent(slug)}`);
      return await parse<PackageDetail>(res);
    } catch {
      const local = localDetail(slug);
      if (local) return local;
      throw new Error(`Package not found: ${slug}`);
    }
  },

  // ── Public content ─────────────────────────────────────────────────────
  async listPublicServices(): Promise<unknown[]> {
    try {
      const res = await fetch("/api/public/services");
      return await parse(res);
    } catch {
      return [];
    }
  },
  async listPublicFaqs(): Promise<PublicFaq[]> {
    try {
      const res = await fetch("/api/public/faqs");
      return await parse(res);
    } catch {
      return [];
    }
  },
  async listPublicTestimonials(): Promise<PublicTestimonial[]> {
    try {
      const res = await fetch("/api/public/testimonials");
      return await parse(res);
    } catch {
      return [];
    }
  },
  async listPublicGallery(): Promise<PublicGalleryItem[]> {
    try {
      const res = await fetch("/api/public/gallery");
      return await parse(res);
    } catch {
      return [];
    }
  },
  async listPublicOffices(): Promise<PublicOffice[]> {
    try {
      const res = await fetch("/api/public/offices");
      return await parse(res);
    } catch {
      return siteConfig.offices.map((o, idx) => ({
        id: `fallback-${idx}`,
        office_name: o.name,
        address: o.address,
        city: null,
        pincode: null,
        phone: siteConfig.phone,
        email: siteConfig.email,
        hours: "Mon – Sat: 9:30 AM – 6:30 PM",
        is_active: true,
        sort_order: idx,
      }));
    }
  },
  async getPublicSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch("/api/public/settings");
      return await parse(res);
    } catch {
      return {
        site: {
          phone: siteConfig.phone,
          email: siteConfig.email,
          whatsapp: siteConfig.whatsapp,
          tagline: siteConfig.tagline,
          founded: siteConfig.founded,
          social: siteConfig.social,
        },
        about: {},
        seo: {},
      };
    }
  },
  async saveSettings(
    key: string,
    value: Record<string, unknown>,
  ): Promise<{ ok: boolean }> {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return parse(res);
  },

  // ── Enquiry (public) ───────────────────────────────────────────────────
  async submitEnquiry(body: Record<string, unknown>): Promise<{
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  }> {
    let res: Response;
    try {
      res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      return {
        ok: false,
        error:
          "We couldn't reach the server right now. Please try again shortly.",
      };
    }
    return parse<{
      ok: boolean;
      error?: string;
      fieldErrors?: Record<string, string>;
    }>(res).catch(() => ({ ok: false }));
  },

  // ── Admin: dashboard ───────────────────────────────────────────────────
  async dashboard(): Promise<{
    enquiries: {
      total: number;
      new: number;
      contacted: number;
      closed: number;
    };
    packages: { total: number; published: number; featured: number };
  }> {
    const res = await fetch("/api/admin/dashboard");
    return parse(res);
  },

  // ── Admin: packages ────────────────────────────────────────────────────
  async adminPackages(): Promise<{ items: unknown[] }> {
    const res = await fetch("/api/admin/packages");
    return parse(res);
  },
  async adminPackage(id: string): Promise<unknown> {
    const res = await fetch(`/api/admin/packages/${encodeURIComponent(id)}`);
    return parse(res);
  },
  async savePackage(
    id: string | null,
    data: Record<string, unknown>,
  ): Promise<{
    ok: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
    slug?: string;
  }> {
    const res = await fetch("/api/admin/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data }),
    });
    return parse(res);
  },
  async togglePackageActive(
    id: string,
    active: boolean,
  ): Promise<{ ok: boolean }> {
    const res = await fetch(
      `/api/admin/packages/${encodeURIComponent(id)}/active`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      },
    );
    return parse(res);
  },
  async togglePackageFeatured(
    id: string,
    featured: boolean,
  ): Promise<{ ok: boolean }> {
    const res = await fetch(
      `/api/admin/packages/${encodeURIComponent(id)}/featured`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured }),
      },
    );
    return parse(res);
  },
  async deletePackage(id: string): Promise<{ ok: boolean }> {
    const res = await fetch(`/api/admin/packages/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return parse(res);
  },

  // ── Admin: enquiries ───────────────────────────────────────────────────
  async adminEnquiries(status?: string): Promise<{ items: unknown[] }> {
    const res = await fetch(`/api/admin/enquiries${qs({ status })}`);
    return parse(res);
  },
  async setEnquiryStatus(id: string, status: string): Promise<{ ok: boolean }> {
    const res = await fetch(
      `/api/admin/enquiries/${encodeURIComponent(id)}/status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
    );
    return parse(res);
  },

  // ── Admin: generic content modules (keyed by DB table name) ───────────
  async listModule(module: string): Promise<{ items: unknown[] }> {
    const res = await fetch(`/api/admin/${encodeURIComponent(module)}`);
    return parse(res);
  },
  async saveModule(
    module: string,
    body: Record<string, unknown>,
  ): Promise<{ ok: boolean; error?: string }> {
    const res = await fetch(`/api/admin/${encodeURIComponent(module)}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return parse(res);
  },
  async toggleModule(
    module: string,
    id: string,
    active: boolean,
  ): Promise<{ ok: boolean }> {
    const res = await fetch(`/api/admin/${encodeURIComponent(module)}/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    return parse(res);
  },
  async deleteModule(module: string, id: string): Promise<{ ok: boolean }> {
    const res = await fetch(
      `/api/admin/${encodeURIComponent(module)}/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
      },
    );
    return parse(res);
  },

  // ── Upload ─────────────────────────────────────────────────────────────
  async upload(
    formData: FormData,
  ): Promise<{ ok: boolean; url?: string; error?: string }> {
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    return parse(res);
  },
};
