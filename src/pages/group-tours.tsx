import { Link } from "react-router-dom";
import { ChefHat, MapPin, Globe, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";

const options = [
  {
    href: "/group-tours/kitchen-staff",
    icon: ChefHat,
    title: "With Kitchen Staff",
    desc: "Group tours accompanied by travelling kitchen staff for familiar, home-style meals along the route.",
  },
  {
    href: "/group-tours/domestic",
    icon: MapPin,
    title: "Domestic Group Tours",
    desc: "Escorted group departures to destinations across India with planning handled for you.",
  },
  {
    href: "/group-tours/international",
    icon: Globe,
    title: "International Group Tours",
    desc: "Coordinated group departures to destinations around the world.",
  },
];

export function GroupToursPage() {
  return (
    <>
      <PageHeader
        title="Group Tours"
        subtitle="Travel together with like-minded companions on expertly escorted departures that now feel more premium and inviting."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Group Tours" }]}
        image="photo-1476514525535-07fb3b4ae5f1"
      />
      <Section>
        <Reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#ad7f19]">Travel together</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Escorted departures, elevated presentation, smoother decisions
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                Group tours are a relaxed way to explore. Travel alongside
                like-minded companions on a planned route, with the logistics
                handled for you and the experience framed with a stronger
                premium feel.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#eadfcf] bg-[linear-gradient(135deg,#fffefb,#f7f1e4)] p-6 shadow-[0_22px_52px_-34px_rgba(16,33,58,0.24)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_30px_-18px_rgba(52,87,202,0.8)]">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm leading-7 text-text-secondary">
                Better spacing, brighter surfaces, and cleaner options make the
                group-tour offering feel more credible and more desirable.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {options.map(({ href, icon: Icon, title, desc }, i) => (
            <Reveal key={href} delay={i * 110}>
              <Link
                to={href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/20 bg-primary p-7 text-white shadow-[0_20px_45px_-18px_rgba(52,87,202,0.48)] transition-all duration-300 hover:-translate-y-2 hover:border-[#eadfcf] hover:bg-white hover:text-deep hover:shadow-[0_30px_60px_-20px_rgba(16,33,58,0.22)]"
              >
                {/* Top Subtle Light Line */}
                <span
                  className="hairline absolute inset-x-6 top-0 h-px bg-white/25 transition-colors group-hover:bg-primary/20"
                  aria-hidden
                />

                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white text-primary shadow-[0_8px_20px_-6px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_12px_24px_-6px_rgba(52,87,202,0.6)]">
                      <Icon className="h-6 w-6 transition-colors duration-300" aria-hidden />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-deep">
                    {title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/85 transition-colors duration-300 group-hover:text-text-secondary">
                    {desc}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-4 transition-colors group-hover:border-[#eadfcf]">
                  <span className="text-xs font-semibold text-white/80 transition-colors group-hover:text-text-secondary">
                    View departures
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                    <span>Explore</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <EnquiryCta />
    </>
  );
}
