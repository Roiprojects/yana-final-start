import type { Metadata } from "next";
import { listAdminOffices } from "@/lib/data/admin";
import { ContactClient } from "@/components/admin/contact-client";

export const metadata: Metadata = { title: "Contact Offices" };
export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const items = await listAdminOffices();
  return <ContactClient initialItems={items} />;
}
