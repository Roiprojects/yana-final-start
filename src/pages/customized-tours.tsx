import { Link } from "react-router-dom";
import { MapPin, Globe, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";

const options = [
  {
    href: "/customized-tours/domestic",
    icon: MapPin,
    title: "Domestic Tours",
    desc: "Journeys across India, tailored around your own pace, route, and preferences.",
  },
  {
    href: "/customized-tours/international",
    icon: Globe,
    title: "International Tours",
    desc: "Travel abroad with an itinerary designed around how you want to experience it.",
  },
];

export function CustomizedToursPage() {
  return (
    <>
      <PageHeader
        title="Customized Tours"
        subtitle="Tell us how you like to travel and we design a journey that feels more personal, polished, and premium."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Customized Tours" },
        ]}
        image="photo-1507525428034-b723cf961d3e"
      />
      <Section>
        <Reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#ad7f19]">Made for you</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Private itineraries shaped around your style of travel
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                Prefer to travel at your own pace? We design private itineraries
                around your dates, budget, and interests, whether it&apos;s a
                family holiday, a honeymoon, or a special-occasion journey.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#eadfcf] bg-[linear-gradient(135deg,#fffefb,#f7f1e4)] p-6 shadow-[0_22px_52px_-34px_rgba(16,33,58,0.24)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_30px_-18px_rgba(52,87,202,0.8)]">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm leading-7 text-text-secondary">
                The page now reflects a higher-end custom planning experience
                instead of reading like a basic category listing.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {options.map(({ href, icon: Icon, title, desc }, i) => (
            <Reveal key={href} delay={i * 120}>
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
                    Bespoke Planning
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                    <span>Start planning</span>
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
