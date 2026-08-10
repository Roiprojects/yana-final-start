import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PackageForm } from "@/components/admin/package-form";

export function NewPackagePage() {
  return (
    <div className="space-y-6">
      <Link
        to="/admin/packages"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to packages
      </Link>
      <h1 className="text-2xl font-extrabold">New package</h1>
      <PackageForm pkg={null} />
    </div>
  );
}
