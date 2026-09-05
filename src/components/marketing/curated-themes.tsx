import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/lib/images";

export interface ThemeCollection {
  title: string;
  blurb: string;
  href: string;
  images: string[];
}

export const curatedThemesData: ThemeCollection[] = [
  {
    title: "Mountains & the North",
    blurb: "Himalayan valleys, high passes, and alpine calm.",
    href: "/group-tours/domestic",
    images: [
      "photo-1506905925346-21bda4d32df4", // Himalayan mountain panorama
      "photo-1595815771614-ade9d652a65d", // Kashmir valley
      "photo-1626621341517-bbf3d9990a23", // Manali / Himachal pine slopes
      "photo-1581793745862-99fde7fa73d2", // Ladakh mountain pass & lake
      "photo-1519681393784-d120267933ba", // Uttarakhand alpine peaks
    ],
  },
  {
    title: "Beaches & Islands",
    blurb: "Sun, sea, and slow island mornings.",
    href: "/packages",
    images: [
      "photo-1507525428034-b723cf961d3e", // Tropical crystalline sea
      "photo-1512343879784-a960bf40e7f2", // Goa palm coast
      "photo-1589308078059-be1415eab4c3", // Andaman turquoise shores
      "photo-1590050752117-238cb0fb12b1", // Kerala coastal cliffs & beaches
      "photo-1544551763-46a013bb70d5", // Lakshadweep tropical lagoon
    ],
  },
  {
    title: "Heritage & Pilgrimage",
    blurb: "Timeless monuments and journeys of the spirit.",
    href: "/group-tours/domestic",
    images: [
      "photo-1548013146-72479768bada", // Taj Mahal arched view
      "photo-1561361513-2d000a50f0dc", // Varanasi holy ghats & Ganges
      "photo-1524492412937-b28074a5d7da", // India Gate & Delhi heritage
      "photo-1599661046289-e31897846e41", // Rajasthan royal palaces
      "photo-1582510003544-4d00b7f74220", // South India temple gopuram architecture
    ],
  },
  {
    title: "International Escapes",
    blurb: "Iconic cities and horizons beyond India.",
    href: "/group-tours/international",
    images: [
      "photo-1436491865332-7a61a109cc05", // Sky & flight horizon
      "photo-1502602898657-3e91760cbb34", // Paris Eiffel Tower
      "photo-1530122037265-a5f1f91d3b99", // Swiss Alps & alpine lakes
      "photo-1512453979798-5ea266f8880c", // Dubai skyline
      "photo-1523906834658-6e24ef2386f9", // Italy canals & Venice
    ],
  },
];

function ThemeCarouselCard({ collection, index }: { collection: ThemeCollection; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const initialDelayRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images for smooth transition
  useEffect(() => {
    collection.images.slice(1).forEach((imgId) => {
      const img = new Image();
      img.src = unsplash(imgId, 1280);
    });
  }, [collection.images]);

  // Handle hover-driven automatic carousel slideshow
  useEffect(() => {
    if (isHovered) {
      // Start slideshow after a brief initial pause (~600ms)
      initialDelayRef.current = setTimeout(() => {
        timerRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % collection.images.length);
        }, 2600);
      }, 600);
    } else {
      // Clear timers and smoothly reset to the default 1st image
      if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      setActiveIndex(0);
    }

    return () => {
      if (initialDelayRef.current) clearTimeout(initialDelayRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, collection.images.length]);

  return (
    <Reveal delay={index * 110}>
      <Link
        to={collection.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-[1.8rem] shadow-[0_18px_46px_-24px_rgba(16,33,58,0.4)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_76px_-28px_rgba(16,33,58,0.45)]"
      >
        {/* Layered Image Carousel Stack with crossfade & Ken Burns zoom */}
        <div className="absolute inset-0 h-full w-full overflow-hidden bg-slate-900">
          {collection.images.map((imgId, idx) => {
            const isActive = idx === activeIndex;
            return (
              <img
                key={imgId}
                src={unsplash(imgId, 1280)}
                alt={`${collection.title} slide ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover brightness-[1.05] transition-all duration-1000 ease-out ${
                  isActive
                    ? "opacity-100 scale-105"
                    : "opacity-0 scale-100 pointer-events-none"
                }`}
              />
            );
          })}
        </div>

        {/* Subtle Carousel Progress Dots (Visible when hovered) */}
        <div
          className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden
        >
          {collection.images.map((_, idx) => (
            <span
              key={idx}
              className={`block rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "h-1.5 w-3.5 bg-white shadow-sm"
                  : "h-1.5 w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Text / Content bottom overlay - Kept strictly identical to existing card design */}
        <div className="absolute inset-x-0 bottom-0 z-20 bg-white/94 p-5 backdrop-blur-sm">
          <h3 className="text-base font-bold leading-tight text-deep sm:text-lg">
            {collection.title}
          </h3>
          <p className="mt-1 text-xs font-normal text-text-secondary sm:text-sm">
            {collection.blurb}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}

export function CuratedThemes() {
  return (
    <>
      <Reveal>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <div>
            <p className="eyebrow text-[#ad7f19]">Curated themes</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#10213a] sm:text-2xl md:text-3xl">
              Journeys arranged for every kind of traveller
            </h2>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline sm:text-sm"
          >
            View all packages <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      {/* Exact 4-Card Grid with Independent Hover Slideshows */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {curatedThemesData.map((collection, index) => (
          <ThemeCarouselCard
            key={collection.title}
            collection={collection}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
