import { Route, Users, Globe2, LifeBuoy } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const props = [
  {
    icon: Route,
    title: "Planned end to end",
    desc: "Flights, stays, sightseeing, and documentation — organised so you don't have to.",
  },
  {
    icon: Users,
    title: "Group or private",
    desc: "Join an escorted group departure, or travel on a fully customized private itinerary.",
  },
  {
    icon: Globe2,
    title: "India & beyond",
    desc: "Domestic journeys and international escapes, from mountains to city breaks.",
  },
  {
    icon: LifeBuoy,
    title: "Support along the way",
    desc: "A team you can reach before and during your trip, by phone or on WhatsApp.",
  },
];

export function ValueProps() {
  return (
    <div>
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow text-primary">Why travel with us</p>
        <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
          Thoughtful travel, handled with care
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {props.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border-soft bg-white p-6 shadow-[0_10px_30px_-14px_rgba(12,39,64,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_24px_54px_-20px_rgba(18,96,158,0.45)]">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-lavender opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
              />
              <div className="relative mb-4 w-fit rounded-2xl bg-gradient-to-br from-bg-soft to-lavender p-3 text-primary ring-1 ring-primary/10 transition-all duration-300 group-hover:from-primary group-hover:to-[#2b7fc7] group-hover:text-white group-hover:shadow-[0_12px_28px_-8px_rgba(18,96,158,0.7)]">
                <p.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="relative font-heading text-lg font-semibold text-deep">
                {p.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
