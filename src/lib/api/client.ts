import type { PackageDetail, PackageListItem } from "@/lib/types/tour";
import type {
  PublicFaq,
  PublicGalleryItem,
  PublicOffice,
  PublicTestimonial,
} from "@/lib/types/content";

/**
 * Typed fetch client for the Express API.
 * Uses relative `/api` URLs: Vite proxies them in dev, and the Express server
 * serves both the SPA and the API on the same origin in production.
 */

async function parse<T>(res: Response): Promise<T> {
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    /* ignore non-JSON responses */
  }
  if (!res.ok) {
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
    const res = await fetch(
      `/api/packages${qs({
        scope: filters.scope,
        tourType: filters.tourType,
        groupSubtype: filters.groupSubtype,
        featured: filters.featured,
      })}`,
    );
    return parse(res);
  },
  async getPackage(slug: string): Promise<PackageDetail> {
    const res = await fetch(`/api/packages/${encodeURIComponent(slug)}`);
    return parse(res);
  },

  // ── Public content ─────────────────────────────────────────────────────
  async listPublicServices(): Promise<unknown[]> {
    const res = await fetch("/api/public/services");
    return parse(res);
  },
  async listPublicFaqs(): Promise<PublicFaq[]> {
    const res = await fetch("/api/public/faqs");
    return parse(res);
  },
  async listPublicTestimonials(): Promise<PublicTestimonial[]> {
    const res = await fetch("/api/public/testimonials");
    return parse(res);
  },
  async listPublicGallery(): Promise<PublicGalleryItem[]> {
    const res = await fetch("/api/public/gallery");
    return parse(res);
  },
  async listPublicOffices(): Promise<PublicOffice[]> {
    const res = await fetch("/api/public/offices");
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
