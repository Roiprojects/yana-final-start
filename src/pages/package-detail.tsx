
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PackageDetailView } from "@/components/tours/package-detail-view";
import { api } from "@/lib/api/client";
import type { PackageDetail } from "@/lib/types/tour";

export function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<PackageDetail | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    api
      .getPackage(slug)
      .then((res) => {
        if (cancelled) return;
        setPkg(res);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="px-4 pt-24">
        <p className="text-center text-sm text-text-secondary">
          Loading package…
        </p>
      </div>
    );
  }

  if (notFound || !pkg) {
    return (
      <div className="px-4 pt-24">
        <div className="mx-auto max-w-md rounded-2xl border border-border-soft bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold">Package not found</h1>
          <p className="mt-2 text-sm text-text-secondary">
            The package you&apos;re looking for doesn&apos;t exist or isn&apos;t
            published yet.
          </p>
          <Link
            to="/packages"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Browse all packages
          </Link>
        </div>
      </div>
    );
  }

  return <PackageDetailView pkg={pkg} />;
}
