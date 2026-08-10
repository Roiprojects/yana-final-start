import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Users2,
  Sparkles,
  Compass,
  Wrench,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";
import { HeroSlideshow } from "@/components/marketing/hero-slideshow";
import { HeroFeaturesPanel } from "@/components/marketing/hero-features-panel";
import { SpecialDealsSection } from "@/components/marketing/special-deals-carousel";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ValueProps } from "@/components/marketing/value-props";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { DestinationMarquee } from "@/components/marketing/destination-marquee";
import { Faq } from "@/components/marketing/faq";
import { OpenEnquiryButton } from "@/components/ui/open-enquiry-button";
import { primaryNav } from "@/lib/site-config";
import {
  unsplash,
  heroImage,
  experienceImage,
  collections,
} from "@/lib/images";
import { api } from "@/lib/api/client";
import type { PackageListItem } from "@/lib/types/tour";

const categories = [
  {
    href: "/group-tours",
    icon: Users2,
    title: "Group Tours",
    desc: "Escorted departures that feel organised, comfortable, and social.",
  },
  {
    href: "/customized-tours",
    icon: Sparkles,
    title: "Customized Tours",
    desc: "Tailor-made journeys shaped around your pace and preferences.",
  },
  {
    href: "/packages",
    icon: Compass,
    title: "Tour Packages",
    desc: "Ready-to-enquire itineraries presented with clearer hierarchy.",
  },
  {
    href: "/services",
    icon: Wrench,
    title: "Travel Services",
    desc: "Flights, visa, forex, stays, and support coordinated together.",
  },
];

const faqs = [
  {
    q: "How do I book a trip?",
    a: "Send us an enquiry or message us on WhatsApp with your plans, and our team will help you arrange everything.",
  },
  {
    q: "Do you offer customized itineraries?",
    a: "Yes — alongside escorted group departures, we plan fully tailor-made private trips around your dates, budget, and interests.",
  },
  {
    q: "Which destinations do you cover?",
    a: "Both domestic journeys across India and international destinations — including pilgrimage, honeymoon, weekend, and corporate travel.",
  },
  {
    q: "Can you handle flights, visa, and hotels?",
    a: "Yes. We assist with flight booking, visa and documentation, forex, and hotel bookings as part of planning your trip.",
  },
];

