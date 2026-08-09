import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PackageForm } from "@/components/admin/package-form";

export const metadata: Metadata = { title: "New Package" };

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/packages"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to packages
      </Link>
      <h1 className="text-2xl font-extrabold">New package</h1>
      <PackageForm pkg={null} />
    </div>
  );
}
