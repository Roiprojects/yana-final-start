import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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
      "/themes/theme-mountains.jpg",
      "/themes/theme-mountains-2.jpg",
    ],
  },
  {
    title: "Beaches & Islands",
    blurb: "Sun, sea, and slow island mornings.",
    href: "/packages",
    images: [
      "/themes/theme-beaches.jpg",
      "/themes/theme-beaches-2.jpg",
    ],
  },
  {
    title: "Heritage & Pilgrimage",
    blurb: "Timeless monuments and journeys of the spirit.",
    href: "/group-tours/domestic",
    images: [
      "/themes/theme-heritage.jpg",
      "/themes/theme-heritage-2.jpg",
    ],
  },
  {
    title: "International Escapes",
    blurb: "Iconic cities and horizons beyond India.",
    href: "/group-tours/international",
    images: [
      "/themes/theme-international.jpg",
      "/themes/theme-international-2.jpg",
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
    collection.images.slice(1).forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
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
          {collection.images.map((imgSrc, idx) => {
            const isActive = idx === activeIndex;
            return (
              <img
                key={imgSrc}
                src={imgSrc}
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
