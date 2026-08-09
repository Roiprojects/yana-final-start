import type { Metadata } from "next";
import { listAdminHeroSlides } from "@/lib/data/admin";
import { HeroClient } from "@/components/admin/hero-client";

export const metadata: Metadata = { title: "Hero Banners" };
export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  const items = await listAdminHeroSlides();
  return <HeroClient initialItems={items} />;
}
