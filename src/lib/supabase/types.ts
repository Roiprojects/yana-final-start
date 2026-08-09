/**
 * Hand-written database types — a minimal stand-in covering only the tables the app
 * currently queries. Replace with generated types once the Supabase project exists:
 *   supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
 * (Requires real credentials — see docs/CLIENT_CONFIRMATION_REQUIRED.md.)
 */

export type TourScope = "domestic" | "international";
export type TourType = "group" | "customized";
export type GroupSubtype = "standard" | "kitchen_staff";
export type ContentStatus = "draft" | "published";
export type ReviewStatus = "pending" | "in_review" | "verified";
export type EnquiryType = "general" | "customized";
export type EnquiryStatus = "new" | "contacted" | "closed";

type EnquiriesRow = {
  id: string;
  type: EnquiryType;
  name: string;
  phone: string;
  email: string | null;
  destination_interest: string | null;
  package_id: string | null;
  travellers: number | null;
  travel_date: string | null;
  budget_range: string | null;
  hotel_category: string | null;
  scope: TourScope | null;
  message: string | null;
  status: EnquiryStatus;
  source: string | null;
  created_at: string;
};

type TourPackagesRow = {
  id: string;
  title: string;
  slug: string;
  category_id: string | null;
  destination_id: string | null;
  scope: TourScope;
  tour_type: TourType;
  group_subtype: GroupSubtype | null;
  duration_days: number | null;
  duration_nights: number | null;
  overview: string | null;
  highlights: string[] | null;
  accommodation: string | null;
  meals_info: string | null;
  transport_info: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  price_amount: number | null;
  price_currency: string;
  taxes_info: string | null;
  pickup_location: string | null;
  drop_location: string | null;
  documents_required: string[] | null;
  visa_info: string | null;
  cancellation_policy: string | null;
  terms: string | null;
  hero_image_url: string | null;
  is_featured: boolean;
  source_pdf: string | null;
  source_pages: string | null;
  review_status: ReviewStatus;
  status: ContentStatus;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Database = {
  __InternalSupabase: { PostgrestVersion: "12" };
  public: {
    Tables: {
      enquiries: {
        Row: EnquiriesRow;
        Insert: {
          id?: string;
          type: EnquiryType;
          name: string;
          phone: string;
          email?: string | null;
          destination_interest?: string | null;
          package_id?: string | null;
          travellers?: number | null;
          travel_date?: string | null;
          budget_range?: string | null;
          hotel_category?: string | null;
          scope?: TourScope | null;
          message?: string | null;
          status?: EnquiryStatus;
          source?: string | null;
          created_at?: string;
        };
        Update: Partial<EnquiriesRow>;
        Relationships: [];
      };
      tour_packages: {
        Row: TourPackagesRow;
        Insert: Partial<TourPackagesRow> & {
          title: string;
          slug: string;
          scope: TourScope;
          tour_type: TourType;
        };
        Update: Partial<TourPackagesRow>;
        Relationships: [];
      };
      package_itinerary: {
        Row: {
          id: string;
          package_id: string;
          day_number: number;
          title: string | null;
          description: string | null;
          meals: string | null;
          stay: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          package_id: string;
          day_number: number;
          title?: string | null;
          description?: string | null;
          meals?: string | null;
          stay?: string | null;
          sort_order?: number;
        };
        Update: Partial<{
          package_id: string;
          day_number: number;
          title: string | null;
          description: string | null;
          meals: string | null;
          stay: string | null;
          sort_order: number;
        }>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      tour_scope: TourScope;
      tour_type: TourType;
      group_subtype: GroupSubtype;
      content_status: ContentStatus;
      review_status: ReviewStatus;
      enquiry_type: EnquiryType;
      enquiry_status: EnquiryStatus;
    };
  };
};
