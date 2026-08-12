import { useEffect, useState } from "react";
import {
  MapPin,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";
import { useSiteSettings } from "@/components/providers/site-settings-context";
import { api } from "@/lib/api/client";
import type { PublicOffice } from "@/lib/types/content";

const fallbackOfferings = [
  "Domestic group tours across India",
  "International group departures",
  "Fully customized private itineraries",
  "Pilgrimage and spiritual journeys",
  "Honeymoon and weekend getaways",
  "Corporate outings & MICE",
  "Flights, visa & documentation",
  "Forex and hotel bookings",
];

const fallbackValues = [
  {
    icon: Compass,
    title: "End-to-end planning",
    desc: "One team handling stays, sightseeing, transfers, and documentation with a more polished travel experience.",
  },
  {
    icon: HeartHandshake,
    title: "Personal attention",
    desc: "Itineraries shaped around how you like to travel, not a fixed template or one-size-fits-all route.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted support",
    desc: "A reliable team you can reach before departure and while your journey is in motion.",
  },
];

function officeAddress(o: PublicOffice): string {
  return [o.address, o.city, o.pincode].filter(Boolean).join(", ");
}

export function AboutPage() {
  const { tagline, founded, about } = useSiteSettings();
  const [offices, setOffices] = useState<PublicOffice[]>([]);

  useEffect(() => {
    let cancelled = false;
    api
      .listPublicOffices()
      .then((res) => {
        if (!cancelled) setOffices(res);
      })
      .catch(() => {
        if (!cancelled) setOffices([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const headline = about.headline || "Welcome to Yana Travels";

  const intro =
    about.intro && about.intro.length > 0
      ? about.intro
      : [
          `Yana Travels was founded in ${founded}. We are a team of travel experts with deep knowledge of historic, scenic, and culturally rich destinations across India and abroad.`,
          "We understand the importance of your time, and our aim is to make every getaway memorable. Be it a personal holiday, a leisure tour, or a corporate travel plan, we work to balance comfort, coordination, and value while keeping the journey smooth from start to finish.",
          "From flights and stays to documentation, day-to-day planning, food, activities, and support, we handle the details so your experience feels curated instead of stressful. We also customize around your needs whenever the journey calls for it.",
        ];

  const offerings =
    about.offerings && about.offerings.length > 0
      ? about.offerings
      : fallbackOfferings;

  const values: { title: string; desc: string; icon?: typeof Compass }[] =
    about.values && about.values.length > 0
      ? about.values.map((v) => ({ title: v.title, desc: v.desc }))
      : fallbackValues;

  const officeList =
    offices.length > 0
      ? offices.map((o) => ({ name: o.office_name, address: officeAddress(o) }))
      : [{ name: "Udupi", address: "Corporate Office, Udupi" }];

  return (
    <>
      <PageHeader
        title="About Yana Travels"
        subtitle={tagline}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="photo-1548013146-72479768bada"
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <Reveal>
            <div className="max-w-3xl">
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                {headline}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-8 text-text-secondary">
                {intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[1.9rem] border border-[#eadfcf] bg-[linear-gradient(135deg,#fffefb,#f7f1e4)] p-7 shadow-[0_24px_56px_-34px_rgba(16,33,58,0.28)]">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-primary text-white shadow-[0_18px_34px_-20px_rgba(23,63,107,0.8)]">
                <Sparkles className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.03em] text-deep">
                Why the brand feels stronger now
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "Brighter luxury styling with stronger visual hierarchy",
                  "More elegant section spacing and premium card treatment",
                  "A cleaner expression of trust, comfort, and curated service",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-text-secondary"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c99b2d]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="soft">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow text-[#ad7f19]">What we do</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">
              Travel services arranged around real needs
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div className="h-full rounded-[1.45rem] border border-[#eadfcf] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(16,33,58,0.24)]">
                <span className="mb-3 block h-px w-16 bg-[linear-gradient(90deg,#c99b2d,transparent)]" />
                <span className="text-sm font-semibold leading-6 text-text-main">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 110}>
              <div className="h-full rounded-[1.7rem] border border-[#eadfcf] bg-white p-7 shadow-[0_22px_48px_-30px_rgba(16,33,58,0.26)]">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[#f8f2e3] text-primary ring-1 ring-[#eadfcf]">
                  {v.icon ? (
                    <v.icon className="h-6 w-6" aria-hidden />
                  ) : (
                    <Compass className="h-6 w-6" aria-hidden />
                  )}
                </div>
                <h3 className="text-lg font-bold tracking-[-0.02em]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <Reveal>
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow text-[#ad7f19]">Our presence</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] md:text-3xl">
              Offices that keep the journey connected
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {officeList.map((office, i) => (
            <Reveal key={office.name} delay={i * 100}>
              <div className="flex h-full items-start gap-4 rounded-[1.7rem] border border-[#eadfcf] bg-white p-6 shadow-[0_18px_44px_-30px_rgba(16,33,58,0.24)]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] bg-[#f8f2e3] text-primary">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-deep">{office.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    {office.address}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <EnquiryCta />
    </>
  );
}
