import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PackageGrid } from "@/components/tours/package-grid";
import type { PackageListItem } from "@/lib/types/tour";

const upcomingTours: PackageListItem[] = [
  {
    id: "upcoming-1",
    title: "Mesmerizing Kashmir Escape",
    slug: "kashmir-escape",
    scope: "domestic",
    tour_type: "group",
    duration_days: 6,
    duration_nights: 5,
    price_amount: 24999,
    price_currency: "INR",
    hero_image_url: "/themes/theme-mountains.jpg",
    overview: "Experience the heaven on earth with our upcoming group departure. Shikara rides, Gulmarg snowcaps, and Pahalgam valleys.",
  },
  {
    id: "upcoming-2",
    title: "Enchanting Bali Getaway",
    slug: "bali-getaway",
    scope: "international",
    tour_type: "customized",
    duration_days: 5,
    duration_nights: 4,
    price_amount: 45000,
    price_currency: "INR",
    hero_image_url: "/themes/theme-beaches-2.jpg",
    overview: "Sun-kissed beaches, ancient temples, and vibrant culture. The perfect tropical retreat for your upcoming holidays.",
  },
  {
    id: "upcoming-3",
    title: "Majestic Rajasthan Heritage",
    slug: "rajasthan-heritage",
    scope: "domestic",
    tour_type: "group",
    duration_days: 7,
    duration_nights: 6,
    price_amount: 32000,
    price_currency: "INR",
    hero_image_url: "/themes/theme-heritage-2.jpg",
    overview: "Explore the land of kings. Royal palaces, golden deserts, and a rich tapestry of Indian heritage.",
  },
  {
    id: "upcoming-4",
    title: "Swiss Paris Dream Tour",
    slug: "swiss-paris-dream",
    scope: "international",
    tour_type: "group",
    duration_days: 10,
    duration_nights: 9,
    price_amount: 185000,
    price_currency: "INR",
    hero_image_url: "/themes/theme-international.jpg",
    overview: "An iconic European journey covering the Eiffel Tower, Swiss Alps, and the romantic canals of Venice.",
  },
];

export function UpcomingToursSection() {
  return (
    <Section className="relative bg-white/40">
      <Reveal>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#0b66e4]" />
              <p className="eyebrow text-[#ad7f19]">Don't miss out</p>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#10213a] sm:text-3xl md:text-4xl">
              Upcoming Tours
            </h2>
          </div>
          <Link
            to="/packages"
            className="group flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-[#10213a]"
          >
            Explore all dates
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <PackageGrid items={upcomingTours} columns={4} />
    </Section>
  );
}

