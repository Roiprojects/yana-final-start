import { BadgeCheck, Route, ShieldCheck, Headphones } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const badges = [
  {
    icon: BadgeCheck,
    title: "Customized Itineraries",
    desc: "Tailor-made trips around your dates, budget & interests.",
  },
  {
    icon: Route,
    title: "Group & Private Tours",
    desc: "Join an escorted departure or travel on your own private plan.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Planning",
    desc: "Flights, visa, forex, stays & sightseeing — all handled.",
  },
  {
    icon: Headphones,
    title: "Support Along the Way",
    desc: "Reach us by phone or WhatsApp before and during your trip.",
  },
];

export function TrustBadges() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((b, i) => (
        <Reveal key={b.title} delay={i * 80}>
          <div className="flex h-full items-start gap-3.5 rounded-2xl border border-border-soft bg-white p-5 shadow-[0_10px_28px_-18px_rgba(12,39,64,0.4)]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-bg-soft to-lavender text-primary ring-1 ring-primary/10">
              <b.icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="font-heading text-[15px] font-bold text-deep">
                {b.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {b.desc}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
