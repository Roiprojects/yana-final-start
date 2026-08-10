
import { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { EnquireNowButton } from "@/components/ui/enquire-now-button";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { api } from "@/lib/api/client";
import type { PackageListQuery } from "@/lib/api/client";
import type { PackageListItem } from "@/lib/types/tour";

/**
 * Client component: fetches packages for the given filters and renders the grid,
 * or an honest empty state when none are published.
 */
export function FilteredPackages({
  filters,
  emptyTitle = "Packages coming soon",
  emptyDescription = "Verified tour packages will appear here once they are published from the admin panel.",
}: {
  filters: PackageListQuery;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const [items, setItems] = useState<PackageListItem[]>([]);
  const [sample, setSample] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .listPackages(filters)
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setSample(res.sample);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [filters]);

  if (loading) {
    return (
      <Section>
        <p className="text-center text-sm text-text-secondary">
          Loading packages…
        </p>
      </Section>
    );
  }

  return (
    <Section>
      {sample && <SampleDataBanner />}
      {items.length > 0 ? (
        <PackageGrid items={items} />
      ) : (
        <EmptyState
          icon={Compass}
          title={emptyTitle}
          description={emptyDescription}
          action={<EnquireNowButton />}
        />
      )}
    </Section>
  );
}
