import { MessageSquare, Map, PlaneTakeoff, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";

const steps = [
  {
    step: "01",
    tag: "Step 01 · Inquiry",
    badge: "Tell Us Your Dreams",
    icon: MessageSquare,
    title: "Share your travel vision",
    desc: "Tell us where you want to travel, your dates, group size, and preferences — via our quick enquiry form or directly on WhatsApp.",
    highlight: "Prompt Response & Consultation",
    gradient: "from-[#0b66e4] to-[#1d4ed8]",
    glow: "bg-[#0b66e4]/12",
  },
  {
    step: "02",
    tag: "Step 02 · Customization",
    badge: "Expert Itinerary Design",
    icon: Map,
    title: "We shape your journey",
    desc: "Our destination experts build your personalized plan with handpicked stays, curated activities, flights, transfers, and visa documentation.",
    highlight: "100% Tailored & Flexible",
    gradient: "from-[#c99b2d] to-[#9a741c]",
    glow: "bg-[#c99b2d]/12",
  },
  {
    step: "03",
    tag: "Step 03 · Departure",
    badge: "Worry-Free Holiday",
    icon: PlaneTakeoff,
    title: "Set off & simply enjoy",
    desc: "Embark on your dream holiday with every detail confirmed in advance, backed by 24/7 dedicated support throughout your trip.",
    highlight: "24/7 On-Trip Concierge Support",
    gradient: "from-[#2e9e6b] to-[#15803d]",
    glow: "bg-[#2e9e6b]/12",
  },
];

export function HowItWorks() {
  const { open: openEnquiry } = useEnquiryModal();

  return (
    <div className="relative">
      {/* Section Header */}
      <Reveal>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#ad7f19]">How it works</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-deep sm:text-2xl md:text-3xl">
              Planning your trip is simple & effortless
            </h2>
            <p className="mt-2 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
              From your initial idea to smooth return, our three-step process makes dream holidays seamless and stress-free.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openEnquiry()}
            className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-bold text-white shadow-[0_16px_32px_-12px_rgba(11,102,228,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_38px_-10px_rgba(11,102,228,0.75)] hover:scale-[1.02]"
          >
            <span>Start Planning Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>

      {/* 3-Step Animated Timeline Flow */}
      <div className="relative">
        {/* Desktop Connected Progress Line */}
        <div
          aria-hidden
          className="absolute left-[12%] right-[12%] top-9 hidden h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#0b66e4]/30 via-[#c99b2d]/45 to-[#2e9e6b]/30 lg:block z-0"
        />

        <div className="relative z-10 grid gap-7 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 130}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2.2rem] border border-white/90 bg-white/90 p-8 shadow-[0_16px_40px_-16px_rgba(16,33,58,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2.5 hover:border-primary/35 hover:bg-white hover:shadow-[0_30px_60px_-18px_rgba(11,102,228,0.22)]">
                {/* Top glow accent line */}
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#c99b2d]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Subtle Watermark Number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-6 select-none font-display text-7xl font-extrabold text-black/[0.04] transition-all duration-500 group-hover:scale-110 group-hover:text-primary/[0.08]"
                >
                  {step.step}
                </span>

                {/* Ambient glow in background */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full ${step.glow} blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`}
                />

                <div>
                  {/* Step Header: Icon & Step Tag */}
                  <div className="relative mb-6 flex items-center justify-between gap-3">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-[0_12px_26px_-6px_rgba(16,33,58,0.35)] ring-4 ring-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_16px_32px_-6px_rgba(11,102,228,0.5)]`}
                    >
                      <step.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden />
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-[#e8decb] bg-[#fffdf8] px-3.5 py-1 text-xs font-extrabold text-deep shadow-sm transition-colors group-hover:border-primary/40 group-hover:text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span>{step.tag}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-xl font-bold tracking-tight text-deep transition-colors duration-200 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Highlight Feature Pill */}
                <div className="mt-8 flex items-center gap-2.5 border-t border-[#f0e8d8] pt-4 text-xs font-semibold text-text-main">
                  <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                  <span className="truncate text-text-secondary group-hover:text-deep transition-colors">
                    {step.highlight}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
