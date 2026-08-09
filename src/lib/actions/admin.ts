"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  packageInputSchema,
  type PackageInput,
} from "@/lib/schemas/package";

/** Guard: every admin mutation re-checks the signed session server-side. */
async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const email = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  return Boolean(email);
}

export async function setEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "closed",
): Promise<{ ok: boolean }> {
  if (!(await requireAdmin())) return { ok: false };
  if (!["new", "contacted", "closed"].includes(status)) return { ok: false };
  const rows = await query(
    `update enquiries set status = $1 where id = $2 returning id`,
    [status, id],
  );
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { ok: Boolean(rows && rows.length > 0) };
}

export async function togglePackageActive(
  id: string,
  active: boolean,
): Promise<{ ok: boolean }> {
  if (!(await requireAdmin())) return { ok: false };
  const rows = await query(
    `update tour_packages set is_active = $1, updated_at = now() where id = $2 returning id`,
    [active, id],
  );
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  return { ok: Boolean(rows && rows.length > 0) };
}

export async function togglePackageFeatured(
  id: string,
  featured: boolean,
): Promise<{ ok: boolean }> {
  if (!(await requireAdmin())) return { ok: false };
  const rows = await query(
    `update tour_packages set is_featured = $1, updated_at = now() where id = $2 returning id`,
    [featured, id],
  );
  revalidatePath("/admin/packages");
  revalidatePath("/");
  revalidatePath("/packages");
  return { ok: Boolean(rows && rows.length > 0) };
}

export type SaveResult =
  | { ok: true; slug: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function revalidatePublic(slug: string) {
  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath(`/packages/${slug}`);
  revalidatePath("/admin/packages");
}

/** Create or update a package. If `id` is provided, updates; otherwise inserts. */
export async function savePackage(
  id: string | null,
  raw: PackageInput,
): Promise<SaveResult> {
  if (!(await requireAdmin())) return { ok: false, error: "Not authorised." };

  const parsed = packageInputSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = issue.path[0];
      if (typeof k === "string" && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }
  const v = parsed.data;

  // Uniqueness check on slug (excluding self).
  const clash = await query<{ id: string }>(
    `select id from tour_packages where slug = $1 and ($2::uuid is null or id <> $2)`,
    [v.slug, id],
  );
  if (clash && clash.length > 0) {
    return { ok: false, error: "That slug is already in use.", fieldErrors: { slug: "Already in use" } };
  }

  const params = [
    v.title,
    v.slug,
    v.scope,
    v.tour_type,
    v.category_name || null,
    v.destination_name || null,
    v.country || null,
    v.duration_days ?? null,
    v.duration_nights ?? null,
    v.overview || null,
    JSON.stringify(v.highlights),
    JSON.stringify(v.inclusions),
    JSON.stringify(v.exclusions),
    v.price_amount ?? null,
    v.taxes_info || null,
    v.hero_image_url || null,
    v.is_featured,
    v.is_active,
    v.status,
  ];

  if (id) {
    const rows = await query(
      `update tour_packages set
         title=$1, slug=$2, scope=$3, tour_type=$4, category_name=$5,
         destination_name=$6, country=$7, duration_days=$8, duration_nights=$9,
         overview=$10, highlights=$11::jsonb, inclusions=$12::jsonb,
         exclusions=$13::jsonb, price_amount=$14, taxes_info=$15,
         hero_image_url=$16, is_featured=$17, is_active=$18, status=$19,
         updated_at=now()
       where id=$20 returning id`,
      [...params, id],
    );
    if (!rows || rows.length === 0) return { ok: false, error: "Package not found." };
  } else {
    const rows = await query(
      `insert into tour_packages
        (title, slug, scope, tour_type, category_name, destination_name, country,
         duration_days, duration_nights, overview, highlights, inclusions, exclusions,
         price_amount, taxes_info, hero_image_url, is_featured, is_active, status,
         review_status, sort_order)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12::jsonb,$13::jsonb,
         $14,$15,$16,$17,$18,$19,'verified',
         (select coalesce(max(sort_order),0)+10 from tour_packages))
       returning id`,
      params,
    );
    if (!rows || rows.length === 0) return { ok: false, error: "Could not create package." };
  }

  revalidatePublic(v.slug);
  return { ok: true, slug: v.slug };
}

export async function deletePackage(id: string): Promise<void> {
  if (!(await requireAdmin())) return;
  await query(`delete from tour_packages where id = $1`, [id]);
  revalidatePath("/admin/packages");
  revalidatePath("/");
  revalidatePath("/packages");
  redirect("/admin/packages");
}
