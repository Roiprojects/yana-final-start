"use client";

import { type AdminTestimonialRow } from "@/lib/data/admin";
import { saveTestimonialAction } from "@/lib/actions/admin-actions";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  { name: "customer_name", label: "Customer Name", type: "text", placeholder: "e.g. Rajesh Kumar" },
  { name: "location", label: "City / Location", type: "text", placeholder: "e.g. Bengaluru" },
  { name: "rating", label: "Star Rating (1-5)", type: "number", defaultValue: 5 },
  { name: "review", label: "Customer Review / Feedback", type: "textarea", placeholder: "Write customer review..." },
  { name: "photo_url", label: "Customer Photo", type: "image" },
];

export function TestimonialsClient({ initialItems }: { initialItems: AdminTestimonialRow[] }) {
  return (
    <CrudManager<AdminTestimonialRow>
      title="Testimonials"
      description="Manage customer reviews and ratings displayed on the website."
      tableName="testimonials"
      items={initialItems}
      onSaveAction={saveTestimonialAction}
      fields={fields}
      columns={[
        {
          key: "customer_name",
          label: "Customer",
          render: (item) => (
            <div>
              <div className="font-bold text-slate-900">{item.customer_name}</div>
              <div className="text-xs text-slate-500">{item.location || "Verified Traveler"}</div>
            </div>
          ),
        },
        { key: "rating", label: "Rating", render: (item) => `${"⭐".repeat(item.rating || 5)} (${item.rating}/5)` },
        { key: "review", label: "Review", render: (item) => <span className="line-clamp-2 max-w-md">{item.review}</span> },
      ]}
    />
  );
}
