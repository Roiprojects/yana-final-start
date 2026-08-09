import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPackageBySlug,
  allPackageSlugs,
} from "@/lib/data/packages";
import { PackageDetailView } from "@/components/tours/package-detail-view";

/**
 * Package detail — reads from the client's Postgres (via getPackageBySlug).
 * ISR: revalidate hourly so admin edits appear without a redeploy; unknown slugs 404.
 */
export function generateStaticParams() {
  return allPackageSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Package not found" };
  return {
    title: pkg.title,
    description: pkg.overview ?? undefined,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  return <PackageDetailView pkg={pkg} />;
}
