import { PackageCard } from "@/components/tours/package-card";
import { Reveal } from "@/components/ui/reveal";
import type { PackageListItem } from "@/lib/types/tour";

export function PackageGrid({
  items,
  columns = 4,
}: {
  items: PackageListItem[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={
        columns === 4
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((pkg, i) => (
        <Reveal key={pkg.id} delay={(i % columns) * 80} className="h-full">
          <PackageCard pkg={pkg} />
        </Reveal>
      ))}
    </div>
  );
}

export function SampleDataBanner() {
  return (
    <div className="mb-6 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning">
      <strong>Preview.</strong> Illustrative placeholder packages — real Yana
      Travels packages load from the database once published.
    </div>
  );
}
