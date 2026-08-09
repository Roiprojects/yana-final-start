import type { Metadata } from "next";
import { listAdminGallery } from "@/lib/data/admin";
import { GalleryClient } from "@/components/admin/gallery-client";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await listAdminGallery();
  return <GalleryClient initialItems={items} />;
}
