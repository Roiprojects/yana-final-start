import { Link } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import { unsplash } from "@/lib/images";
import type { PackageListItem } from "@/lib/types/tour";

function formatPrice(amount: number | null, currency: string): string | null {
  if (amount == null) return null;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

function duration(days: number | null, nights: number | null): string | null {
  if (days == null && nights == null) return null;
  if (days != null && nights != null) return `${days}D / ${nights}N`;
  if (days != null) return `${days} days`;
  return `${nights} nights`;
}

export function PackageCard({ pkg }: { pkg: PackageListItem }) {
  const price = formatPrice(pkg.price_amount, pkg.price_currency);
  const dur = duration(pkg.duration_days, pkg.duration_nights);
  const img =
    pkg.hero_image_url ?? unsplash("photo-1469474968028-56623f02e42e", 1280);

  return (
    <Link
      to={`/packages/${pkg.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#eadfcf] bg-white shadow-[0_16px_40px_-24px_rgba(16,33,58,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_68px_-26px_rgba(16,33,58,0.42)]"
    >
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-bg-soft">
        <img
          src={img}
          alt={pkg.title}
          className="absolute inset-0 h-full w-full object-cover brightness-[1.05] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        {dur ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold text-deep shadow-sm backdrop-blur">
            <Clock className="h-3 w-3 text-primary" aria-hidden />
            {dur}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          {pkg.scope}
          {pkg.destination_name ? ` · ${pkg.destination_name}` : ""}
        </p>
        <h3 className="mt-1.5 font-heading text-lg font-bold leading-snug text-deep transition-colors group-hover:text-primary">
          {pkg.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {pkg.overview ||
            "A richer, better-presented journey curated for comfort, clarity, and attraction."}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span className="text-deep">
            {price ? (
              <>
                <span className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  From
                </span>
                <span className="font-heading text-xl font-extrabold tracking-tight text-primary">
                  {price}
                </span>
                <span className="text-xs font-medium text-text-secondary">
                  {" "}
                  / person
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-text-secondary">
                Enquire for price
              </span>
            )}
          </span>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_22px_-8px_rgba(18,96,158,0.7)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2b7fc7]">
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
      </div>
    </Link>
  );
}
