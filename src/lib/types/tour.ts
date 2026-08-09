import type { Database } from "@/lib/supabase/types";

type PackageRow = Database["public"]["Tables"]["tour_packages"]["Row"];

export type ItineraryDay = {
  day_number: number;
  title: string | null;
  description: string | null;
  meals: string | null;
  stay: string | null;
};

/** Fields needed to render a package card in listings. */
export type PackageListItem = Pick<
  PackageRow,
  | "id"
  | "title"
  | "slug"
  | "scope"
  | "tour_type"
  | "duration_days"
  | "duration_nights"
  | "price_amount"
  | "price_currency"
  | "hero_image_url"
  | "overview"
> & {
  category_name?: string | null;
  destination_name?: string | null;
};

/** Full package for the detail page. */
export type PackageDetail = PackageRow & {
  itinerary: ItineraryDay[];
  category_name?: string | null;
  destination_name?: string | null;
};
