import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { api } from "@/lib/api/client";
import type { PublicTestimonial } from "@/lib/types/content";

/**
 * Public testimonials, read live from PostgreSQL (same data the admin edits).
 * Renders nothing when no active testimonials exist.
 */
export function TestimonialsSection() {
  const [items, setItems] = useState<PublicTestimonial[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .listPublicTestimonials()
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
    <section className="bg-bg-soft">
      <Container className="py-8 sm:py-10 md:py-12">
        <Reveal>
          <div className="mb-6 text-center sm:mb-8">
            <p className="eyebrow text-[#ad7f19]">Traveller stories</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-deep sm:text-2xl md:text-3xl">
              Loved by travellers like you
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 90}>
              <figure className="flex h-full flex-col rounded-[1.7rem] border border-[#eadfcf] bg-white p-6 shadow-[0_20px_46px_-30px_rgba(16,33,58,0.26)]">
                <div
                  className="mb-4 flex gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s < t.rating
                          ? "fill-[#e0a82e] text-[#e0a82e]"
                          : "text-[#d8cfb8]"
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-7 text-text-secondary">
                  “{t.review}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-[#f1e7d3] pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edda] font-heading font-bold text-primary">
                    {t.customer_name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-semibold text-deep">{t.customer_name}</p>
                    {t.location && (
                      <p className="text-xs text-text-secondary">
                        {t.location}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
