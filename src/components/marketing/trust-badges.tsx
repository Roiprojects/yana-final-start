import { Sparkles, Compass, ShieldCheck, Headphones, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const badges = [
  {
    icon: Sparkles,
    tag: "100% Tailored",
    title: "Customized Itineraries",
    desc: "Tailor-made trips crafted around your preferred dates, budget & travel style.",
    gradient: "from-[#0b66e4] to-[#1e3a8a]",
    accentGlow: "bg-[#0b66e4]/12",
  },
  {
    icon: Compass,
    tag: "Flexible Choices",
    title: "Group & Private Tours",
    desc: "Join curated escorted group departures or travel privately at your own pace.",
    gradient: "from-[#c99b2d] to-[#9a741c]",
    accentGlow: "bg-[#c99b2d]/12",
  },
  {
    icon: ShieldCheck,
    tag: "Full Support",
    title: "End-to-End Planning",
    desc: "Seamless handling of flights, visa, forex, hotel stays & guided sightseeing.",
    gradient: "from-[#2e9e6b] to-[#1b6b45]",
    accentGlow: "bg-[#2e9e6b]/12",
  },
  {
    icon: Headphones,
    tag: "24/7 Dedicated",
    title: "Support Along the Way",
    desc: "Direct hotline and prompt WhatsApp assistance before and during your trip.",
    gradient: "from-[#0b66e4] to-[#2563eb]",
    accentGlow: "bg-[#0b66e4]/12",
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {badges.map((b, i) => (
        <Reveal key={b.title} delay={i * 80}>
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#e8decb]/90 bg-white/90 p-4 shadow-[0_8px_24px_-12px_rgba(16,33,58,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c99b2d]/40 hover:bg-white hover:shadow-[0_18px_36px_-12px_rgba(11,102,228,0.18)] sm:p-5">
            {/* Top decorative accent line */}
            <span
              aria-hidden
              className="absolute inset-x-6 top-0 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#c99b2d]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Ambient background glow on hover */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full ${b.accentGlow} blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`}
            />

            <div>
              {/* Header with Icon and Tag */}
              <div className="mb-3 flex items-center justify-between gap-2.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${b.gradient} text-white shadow-[0_8px_16px_-4px_rgba(16,33,58,0.35)] ring-2 ring-black/5 transition-all duration-300 group-hover:scale-105 sm:h-11 sm:w-11`}
                >
                  <b.icon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:rotate-6" aria-hidden />
                </div>
                <span className="rounded-full border border-[#e8decb] bg-[#fffdf8] px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#6c7788] transition-colors group-hover:border-[#c99b2d]/40 group-hover:text-[#9a741c]">
                  {b.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-sm font-bold text-[#10213a] transition-colors duration-200 group-hover:text-primary sm:text-base">
                {b.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6c7788]">
                {b.desc}
              </p>
            </div>

            {/* Bottom accent hint */}
            <div className="mt-3 flex items-center gap-1.5 border-t border-[#f0e8d8] pt-2 text-[11px] font-semibold text-primary opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <span>Learn more</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
