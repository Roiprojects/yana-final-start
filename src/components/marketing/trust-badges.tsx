import { Sparkles, Compass, ShieldCheck, Headphones, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const badges = [
  {
    icon: Sparkles,
    tag: "100% Tailored",
    title: "Customized Itineraries",
    desc: "Tailor-made trips crafted around your preferred dates, budget & travel style.",
    gradient: "from-[#3457ca] to-[#1e3a8a]",
    accentGlow: "bg-[#3457ca]/12",
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
    gradient: "from-[#3457ca] to-[#2563eb]",
    accentGlow: "bg-[#3457ca]/12",
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((b, i) => (
        <Reveal key={b.title} delay={i * 80}>
          <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] border border-[#e8decb]/90 bg-white/90 p-6 shadow-[0_12px_32px_-16px_rgba(16,33,58,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#c99b2d]/40 hover:bg-white hover:shadow-[0_26px_50px_-16px_rgba(52,87,202,0.18)]">
            {/* Top decorative accent line */}
            <span
              aria-hidden
              className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#c99b2d]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Ambient background glow on hover */}
            <span
              aria-hidden
              className={`pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full ${b.accentGlow} blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`}
            />

            <div>
              {/* Header with Icon and Tag */}
              <div className="mb-5 flex items-center justify-between gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${b.gradient} text-white shadow-[0_10px_22px_-6px_rgba(16,33,58,0.35)] ring-4 ring-black/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_14px_28px_-6px_rgba(52,87,202,0.45)]`}
                >
                  <b.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" aria-hidden />
                </div>
                <span className="rounded-full border border-[#e8decb] bg-[#fffdf8] px-3 py-1 text-[11px] font-bold tracking-wide text-[#6c7788] transition-colors group-hover:border-[#c99b2d]/40 group-hover:text-[#9a741c]">
                  {b.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading text-base font-bold text-[#10213a] transition-colors duration-200 group-hover:text-primary">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6c7788]">
                {b.desc}
              </p>
            </div>

            {/* Bottom accent hint */}
            <div className="mt-5 flex items-center gap-1.5 pt-3 border-t border-[#f0e8d8] text-xs font-semibold text-primary opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <span>Learn more</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
