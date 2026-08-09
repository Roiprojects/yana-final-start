import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Layers3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { EnquireNowButton } from "@/components/ui/enquire-now-button";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { listPackages, type PackageFilters } from "@/lib/data/packages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tour Packages",
  description:
    "Browse Yana Travels tour packages — filter by domestic or international, group or customized, category, and duration.",
};

type SearchParams = { scope?: string; type?: string };

const scopeOptions = [
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
] as const;
const typeOptions = [
  { value: "group", label: "Group" },
  { value: "customized", label: "Customized" },
] as const;

function buildHref(current: SearchParams, key: "scope" | "type", value: string) {
  const next = { ...current };
  if (next[key] === value) delete next[key];
  else next[key] = value;
  const qs = new URLSearchParams(next as Record<string, string>).toString();
  return qs ? `/packages?${qs}` : "/packages";
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const filters: PackageFilters = {};
  if (sp.scope === "domestic" || sp.scope === "international") filters.scope = sp.scope;
  if (sp.type === "group" || sp.type === "customized") filters.tourType = sp.type;

  const { items, sample } = await listPackages(filters);
  const hasFilter = Boolean(filters.scope || filters.tourType);

  return (
    <>
      <PageHeader
        title="Tour Packages"
        subtitle="Find a journey that fits, now presented with a cleaner, richer, more premium browsing experience."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
        image="photo-1501785888041-af3ef285b470"
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[290px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-[1.8rem] border border-[#eadfcf] bg-[linear-gradient(135deg,#fffefb,#f7f1e4)] p-6 shadow-[0_22px_48px_-34px_rgba(16,33,58,0.24)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_26px_-16px_rgba(23,63,107,0.8)]">
                  <Layers3 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ad7f19]">Filters</p>
                  <p className="text-sm text-text-secondary">Narrow the collection by travel style.</p>
                </div>
              </div>
              {hasFilter ? (
                <div className="mb-5">
                  <Link href="/packages" className="text-sm font-semibold text-primary hover:underline">
                    Clear all filters
                  </Link>
                </div>
              ) : null}

              <FilterGroup
                label="Scope"
                options={scopeOptions}
                activeValue={filters.scope}
                current={sp}
                paramKey="scope"
              />
              <FilterGroup
                label="Type"
                options={typeOptions}
                activeValue={filters.tourType}
                current={sp}
                paramKey="type"
              />
            </div>
          </aside>

          <div>
            {sample ? <SampleDataBanner /> : null}
            {items.length > 0 ? (
              <>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-[#eadfcf] bg-white px-5 py-4 shadow-[0_16px_36px_-26px_rgba(16,33,58,0.2)]">
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-deep">{items.length}</span> package{items.length === 1 ? "" : "s"}
                    {hasFilter ? " matched your filters" : " available to explore"}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad7f19]">
                    Curated departures
                  </p>
                </div>
                <PackageGrid items={items} />
              </>
            ) : (
              <EmptyState
                icon={Compass}
                title={hasFilter ? "No packages match these filters" : "No packages published yet"}
                description={
                  hasFilter
                    ? "Try clearing the filters, or send us an enquiry and we'll help directly."
                    : "Verified tour packages will be listed here once they are published from the admin panel."
                }
                action={<EnquireNowButton />}
              />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterGroup({
  label,
  options,
  activeValue,
  current,
  paramKey,
}: {
  label: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  activeValue: string | undefined;
  current: SearchParams;
  paramKey: "scope" | "type";
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-3 text-sm font-semibold text-deep">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = activeValue === opt.value;
          return (
            <Link
              key={opt.value}
              href={buildHref(current, paramKey, opt.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                active
                  ? "border-primary bg-primary text-white shadow-[0_10px_22px_-14px_rgba(23,63,107,0.8)]"
                  : "border-[#eadfcf] bg-white text-text-secondary hover:border-[#dbc498] hover:text-primary",
              )}
            >
              {opt.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
