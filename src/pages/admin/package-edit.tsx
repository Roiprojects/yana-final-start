
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api/client";
import { PackageForm } from "@/components/admin/package-form";
import { DeletePackageButton } from "@/components/admin/delete-package-button";
import type { EditablePackage } from "@/lib/types/admin";

export function EditPackagePage() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<EditablePackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    api
      .adminPackage(id)
      .then((res) => {
        if (!cancelled) setPkg(res as EditablePackage);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError((e as Error).message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="space-y-6">
      <Link
        to="/admin/packages"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to packages
      </Link>

      {error ? (
        <p className="text-sm text-danger">Couldn't load package: {error}</p>
      ) : loading ? (
        <p className="text-sm text-text-secondary">Loading package…</p>
      ) : pkg ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-extrabold">Edit: {pkg.title}</h1>
            <DeletePackageButton id={pkg.id} title={pkg.title} />
          </div>
          <PackageForm pkg={pkg} />
        </>
      ) : (
        <p className="text-sm text-danger">Package not found.</p>
      )}
    </div>
  );
}
