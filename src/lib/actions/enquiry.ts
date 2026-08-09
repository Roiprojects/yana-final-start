"use server";

import { query, hasDb } from "@/lib/db";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/schemas/enquiry";

export type EnquiryResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Persists an enquiry to the `enquiries` table in the client's Postgres.
 * Validates server-side with Zod — never trusts the client. Fails gracefully if
 * the DB is unreachable so the user always gets a clear message.
 */
export async function submitEnquiry(
  values: EnquiryFormValues,
): Promise<EnquiryResult> {
  const parsed = enquiryFormSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { ok: false, error: "Please check the highlighted fields.", fieldErrors };
  }

  const v = parsed.data;

  if (!hasDb()) {
    return {
      ok: false,
      error:
        "Enquiry submission isn't available right now. Please reach us by phone or WhatsApp in the meantime.",
    };
  }

  const rows = await query(
    `insert into enquiries
       (type, name, phone, email, destination_interest, travellers, travel_date,
        budget_range, hotel_category, scope, message, source)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     returning id`,
    [
      v.type,
      v.name,
      v.phone,
      v.email || null,
      v.destinationInterest || null,
      v.travellers ?? null,
      v.travelDate || null,
      v.budgetRange || null,
      v.hotelCategory || null,
      v.scope || null,
      v.message || null,
      v.type === "customized" ? "customized_enquiry" : "general_enquiry",
    ],
  );

  if (!rows) {
    return {
      ok: false,
      error:
        "We couldn't submit your enquiry right now. Please call us or try again shortly.",
    };
  }

  return { ok: true };
}
