import { MessageSquare, Map, Plane } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    icon: MessageSquare,
    title: "Tell us your plans",
    desc: "Share where you'd like to go, your dates, and how you like to travel — by form or on WhatsApp.",
  },
  {
    icon: Map,
    title: "We craft the journey",
    desc: "Our team shapes an itinerary and handles the details — stays, sightseeing, transfers, and documentation.",
  },
  {
    icon: Plane,
    title: "You simply travel",
    desc: "Set off with everything arranged, and support along the way whenever you need it.",
  },
];

export function HowItWorks() {
  return (
    <div>
      <div className="mb-10">
        <p className="eyebrow text-primary">How it works</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
          Planning your trip is simple
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 120}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-border-soft bg-white p-6 shadow-[0_10px_30px_-14px_rgba(12,39,64,0.25)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="font-heading text-5xl font-extrabold tracking-tight text-lavender">
                  0{i + 1}
                </span>
                <div className="w-fit rounded-full bg-gradient-to-br from-primary to-[#2b7fc7] p-3 text-white shadow-[0_10px_24px_-8px_rgba(18,96,158,0.7)]">
                  <step.icon className="h-6 w-6" aria-hidden />
                </div>
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-deep">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
