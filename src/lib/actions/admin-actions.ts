"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Toggle Status / Delete generic ──────────────────────────────────────────
export async function toggleItemActive(table: string, id: string, currentStatus: boolean) {
  const allowed = ["tour_packages", "destinations", "services", "testimonials", "gallery", "faqs", "contact_info", "hero_slides"];
  if (!allowed.includes(table)) throw new Error("Invalid table");
  
  await query(`update ${table} set is_active = $1 where id = $2`, [!currentStatus, id]);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteItem(table: string, id: string) {
  const allowed = ["tour_packages", "destinations", "services", "testimonials", "gallery", "faqs", "contact_info", "hero_slides"];
  if (!allowed.includes(table)) throw new Error("Invalid table");

  await query(`delete from ${table} where id = $1`, [id]);
  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Destination Actions ──────────────────────────────────────────────────────
export async function saveDestinationAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string || slugify(name)).trim();
  const scope = (formData.get("scope") as string) || "international";
  const country = (formData.get("country") as string) || "";
  const description = (formData.get("description") as string) || "";
  const image_url = (formData.get("image_url") as string) || "";
  const is_featured = formData.get("is_featured") === "on";

  if (id) {
    await query(
      `update destinations
          set name=$1, slug=$2, scope=$3, country=$4, description=$5, image_url=$6, is_featured=$7
        where id=$8`,
      [name, slug, scope, country, description, image_url, is_featured, id],
    );
  } else {
    await query(
      `insert into destinations (name, slug, scope, country, description, image_url, is_featured)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [name, slug, scope, country, description, image_url, is_featured],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Service Actions ──────────────────────────────────────────────────────────
export async function saveServiceAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string).trim();
  const slug = (formData.get("slug") as string || slugify(name)).trim();
  const description = (formData.get("description") as string) || "";

  if (id) {
    await query(
      `update services set name=$1, slug=$2, description=$3 where id=$4`,
      [name, slug, description, id],
    );
  } else {
    await query(
      `insert into services (name, slug, description) values ($1, $2, $3)`,
      [name, slug, description],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Testimonial Actions ──────────────────────────────────────────────────────
export async function saveTestimonialAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const customer_name = (formData.get("customer_name") as string).trim();
  const location = (formData.get("location") as string) || "";
  const review = (formData.get("review") as string).trim();
  const rating = Number(formData.get("rating") || 5);
  const photo_url = (formData.get("photo_url") as string) || "";

  if (id) {
    await query(
      `update testimonials
          set customer_name=$1, location=$2, review=$3, rating=$4, photo_url=$5
        where id=$6`,
      [customer_name, location, review, rating, photo_url, id],
    );
  } else {
    await query(
      `insert into testimonials (customer_name, location, review, rating, photo_url)
       values ($1, $2, $3, $4, $5)`,
      [customer_name, location, review, rating, photo_url],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── FAQ Actions ──────────────────────────────────────────────────────────────
export async function saveFaqAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const question = (formData.get("question") as string).trim();
  const answer = (formData.get("answer") as string).trim();
  const category = (formData.get("category") as string) || "General";

  if (id) {
    await query(
      `update faqs set question=$1, answer=$2, category=$3 where id=$4`,
      [question, answer, category, id],
    );
  } else {
    await query(
      `insert into faqs (question, answer, category) values ($1, $2, $3)`,
      [question, answer, category],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Office Actions ───────────────────────────────────────────────────────────
export async function saveOfficeAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const office_name = (formData.get("office_name") as string).trim();
  const address = (formData.get("address") as string) || "";
  const city = (formData.get("city") as string) || "";
  const pincode = (formData.get("pincode") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const email = (formData.get("email") as string) || "";

  if (id) {
    await query(
      `update contact_info
          set office_name=$1, address=$2, city=$3, pincode=$4, phone=$5, email=$6
        where id=$7`,
      [office_name, address, city, pincode, phone, email, id],
    );
  } else {
    await query(
      `insert into contact_info (office_name, address, city, pincode, phone, email)
       values ($1, $2, $3, $4, $5, $6)`,
      [office_name, address, city, pincode, phone, email],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Gallery Actions ──────────────────────────────────────────────────────────
export async function saveGalleryAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const category = (formData.get("category") as string) || "General";
  const image_url = (formData.get("image_url") as string).trim();

  if (id) {
    await query(
      `update gallery set title=$1, category=$2, image_url=$3 where id=$4`,
      [title, category, image_url, id],
    );
  } else {
    await query(
      `insert into gallery (title, category, image_url) values ($1, $2, $3)`,
      [title, category, image_url],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Package Actions ──────────────────────────────────────────────────────────
export async function savePackageAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const slug = (formData.get("slug") as string || slugify(title)).trim();
  const scope = (formData.get("scope") as string) || "international";
  const tour_type = (formData.get("tour_type") as string) || "customized";
  const price_amount = formData.get("price_amount") ? Number(formData.get("price_amount")) : null;
  const duration_days = formData.get("duration_days") ? Number(formData.get("duration_days")) : null;
  const duration_nights = formData.get("duration_nights") ? Number(formData.get("duration_nights")) : null;
  const destination_name = (formData.get("destination_name") as string) || "";
  const overview = (formData.get("overview") as string) || "";
  const hero_image_url = (formData.get("hero_image_url") as string) || "";
  const is_featured = formData.get("is_featured") === "on";
  const is_active = formData.get("is_active") !== "off";

  if (id) {
    await query(
      `update tour_packages
          set title=$1, slug=$2, scope=$3, tour_type=$4, price_amount=$5,
              duration_days=$6, duration_nights=$7, destination_name=$8,
              overview=$9, hero_image_url=$10, is_featured=$11, is_active=$12,
              updated_at=now()
        where id=$13`,
      [
        title, slug, scope, tour_type, price_amount,
        duration_days, duration_nights, destination_name,
        overview, hero_image_url, is_featured, is_active, id,
      ],
    );
  } else {
    await query(
      `insert into tour_packages
        (title, slug, scope, tour_type, price_amount, duration_days, duration_nights,
         destination_name, overview, hero_image_url, is_featured, is_active)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        title, slug, scope, tour_type, price_amount, duration_days, duration_nights,
        destination_name, overview, hero_image_url, is_featured, is_active,
      ],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

// ── Hero Slide Actions ───────────────────────────────────────────────────────
export async function saveHeroSlideAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string).trim();
  const subtitle = (formData.get("subtitle") as string) || "";
  const image_url = (formData.get("image_url") as string).trim();
  const cta_primary_text = (formData.get("cta_primary_text") as string) || "Explore packages";
  const cta_primary_link = (formData.get("cta_primary_link") as string) || "/packages";

  if (id) {
    await query(
      `update hero_slides
          set title=$1, subtitle=$2, image_url=$3, cta_primary_text=$4, cta_primary_link=$5
        where id=$6`,
      [title, subtitle, image_url, cta_primary_text, cta_primary_link, id],
    );
  } else {
    await query(
      `insert into hero_slides (title, subtitle, image_url, cta_primary_text, cta_primary_link)
       values ($1, $2, $3, $4, $5)`,
      [title, subtitle, image_url, cta_primary_text, cta_primary_link],
    );
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

