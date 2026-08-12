import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Compass, Layers3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { EnquireNowButton } from "@/components/ui/enquire-now-button";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { api } from "@/lib/api/client";
import type { PackageListItem } from "@/lib/types/tour";
import { cn } from "@/lib/utils";

const scopeOptions = [
  { value: "domestic", label: "Domestic" },
  { value: "international", label: "International" },
] as const;
const typeOptions = [
  { value: "group", label: "Group" },
  { value: "customized", label: "Customized" },
] as const;

function buildHref(
  current: URLSearchParams,
  key: "scope" | "type",
  value: string,
) {
  const next = new URLSearchParams(current);
  if (next.get(key) === value) next.delete(key);
  else next.set(key, value);
  const qs = next.toString();
  return qs ? `/packages?${qs}` : "/packages";
}

export function PackagesPage() {
  const [searchParams] = useSearchParams();
  const scope = searchParams.get("scope") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const q = searchParams.get("q") ?? "";

  const [items, setItems] = useState<PackageListItem[]>([]);
  const [sample, setSample] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasFilter = Boolean(scope || type || q);
  const query = q.trim().toLowerCase();
  const filtered = query
    ? items.filter((p) =>
        [p.title, p.scope, p.destination_name, p.overview]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : items;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .listPackages({
        scope:
          scope === "domestic" || scope === "international" ? scope : undefined,
        tourType: type === "group" || type === "customized" ? type : undefined,
      })
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
  }, [scope, type]);

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
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_26px_-16px_rgba(52,87,202,0.8)]">
                  <Layers3 className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ad7f19]">
                    Filters
                  </p>
                  <p className="text-sm text-text-secondary">
                    Narrow the collection by travel style.
                  </p>
                </div>
              </div>
              {hasFilter ? (
                <div className="mb-5">
                  <Link
                    to="/packages"
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Clear all filters
                  </Link>
                </div>
              ) : null}

              <FilterGroup
                label="Scope"
                options={scopeOptions}
                activeValue={scope}
                current={searchParams}
                paramKey="scope"
              />
              <FilterGroup
                label="Type"
                options={typeOptions}
                activeValue={type}
                current={searchParams}
                paramKey="type"
              />
            </div>
          </aside>

          <div>
            {loading ? (
              <p className="text-center text-sm text-text-secondary">
                Loading packages…
              </p>
            ) : (
              <>
                {sample ? <SampleDataBanner /> : null}
                {filtered.length > 0 ? (
                  <>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-[#eadfcf] bg-white px-5 py-4 shadow-[0_16px_36px_-26px_rgba(16,33,58,0.2)]">
                      <p className="text-sm text-text-secondary">
                        <span className="font-semibold text-deep">
                          {filtered.length}
                        </span>{" "}
                        package{filtered.length === 1 ? "" : "s"}
                        {query ? (
                          <>
                            {" "}
                            for &ldquo;
                            <span className="font-semibold text-deep">{q}</span>
                            &rdquo;
                          </>
                        ) : hasFilter ? (
                          " matched your filters"
                        ) : (
                          " available to explore"
                        )}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad7f19]">
                        Curated departures
                      </p>
                    </div>
                    <PackageGrid items={filtered} />
                  </>
                ) : (
                  <EmptyState
                    icon={Compass}
                    title={
                      hasFilter
                        ? "No packages match your search"
                        : "No packages published yet"
                    }
                    description={
                      hasFilter
                        ? "Try clearing the filters or search, or send us an enquiry and we'll help directly."
                        : "Verified tour packages will be listed here once they are published from the admin panel."
                    }
                    action={<EnquireNowButton />}
                  />
                )}
              </>
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
  current: URLSearchParams;
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
              to={buildHref(current, paramKey, opt.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                active
                  ? "border-primary bg-primary text-white shadow-[0_10px_22px_-14px_rgba(52,87,202,0.8)]"
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
