import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Compass, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/lib/images";

export function CuratedThemes() {
  return (
    <div className="relative">
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-[#f6ecdc]/70 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#dfe9f8]/60 blur-3xl"
        aria-hidden
      />

      {/* Section Header */}
      <Reveal>
        <div className="relative z-10 mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#eadfcf] bg-[#fffcf5] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#ad7f19] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#ad7f19]" />
              <span>Curated Themes</span>
            </div>
            <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-[#10213a] sm:text-3xl lg:text-4xl">
              Journeys arranged for every kind of traveller
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6c7788] sm:text-base">
              Explore bespoke collections designed around distinct travel moods, from tranquil mountain valleys to sun-drenched coastlines and ancient heritage circuits.
            </p>
          </div>

          <Link
            to="/packages"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[#e8decb] bg-white px-5 py-2.5 text-xs font-bold text-[#10213a] shadow-sm transition-all duration-300 hover:border-[#0b66e4] hover:bg-[#0b66e4] hover:text-white hover:shadow-md md:self-end sm:text-sm"
          >
            <span>View all packages</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Reveal>

      {/* Asymmetric Luxury Editorial Grid Layout */}
      <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:gap-7">
        {/* LEFT COLUMN: Large Featured Hero Theme (Occupies 7 cols on large screens) */}
        <div className="lg:col-span-7">
          <Reveal delay={0}>
            <Link
              to="/group-tours/domestic"
              className="group relative flex min-h-[480px] sm:min-h-[540px] lg:h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-[#10213a] p-6 sm:p-9 shadow-[0_24px_54px_-20px_rgba(16,33,58,0.35)] transition-all duration-700 hover:-translate-y-2 hover:border-[#0b66e4]/40 hover:shadow-[0_36px_74px_-24px_rgba(11,102,228,0.4)]"
            >
              {/* Background Landscape Photo */}
              <img
                src={unsplash("photo-1506905925346-21bda4d32df4", 1600)}
                alt="Mountains & the North"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.88] transition-transform duration-[1400ms] ease-out group-hover:scale-108 group-hover:brightness-[0.8]"
              />

              {/* Multi-stage Luxury Gradient Overlay for high readability and depth */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 transition-opacity duration-500 group-hover:via-black/50"
                aria-hidden
              />

              {/* Top Bar: Floating Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#f8d77f] backdrop-blur-md shadow-sm">
                  <Compass className="h-3.5 w-3.5 text-[#f8d77f]" />
                  <span>Featured Expedition</span>
                </div>

                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md">
                  Ladakh • Kashmir • Himachal • Spiti
                </span>
              </div>

              {/* Bottom Content Area: Editorial Headline & Actions */}
              <div className="relative z-10 mt-24">
                <div className="inline-block rounded-full bg-[#ad7f19]/90 px-3 py-0.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-sm mb-3">
                  Mountain Escapes
                </div>
                <h3 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Mountains &amp; the North
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  Himalayan valleys, high-altitude passes, and pristine alpine calm. Experience curated routes with handpicked boutique stays and local guided journeys.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#10213a] shadow-lg transition-all duration-300 group-hover:bg-[#0b66e4] group-hover:text-white sm:text-sm">
                    <span>Explore Mountain Tours</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-xs font-semibold text-white/75 sm:text-sm">
                    12+ Departures Available
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: 3 Asymmetric Theme Cards (Occupies 5 cols on large screens) */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          {/* Top Card: International Escapes (Wide Panorama Style) */}
          <Reveal delay={100}>
            <Link
              to="/group-tours/international"
              className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-[#10213a] p-6 shadow-[0_18px_44px_-18px_rgba(16,33,58,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0b66e4]/40 hover:shadow-[0_28px_60px_-20px_rgba(11,102,228,0.35)]"
            >
              <img
                src={unsplash("photo-1436491865332-7a61a109cc05", 1200)}
                alt="International Escapes"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.82] transition-transform duration-[1200ms] ease-out group-hover:scale-108 group-hover:brightness-[0.72]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 transition-opacity duration-300 group-hover:via-black/55"
                aria-hidden
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f8d77f] backdrop-blur-md">
                  Global Horizons
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#0b66e4] group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="relative z-10 mt-8">
                <h3 className="font-heading text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#f8d77f] sm:text-2xl">
                  International Escapes
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/85 sm:text-sm">
                  Iconic world cities, exotic islands, and horizons beyond India. Europe, Bali, Dubai, and beyond.
                </p>
              </div>
            </Link>
          </Reveal>

          {/* Bottom Row: 2 Complementary Half-Cards (Beaches & Islands + Heritage & Pilgrimage) */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Beaches & Islands */}
            <Reveal delay={180}>
              <Link
                to="/packages"
                className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-[#10213a] p-5 shadow-[0_18px_44px_-18px_rgba(16,33,58,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0b66e4]/40 hover:shadow-[0_28px_60px_-20px_rgba(11,102,228,0.35)]"
              >
                <img
                  src={unsplash("photo-1507525428034-b723cf961d3e", 1000)}
                  alt="Beaches & Islands"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.88] transition-transform duration-[1200ms] ease-out group-hover:scale-108 group-hover:brightness-[0.78]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10 transition-opacity duration-300 group-hover:via-black/55"
                  aria-hidden
                />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f8d77f] backdrop-blur-md">
                    Coastal Bliss
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#0b66e4] group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#f8d77f]">
                    Beaches &amp; Islands
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/80 line-clamp-2">
                    Sun, turquoise sea, slow island mornings, and serene coastal resorts.
                  </p>
                </div>
              </Link>
            </Reveal>

            {/* Heritage & Pilgrimage */}
            <Reveal delay={240}>
              <Link
                to="/group-tours/domestic"
                className="group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-[#10213a] p-5 shadow-[0_18px_44px_-18px_rgba(16,33,58,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0b66e4]/40 hover:shadow-[0_28px_60px_-20px_rgba(11,102,228,0.35)]"
              >
                <img
                  src={unsplash("photo-1548013146-72479768bada", 1000)}
                  alt="Heritage & Pilgrimage"
                  className="absolute inset-0 h-full w-full object-cover brightness-[0.88] transition-transform duration-[1200ms] ease-out group-hover:scale-108 group-hover:brightness-[0.78]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-black/10 transition-opacity duration-300 group-hover:via-black/55"
                  aria-hidden
                />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#f8d77f] backdrop-blur-md">
                    Sacred &amp; Culture
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-[#0b66e4] group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#f8d77f]">
                    Heritage &amp; Pilgrimage
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/80 line-clamp-2">
                    Timeless monuments, rich architecture, and journeys of the spirit.
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
