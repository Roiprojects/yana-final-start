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
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] border border-[#eadfcf] bg-bg-soft shadow-[0_16px_40px_-24px_rgba(16,33,58,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_68px_-26px_rgba(16,33,58,0.42)]"
    >
      <img
        src={img}
        alt={pkg.title}
        className="absolute inset-0 h-full w-full object-cover brightness-[1.05] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />

      {/* Resting state — the full image with a subtle title */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 sm:p-5 pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8c979]">
          {pkg.scope}
          {pkg.destination_name ? ` · ${pkg.destination_name}` : ""}
        </p>
        <h3 className="mt-1 font-heading text-base sm:text-lg font-bold leading-snug text-white">
          {pkg.title}
        </h3>
      </div>

      {/* Hover state — full details overlay + Explore */}
      <div className="absolute inset-0 flex translate-y-5 flex-col justify-end bg-[linear-gradient(180deg,rgba(16,33,58,0.6),rgba(52,87,202,0.95))] p-4 sm:p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e8c979]">
          {pkg.scope}
          {pkg.destination_name ? ` · ${pkg.destination_name}` : ""}
        </p>
        <h3 className="mt-1 font-heading text-base sm:text-lg font-bold leading-snug text-white">
          {pkg.title}
        </h3>
        {dur ? (
          <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white/90">
            <Clock className="h-3 w-3" aria-hidden />
            {dur}
          </span>
        ) : null}
        <p className="mt-1.5 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm leading-relaxed text-white/85">
          {pkg.overview ||
            "A richer, better-presented journey curated for comfort, clarity, and attraction."}
        </p>

        <div className="mt-3 sm:mt-4 flex items-center justify-between gap-2 border-t border-white/20 pt-3">
          <span className="text-white">
            {price ? (
              <>
                <span className="block text-[10px] font-medium uppercase tracking-wide text-white/60">
                  From
                </span>
                <span className="font-heading text-base sm:text-lg font-extrabold tracking-tight text-[#e8c979]">
                  {price}
                </span>
                <span className="text-[11px] font-medium text-white/60">
                  {" "}
                  / person
                </span>
              </>
            ) : (
              <span className="text-xs sm:text-sm font-semibold text-white/80">
                Enquire for price
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#3457ca] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white shadow-[0_10px_22px_-8px_rgba(52,87,202,0.55)] transition-transform group-hover:scale-105">
            Explore
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
