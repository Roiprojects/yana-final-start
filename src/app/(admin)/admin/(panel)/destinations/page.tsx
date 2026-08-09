import type { Metadata } from "next";
import { listAdminDestinations } from "@/lib/data/admin";
import { DestinationsClient } from "@/components/admin/destinations-client";

export const metadata: Metadata = { title: "Destinations" };
export const dynamic = "force-dynamic";

export default async function AdminDestinationsPage() {
  const items = await listAdminDestinations();
  return <DestinationsClient initialItems={items} />;
}
