import { z } from "zod";

/** Shared enquiry validation — single source of truth for both forms (see CLAUDE.md). */
export const baseEnquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number looks too long"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  // Empty optional number: treat "" as undefined so an empty field stays valid.
  travellers: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().int().min(1, "At least 1 traveller").max(100).optional(),
  ),
  travelDate: z.string().optional(),
  message: z.string().max(2000).optional(),
});

export const generalEnquirySchema = baseEnquirySchema.extend({
  type: z.literal("general").default("general"),
  destinationInterest: z.string().optional(),
});

export const customizedEnquirySchema = baseEnquirySchema.extend({
  type: z.literal("customized").default("customized"),
  scope: z.enum(["domestic", "international"]).optional(),
  budgetRange: z.string().optional(),
  hotelCategory: z.string().optional(),
});

/**
 * Superset schema used for the form's TypeScript typing (a single concrete type,
 * unlike the general/customized union). Both variants share this shape; the
 * variant only decides which fields are rendered and the `type` value submitted.
 */
export const enquiryFormSchema = baseEnquirySchema.extend({
  type: z.enum(["general", "customized"]).default("general"),
  destinationInterest: z.string().optional(),
  scope: z.enum(["domestic", "international"]).optional(),
  budgetRange: z.string().optional(),
  hotelCategory: z.string().optional(),
});

export type GeneralEnquiry = z.infer<typeof generalEnquirySchema>;
export type CustomizedEnquiry = z.infer<typeof customizedEnquirySchema>;
export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>;
