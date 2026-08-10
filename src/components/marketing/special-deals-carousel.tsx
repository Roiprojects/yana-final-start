import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { unsplash } from "@/lib/images";
import type { PackageListItem } from "@/lib/types/tour";

interface SpecialDealsProps {
  items: PackageListItem[];
}

function formatPrice(amount: number | null, currency: string | null) {
  if (!amount) {
    return "Plan on enquiry";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency || "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SpecialDealsSection({ items }: SpecialDealsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const displayItems =
    items.length > 0
      ? items
      : [
          {
            id: "1",
            slug: "best-of-europe-12n13d",
            title: "Best of Europe",
            scope: "INTERNATIONAL",
            destination_name: "Europe",
            hero_image_url: unsplash("photo-1501785888041-af3ef285b470", 1280),
            duration_days: 13,
            duration_nights: 12,
            price_amount: 220000,
            price_currency: "INR",
            overview: null,
            tour_type: null,
          },
          {
            id: "2",
            slug: "beautiful-bali",
            title: "Beautiful Bali",
            scope: "INTERNATIONAL",
            destination_name: "Bali",
            hero_image_url: unsplash("photo-1537996194471-e657df975ab4", 1280),
            duration_days: 7,
            duration_nights: 6,
            price_amount: 50000,
            price_currency: "INR",
            overview: null,
            tour_type: null,
          },
          {
            id: "3",
            slug: "singapore-malaysia",
            title: "Singapore & Malaysia",
            scope: "INTERNATIONAL",
            destination_name: "Singapore & Malaysia",
            hero_image_url: unsplash("photo-1492571350019-22de08371fd3", 1280),
            duration_days: 7,
            duration_nights: 6,
            price_amount: 78000,
            price_currency: "INR",
            overview: null,
            tour_type: null,
          },
          {
            id: "4",
            slug: "chardham-helicopter-5n6d",
            title: "Chardham Yatra by Helicopter",
            scope: "DOMESTIC",
            destination_name: "Uttarakhand",
            hero_image_url: unsplash("photo-1470071459604-3b5ec3a7fe05", 1280),
            duration_days: 6,
            duration_nights: 5,
            price_amount: null,
            price_currency: "INR",
            overview: null,
            tour_type: null,
          },
        ];

  return (
    <div className="my-8 w-full">
      <div className="mb-6 overflow-hidden rounded-[2rem] border border-[#e7dcc6] bg-[linear-gradient(135deg,#fffdf8,#f7f1e4)] p-6 shadow-[0_28px_60px_-36px_rgba(16,33,58,0.28)] sm:p-8">
        <p className="eyebrow text-[#ad7f19]">Signature departures</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-deep sm:text-3xl lg:text-4xl">
              Brightly presented journeys that feel premium before the enquiry
              even starts.
            </h2>
            <p className="mt-3 text-sm leading-6 text-text-secondary sm:text-base">
              A cleaner luxury layout inspired by leading travel brands: large
              imagery, stronger hierarchy, and card styling that feels curated
              instead of crowded.
            </p>
          </div>
          <div className="hidden rounded-full border border-[#eadfcf] bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm sm:block">
            Handpicked packages
          </div>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#eadfcf] bg-white text-primary shadow-[0_18px_36px_-24px_rgba(16,33,58,0.34)] transition-all duration-200 hover:scale-110 hover:bg-[#faf6ed] active:scale-95 sm:-left-5"
        >
          <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
        </button>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#eadfcf] bg-white text-primary shadow-[0_18px_36px_-24px_rgba(16,33,58,0.34)] transition-all duration-200 hover:scale-110 hover:bg-[#faf6ed] active:scale-95 sm:-right-5"
        >
          <ChevronRight className="h-6 w-6 stroke-[2.5]" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto px-1 pb-4 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((pkg) => {
            const imageSrc =
              pkg.hero_image_url ||
              unsplash("photo-1469474968028-56623f02e42e", 1280);
            const destination =
              pkg.destination_name || pkg.scope || "Curated journey";

            return (
              <div
                key={pkg.id}
                className="flex w-[290px] flex-none flex-col overflow-hidden rounded-[1.7rem] border border-[#e8decb] bg-white shadow-[0_24px_50px_-34px_rgba(16,33,58,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_32px_66px_-30px_rgba(16,33,58,0.38)] sm:w-[330px]"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#f2efe8]">
                  <img
                    src={imageSrc}
                    alt={pkg.title}
                    className="absolute inset-0 h-full w-full object-cover brightness-[1.05] transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm backdrop-blur-sm">
                    {destination}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#ad7f19]">
                    <span>
                      {pkg.duration_nights && pkg.duration_days
                        ? `${pkg.duration_nights}N / ${pkg.duration_days}D`
                        : "Tailor-made"}
                    </span>
                    <span>{pkg.scope || "Premium itinerary"}</span>
                  </div>
                  <h3 className="mt-3 font-heading text-xl font-extrabold leading-tight tracking-[-0.03em] text-deep">
                    {pkg.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {pkg.overview ||
                      "Refined trip planning with a brighter, more premium presentation and a clearer path to enquiry."}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#efe5d3] pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                        Starting from
                      </p>
                      <p className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-primary">
                        {formatPrice(pkg.price_amount, pkg.price_currency)}
                      </p>
                    </div>
                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(23,63,107,0.8)] transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
