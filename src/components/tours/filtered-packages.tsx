import { Compass } from "lucide-react";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { EnquireNowButton } from "@/components/ui/enquire-now-button";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { listPackages, type PackageFilters } from "@/lib/data/packages";

/**
 * Server component: fetches packages for the given filters and renders the grid,
 * or an honest empty state when none are published. Sample banner shows in preview mode.
 */
export async function FilteredPackages({
  filters,
  emptyTitle = "Packages coming soon",
  emptyDescription = "Verified tour packages will appear here once they are published from the admin panel.",
}: {
  filters: PackageFilters;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  const { items, sample } = await listPackages(filters);

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
