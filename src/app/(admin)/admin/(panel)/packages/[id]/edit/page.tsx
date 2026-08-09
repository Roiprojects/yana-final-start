import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getEditablePackage } from "@/lib/data/admin";
import { PackageForm } from "@/components/admin/package-form";
import { DeletePackageButton } from "@/components/admin/delete-package-button";

export const metadata: Metadata = { title: "Edit Package" };
export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await getEditablePackage(id);
  if (!pkg) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to packages
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Edit: {pkg.title}</h1>
        <DeletePackageButton id={pkg.id} title={pkg.title} />
      </div>
      <PackageForm pkg={pkg} />
    </div>
  );
}