export function HomePage() {
  const [featured, setFeatured] = useState<PackageListItem[]>([]);
  const [sample, setSample] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .listPackages({ featured: true })
      .then((res) => {
        if (cancelled) return;
        setFeatured(res.items);
        setSample(res.sample);
      })
      .catch(() => {
        if (!cancelled) setFeatured([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div className="px-0 pt-0 sm:px-4 sm:pt-3">
        <section className="relative min-h-[calc(100svh-0.75rem)] overflow-hidden rounded-none border-0 bg-[linear-gradient(135deg,rgba(255,253,248,0.12),rgba(247,241,228,0.08))] shadow-[0_34px_80px_-42px_rgba(16,33,58,0.34)] sm:rounded-[2rem] sm:border sm:border-white/45 md:rounded-[2.6rem]">
          <HeroSlideshow
            videoSrc="/hero/homepage-hero-real-16x9.mp4"
            mobileVideoSrc="/hero/homepage-hero-real-9x16.mp4"
            poster="/hero/homepage-hero-real-16x9-poster.jpg"
            mobilePoster="/hero/homepage-hero-real-9x16-poster.jpg"
            images={[
              unsplash(heroImage, 2000),
              unsplash(collections[0].image, 2000),
              unsplash(collections[3].image, 2000),
            ]}
          />
          <div
            className="pointer-events-none absolute -left-12 top-16 h-56 w-56 rounded-full bg-[#e7d39a]/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#dfe9f8]/35 blur-3xl"
            aria-hidden
          />

          <Container className="relative z-10 flex min-h-[calc(100svh-1rem)] flex-col py-5 sm:py-6 lg:py-7">
            <div className="flex w-full flex-wrap items-start justify-between gap-4">
              <Link
                to="/"
                aria-label="Yana Travels home"
                className="group flex shrink-0 items-center gap-3 rounded-full"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-[1.15rem] bg-[linear-gradient(145deg,#2a9bea,#075eac)] shadow-[0_18px_34px_-18px_rgba(23,63,107,0.85)] ring-2 ring-[#f5d779]/75 transition-transform duration-300 group-hover:scale-[1.03]">
                  <img
                    src="/brand/yana-logo.png"
                    alt="Yana Travels"
                    className="h-12 w-auto object-contain brightness-125 contrast-125 saturate-125 drop-shadow-[0_3px_8px_rgba(255,255,255,0.28)]"
                  />
                </span>
                <span className="hidden min-w-0 flex-col sm:flex">
                  <span className="font-heading text-[1.15rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.48)] sm:text-[1.3rem]">
                    Yana
                  </span>
                  <span className="font-heading text-[1.15rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.48)] sm:text-[1.3rem]">
                    Travels
                  </span>
                </span>
              </Link>

              <div className="hidden max-w-4xl flex-wrap items-center justify-end gap-2 sm:flex">
                {primaryNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="inline-flex items-center rounded-full border border-white/28 bg-black/26 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.55)] backdrop-blur-[4px] transition-all duration-200 hover:bg-black/38"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid flex-1 w-full items-center gap-6 pt-6 lg:grid-cols-12 lg:gap-8 lg:pt-8">
              <div className="lg:col-span-7">
                <div className="max-w-3xl p-1 sm:p-2">
                  <h1 className="max-w-3xl animate-rise font-display text-4xl font-semibold leading-[0.96] tracking-[-0.045em] text-white drop-shadow-[0_18px_34px_rgba(0,0,0,0.58)] sm:text-5xl md:text-[3.7rem] xl:text-[4.35rem]">
                    Traveling - it leaves you speechless,
                    <span className="block text-[#f6d77f]">
                      then turns you into a story teller.
                    </span>
                  </h1>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to="/packages"
                      className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3.5 font-bold text-white shadow-[0_20px_36px_-20px_rgba(23,63,107,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                    >
                      Explore packages
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <OpenEnquiryButton className="inline-flex items-center gap-2 rounded-full border border-white/42 bg-black/24 px-6 py-3.5 font-bold text-white shadow-[0_16px_34px_-16px_rgba(0,0,0,0.48)] transition-all duration-300 hover:bg-black/34">
                      Plan a custom trip
                    </OpenEnquiryButton>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <HeroFeaturesPanel />
              </div>
            </div>
          </Container>
        </section>
      </div>

      <div className="relative overflow-hidden border-y border-[#efe3cd] bg-[linear-gradient(90deg,#faf6ed,#fffdf8,#f3f7fd)]">
        <Container className="relative z-10 py-14 md:py-16">
          <TrustBadges />
        </Container>
      </div>

      <Section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-12 left-1/4 h-80 w-80 rounded-full bg-[#dfe9f8]/70 blur-3xl"
          aria-hidden
        />
        <SpecialDealsSection items={featured} />
      </Section>

      <Section tone="soft" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -left-10 top-12 h-80 w-80 rounded-full bg-[#e6d39d]/35 blur-3xl"
          aria-hidden
        />
        <Reveal>
          <div className="relative z-10 mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[#ad7f19]">How you travel</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Travel styles with a clearer premium identity
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ href, icon: Icon, title, desc }, i) => (
            <Reveal key={href} delay={i * 90}>
              <Link
                to={href}
                className="group relative block h-full overflow-hidden rounded-[1.6rem] border border-[#efd477] bg-[linear-gradient(145deg,#ffffff,#fff9e8)] p-6 shadow-[0_20px_46px_-24px_rgba(16,33,58,0.34)] transition-all duration-300 hover:-translate-y-2 hover:border-[#d6a82e] hover:bg-white hover:shadow-[0_32px_64px_-24px_rgba(16,33,58,0.46)]"
              >
                <span
                  className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-[linear-gradient(90deg,#d7a92e,#f6d77f,#d7a92e)]"
                  aria-hidden
                />
                <div className="relative flex items-start justify-between">
                  <div className="rounded-[1.1rem] bg-primary p-3.5 text-[#f8db78] shadow-[0_14px_28px_-16px_rgba(23,63,107,0.95)] ring-2 ring-[#f2d36d]/75 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0f5c9e]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e5c45b] bg-white/80 text-primary shadow-sm transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-deep">
                  {title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-text-secondary">
                  {desc}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[#ad7f19]">Curated themes</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Journeys arranged for every kind of traveller
              </h2>
            </div>
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all packages <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <Link
                to={c.href}
                className="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-[1.8rem] shadow-[0_18px_46px_-24px_rgba(16,33,58,0.4)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_76px_-28px_rgba(16,33,58,0.45)]"
              >
                <img
                  src={unsplash(c.image, 1280)}
                  alt={c.title}
                  className="absolute inset-0 h-full w-full object-cover brightness-[1.05] transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white/94 p-5 backdrop-blur-sm">
                  <h3 className="text-xl font-bold leading-tight text-deep">
                    {c.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-normal text-text-secondary">
                    {c.blurb}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft" className="relative overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.9rem] shadow-[0_28px_60px_-32px_rgba(16,33,58,0.38)]">
              <div className="relative aspect-[4/3]">
                <img
                  src={unsplash(experienceImage, 1600)}
                  alt="A scenic travel route"
                  className="absolute inset-0 h-full w-full object-cover brightness-[1.05]"
                />
              </div>
              <div className="border-t border-[#eadfcf] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ad7f19]">
                  End-to-end comfort
                </p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Enquiry, planning, documentation, and departure support in one
                  smoother journey.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="eyebrow text-[#ad7f19]">The Yana way</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                Every detail handled, with a brighter and more polished feel
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                From flights and stays to sightseeing and documentation, the
                site now frames the same travel offer with better spacing, more
                confidence, and stronger luxury cues.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Group departures and fully customized itineraries",
                  "Domestic and international destinations",
                  "Pilgrimage, honeymoon, weekend, and corporate travel",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-3 font-medium text-text-main"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-semibold text-white shadow-[0_18px_30px_-18px_rgba(23,63,107,0.8)] transition-all duration-300 hover:-translate-y-0.5"
              >
                About Yana Travels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {featured.length > 0 ? (
        <Section>
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-[#ad7f19]">Featured departures</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                  Packages that now feel more premium at first glance
                </h2>
              </div>
              <Link
                to="/packages"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Browse all packages <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          {sample ? <SampleDataBanner /> : null}
          <PackageGrid items={featured.slice(0, 6)} />
        </Section>
      ) : null}

      <Section>
        <HowItWorks />
      </Section>

      <DestinationMarquee />

      <Section tone="soft">
        <ValueProps />
      </Section>

      <Section>
        <Reveal>
          <div className="mb-10 text-center">
            <p className="eyebrow text-[#ad7f19]">Good to know</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
              Frequently asked questions
            </h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mx-auto max-w-3xl">
            <Faq items={faqs} />
          </div>
        </Reveal>
      </Section>

      <EnquiryCta />
    </>
  );
}
