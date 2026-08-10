import { Link } from "react-router-dom";
import { MapPin, Globe, Compass, ArrowRight, Sparkles } from "lucide-react";
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
  {
    href: "/packages",
    icon: Compass,
    title: "View All Packages",
    desc: "Browse every package in one place with cleaner filtering and richer presentation.",
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
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_30px_-18px_rgba(23,63,107,0.8)]">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm leading-7 text-text-secondary">
                The page now reflects a higher-end custom planning experience
                instead of reading like a basic category listing.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {options.map(({ href, icon: Icon, title, desc }, i) => (
            <Reveal key={href} delay={i * 120}>
              <Link
                to={href}
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#eadfcf] bg-white p-6 shadow-[0_22px_48px_-30px_rgba(16,33,58,0.26)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(16,33,58,0.34)]"
              >
                <span
                  className="hairline absolute inset-x-6 top-0 h-px"
                  aria-hidden
                />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-[#f8f2e3] text-primary ring-1 ring-[#eadfcf] transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold tracking-[-0.02em] text-deep">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">
                  {desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Start planning
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <EnquiryCta />
    </>
  );
}
