import { Route, Users, Globe2, LifeBuoy, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const timelineSteps = [
  {
    step: "01",
    phase: "Phase 01 · Planning",
    icon: Route,
    title: "Planned end to end",
    desc: "Flights, luxury stays, sightseeing, and documentation — seamlessly organised so you don't have to stress.",
    highlight: "Complete Itinerary Handling",
    gradient: "from-[#3457ca] to-[#1d4ed8]",
    glow: "bg-[#3457ca]/12",
  },
  {
    step: "02",
    phase: "Phase 02 · Customization",
    icon: Users,
    title: "Group or private",
    desc: "Join curated escorted group departures with friendly companions, or travel on a tailor-made private plan.",
    highlight: "Bespoke & Group Choices",
    gradient: "from-[#c99b2d] to-[#9a741c]",
    glow: "bg-[#c99b2d]/12",
  },
  {
    step: "03",
    phase: "Phase 03 · Exploration",
    icon: Globe2,
    title: "India & beyond",
    desc: "From scenic domestic trails and spiritual tours across India to exotic international holidays worldwide.",
    highlight: "Domestic & Global Routes",
    gradient: "from-[#2e9e6b] to-[#15803d]",
    glow: "bg-[#2e9e6b]/12",
  },
  {
    step: "04",
    phase: "Phase 04 · Assurance",
    icon: LifeBuoy,
    title: "Support along the way",
    desc: "A dedicated travel expert team you can reach anytime before and throughout your journey via call or WhatsApp.",
    highlight: "24/7 Live Assistance",
    gradient: "from-[#3457ca] to-[#2563eb]",
    glow: "bg-[#3457ca]/12",
  },
];

export function ValueProps() {
  return (
    <div className="relative">
      {/* Section Heading */}
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow text-[#ad7f19]">Why travel with us</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-deep md:text-4xl">
            Thoughtful travel, handled with care
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            A seamless 4-stage travel journey crafted for effortless comfort, clear communication, and memorable experiences.
          </p>
        </div>
      </Reveal>

      {/* Timeline Grid with Connecting Progress Line */}
      <div className="relative">
        {/* Desktop Horizontal Connecting Track */}
        <div
          aria-hidden
          className="absolute left-8 right-8 top-7 hidden h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#3457ca]/20 via-[#c99b2d]/40 to-[#3457ca]/20 lg:block"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {timelineSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 100}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/90 p-6 shadow-[0_12px_36px_-16px_rgba(16,33,58,0.1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:bg-white hover:shadow-[0_26px_52px_-16px_rgba(52,87,202,0.2)]">
                {/* Top glow accent line on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#c99b2d]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Ambient glow in background */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full ${step.glow} blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`}
                />

                <div>
                  {/* Timeline Header: Milestone Node & Icon */}
                  <div className="relative mb-6 flex items-center justify-between gap-3">
                    <div
                      className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-[0_10px_22px_-6px_rgba(16,33,58,0.35)] ring-4 ring-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_14px_28px_-6px_rgba(52,87,202,0.45)]`}
                    >
                      <step.icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" aria-hidden />
                    </div>

                    {/* Step Milestone Badge */}
                    <div className="flex items-center gap-1.5 rounded-full border border-[#e8decb] bg-[#fffdf8] px-3 py-1 text-xs font-extrabold tracking-wider text-deep shadow-sm transition-colors group-hover:border-primary group-hover:text-primary">
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span>{step.step}</span>
                    </div>
                  </div>

                  {/* Phase Label */}
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#ad7f19]">
                    {step.phase}
                  </p>

                  {/* Title & Description */}
                  <h3 className="mt-2 font-heading text-lg font-bold text-deep transition-colors duration-200 group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Highlight Feature Pill */}
                <div className="mt-6 flex items-center gap-2 border-t border-[#f0e8d8] pt-4 text-xs font-semibold text-text-main">
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
