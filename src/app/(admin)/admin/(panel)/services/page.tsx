import type { Metadata } from "next";
import { listAdminServices } from "@/lib/data/admin";
import { ServicesClient } from "@/components/admin/services-client";

export const metadata: Metadata = { title: "Services" };
export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const items = await listAdminServices();
  return <ServicesClient initialItems={items} />;
}
