import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { unsplash } from "@/lib/images";
import { PackageCard } from "@/components/tours/package-card";
import type { PackageListItem } from "@/lib/types/tour";

interface SpecialDealsProps {
  items: PackageListItem[];
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

  const displayItems: PackageListItem[] =
    items.length > 0
      ? items
      : [
          {
            id: "1",
            slug: "best-of-europe-12n13d",
            title: "Best of Europe",
            scope: "international",
            destination_name: "Europe",
            hero_image_url: unsplash("photo-1501785888041-af3ef285b470", 1280),
            duration_days: 13,
            duration_nights: 12,
            price_amount: 220000,
            price_currency: "INR",
            overview: null,
            tour_type: "group",
          },
          {
            id: "2",
            slug: "beautiful-bali",
            title: "Beautiful Bali",
            scope: "international",
            destination_name: "Bali",
            hero_image_url: unsplash("photo-1537996194471-e657df975ab4", 1280),
            duration_days: 7,
            duration_nights: 6,
            price_amount: 50000,
            price_currency: "INR",
            overview: null,
            tour_type: "group",
          },
          {
            id: "3",
            slug: "singapore-malaysia",
            title: "Singapore & Malaysia",
            scope: "international",
            destination_name: "Singapore & Malaysia",
            hero_image_url: unsplash("photo-1492571350019-22de08371fd3", 1280),
            duration_days: 7,
            duration_nights: 6,
            price_amount: 78000,
            price_currency: "INR",
            overview: null,
            tour_type: "group",
          },
          {
            id: "4",
            slug: "chardham-helicopter-5n6d",
            title: "Chardham Yatra by Helicopter",
            scope: "domestic",
            destination_name: "Uttarakhand",
            hero_image_url: unsplash("photo-1470071459604-3b5ec3a7fe05", 1280),
            duration_days: 6,
            duration_nights: 5,
            price_amount: null,
            price_currency: "INR",
            overview: null,
            tour_type: "group",
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

      <div className="relative">
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
          {displayItems.map((pkg) => (
            <div key={pkg.id} className="w-[290px] flex-none sm:w-[330px]">
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
