import type { Metadata } from "next";
import { listAdminTestimonials } from "@/lib/data/admin";
import { TestimonialsClient } from "@/components/admin/testimonials-client";

export const metadata: Metadata = { title: "Testimonials" };
export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const items = await listAdminTestimonials();
  return <TestimonialsClient initialItems={items} />;
}
