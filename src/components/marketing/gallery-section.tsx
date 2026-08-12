import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { api } from "@/lib/api/client";
import type { PublicGalleryItem } from "@/lib/types/content";

/**
 * Public gallery, read live from PostgreSQL (same data the admin edits).
 * Renders nothing when no active gallery items exist.
 */
export function GallerySection() {
  const [items, setItems] = useState<PublicGalleryItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .listPublicGallery()
      .then((res) => {
        if (!cancelled) setItems(res);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-bg-main">
      <Container className="py-16 md:py-20">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[#ad7f19]">Moments from the road</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                A glimpse of journeys we arrange
              </h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_30px_-18px_rgba(23,63,107,0.8)]">
              <Camera className="h-5 w-5" aria-hidden />
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={(i % 4) * 80}>
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-[1.4rem] shadow-[0_18px_46px_-28px_rgba(16,33,58,0.4)] ring-1 ring-black/5">
                <img
                  src={g.image_url}
                  alt={g.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                  <span className="text-sm font-semibold text-white">
                    {g.title}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
