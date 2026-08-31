import { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Users2,
  Sparkles,
  Compass,
  Wrench,
  Check,
  Globe2,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PackageGrid, SampleDataBanner } from "@/components/tours/package-grid";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";
import { HeroSlideshow } from "@/components/marketing/hero-slideshow";
import { HeroSearch } from "@/components/marketing/hero-search";
import { HeroFeaturesPanel } from "@/components/marketing/hero-features-panel";
import { SpecialDealsSection } from "@/components/marketing/special-deals-carousel";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ValueProps } from "@/components/marketing/value-props";
import { TrustBadges } from "@/components/marketing/trust-badges";
import { DestinationMarquee } from "@/components/marketing/destination-marquee";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { GallerySection } from "@/components/marketing/gallery-section";
import { Faq } from "@/components/marketing/faq";
import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { primaryNav } from "@/lib/site-config";
import {
  unsplash,
  heroImage,
  experienceImage,
  collections,
} from "@/lib/images";
import { api } from "@/lib/api/client";
import type { PackageListItem } from "@/lib/types/tour";
import type { PublicFaq } from "@/lib/types/content";

const categories = [
  {
    href: "/group-tours",
    icon: Users2,
    tag: "Escorted Journeys",
    title: "Group Tours",
    desc: "Curated departures that feel organised, comfortable, guided, and social.",
    gradient: "from-[#3457ca] to-[#1d4ed8]",
    glow: "bg-[#3457ca]/12",
  },
  {
    href: "/customized-tours",
    icon: Sparkles,
    tag: "Tailor Made",
    title: "Customized Tours",
    desc: "Bespoke itineraries shaped completely around your dates, pace, and interests.",
    gradient: "from-[#c99b2d] to-[#9a741c]",
    glow: "bg-[#c99b2d]/12",
  },
  {
    href: "/packages",
    icon: Compass,
    tag: "Ready Packages",
    title: "Tour Packages",
    desc: "Ready-to-enquire domestic and international packages with clear inclusions.",
    gradient: "from-[#2e9e6b] to-[#15803d]",
    glow: "bg-[#2e9e6b]/12",
  },
  {
    href: "/services",
    icon: Wrench,
    tag: "Full Support",
    title: "Travel Services",
    desc: "Flights, visa filing, forex, hotel bookings, and 24/7 journey coordination.",
    gradient: "from-[#6366f1] to-[#4338ca]",
    glow: "bg-[#6366f1]/12",
  },
];

const fallbackFaqs = [
  {
    q: "How do I book a tour package or customized trip?",
    a: "You can send us an online enquiry form through our website, message us directly on WhatsApp, or call our customer helpline. Our travel specialists will discuss your preferences, suggest curated itineraries, and guide you through the reservation process step by step.",
  },
  {
    q: "Do you offer fully customized private itineraries?",
    a: "Yes, absolutely! Alongside our escorted group departures, we specialize in tailor-made private tours. You choose your travel dates, preferred hotels, sightseeing pace, and transport preferences, and we design a bespoke day-by-day itinerary for you and your family.",
  },
  {
    q: "Which domestic and international destinations do you cover?",
    a: "We organize tours across India — including Chardham, Kashmir, Ladakh, Kerala, Andaman, Northeast, Goa, and Golden Triangle — as well as top international destinations such as Europe, Bali, Dubai, Singapore, Thailand, Maldives, Sri Lanka, and Vietnam.",
  },
  {
    q: "Can you arrange flight tickets, visa assistance, and forex?",
    a: "Yes. Yana Travels is a full-service travel partner. We assist with domestic and international air ticketing, visa consultation and document processing, foreign exchange (forex), and comprehensive travel insurance.",
  },
  {
    q: "What is typically included in your tour packages?",
    a: "Our packages generally include verified hotel accommodations, daily breakfast/meals, private AC vehicle transfers, airport assistance, and guided sightseeing. Package-specific inclusions and exclusions are clearly itemized before booking with zero hidden charges.",
  },
  {
    q: "What are your payment options and booking terms?",
    a: "We offer flexible payment terms. You can secure your booking with an initial token advance, followed by scheduled installments prior to departure. We accept bank transfers, UPI, credit/debit cards, and net banking with prompt GST invoices.",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "Cancellations are processed based on the supplier/airline terms and the date of notice prior to departure. Our team clearly explains the cancellation timeline during booking, and in case of unforeseen emergencies, we do our best to reschedule or offer credit notes where possible.",
  },
  {
    q: "Do you organize senior citizen and pilgrimage tours?",
    a: "Yes. We offer escorted pilgrimage journeys (such as Chardham Yatra by helicopter/road, South India Temple tours, and Varanasi-Ayodhya circuits) with dedicated care, slower pacing, comfortable stays, and medical/dietary assistance.",
  },
  {
    q: "Can we make changes to an ongoing tour?",
    a: "Our 24/7 on-trip concierge team is always available to assist with adjustments like extending hotel stays, adding optional excursions, or rearranging pickup schedules, subject to availability.",
  },
  {
    q: "How do I get in touch for urgent travel support?",
    a: "Our helpline and direct WhatsApp desk are active 24/7. Once your tour is confirmed, you will also be assigned a dedicated tour coordinator who tracks your journey and assists you throughout.",
  },
];

export function HomePage() {
  const [featured, setFeatured] = useState<PackageListItem[]>([]);
  const [sample, setSample] = useState(false);
  const [faqs, setFaqs] = useState<PublicFaq[]>([]);
  const [selectedScope, setSelectedScope] = useState<"all" | "domestic" | "international">("all");
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false);
  const browseDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        browseDropdownRef.current &&
        !browseDropdownRef.current.contains(event.target as Node)
      ) {
        setBrowseDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    api
      .listPublicFaqs()
      .then((items) => {
        if (!cancelled) setFaqs(items);
      })
      .catch(() => {
        if (!cancelled) setFaqs([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayedFeatured = useMemo(() => {
    if (selectedScope === "all") return featured.slice(0, 8);
    const filtered = featured.filter((p) => p.scope === selectedScope);
    return filtered.length > 0 ? filtered.slice(0, 8) : featured.slice(0, 8);
  }, [featured, selectedScope]);

  const faqItems =
    faqs.length > 0
      ? faqs.map((f) => ({ q: f.question, a: f.answer }))
      : fallbackFaqs;
  return (
    <>
      <div className="px-0 pt-0">
        <section className="relative min-h-[100svh] overflow-hidden rounded-none border-0 bg-[linear-gradient(135deg,rgba(255,253,248,0.12),rgba(247,241,228,0.08))] shadow-[0_34px_80px_-42px_rgba(16,33,58,0.34)]">
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
            <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-4">
              <div className="flex min-w-0 items-center gap-4">
                <Link
                  to="/"
                  aria-label="Yana Travels home"
                  className="group flex shrink-0 items-center gap-3 rounded-full"
                >
                  <span className="flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-[1.04] sm:h-18 sm:w-18">
                    <img
                      src="/brand/yana-logo-white.png"
                      alt="Yana Travels"
                      className="h-14 w-auto object-contain sm:h-[3.6rem]"
                    />
                  </span>
                  <BrandWordmark
                    className="hidden drop-shadow-[0_10px_24px_rgba(0,0,0,0.48)] sm:flex"
                    accentClassName="text-white/88"
                    textClassName="text-white"
                  />
                </Link>

                <div className="w-56 sm:w-72 md:w-80">
                  <HeroSearch />
                </div>
              </div>

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

            <div className="grid flex-1 w-full items-end gap-6 pt-8 pb-2 sm:pb-3 lg:grid-cols-12 lg:gap-8 lg:pt-10 lg:pb-4">
              <div className="self-end lg:col-span-8">
                <div className="max-w-4xl pl-2 pb-1 sm:pl-4 sm:p-2 sm:pb-2">
                  <h1 className="animate-rise font-display text-2xl font-semibold leading-[1.18] tracking-[-0.03em] text-yellow-400 drop-shadow-[0_18px_34px_rgba(0,0,0,0.65)] sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.9rem]">
                    <span className="block sm:whitespace-nowrap">Traveling - it leaves you speechless,</span>
                    <span className="block text-yellow-400 sm:whitespace-nowrap">
                      then turns you into a story teller.
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex justify-start self-end lg:col-span-4 lg:justify-end">
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
          className="pointer-events-none absolute -left-10 top-12 h-96 w-96 rounded-full bg-[#dfe9f8]/60 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-[#e6d39d]/30 blur-3xl"
          aria-hidden
        />
        <Reveal>
          <div className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-[#ad7f19]">How you travel</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#10213a] md:text-4xl">
                Travel styles with a clearer premium identity
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#6c7788]">
              Whether you prefer escorted group departures or bespoke private itineraries, choose the travel format crafted for your journey.
            </p>
          </div>
        </Reveal>
        <div className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ href, icon: Icon, tag, title, desc, gradient, glow }, i) => (
            <Reveal key={href} delay={i * 90}>
              <Link
                to={href}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.8rem] border border-white/90 bg-white/85 p-6 shadow-[0_14px_38px_-16px_rgba(16,33,58,0.1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2.5 hover:border-[#3457ca]/30 hover:bg-white hover:shadow-[0_28px_56px_-16px_rgba(52,87,202,0.22)]"
              >
                {/* Decorative top accent glow line */}
                <span
                  className="absolute inset-x-8 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#3457ca]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                {/* Ambient background glow */}
                <span
                  className={`pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full ${glow} blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`}
                  aria-hidden
                />

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className={`flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} p-3 text-white shadow-[0_10px_24px_-6px_rgba(16,33,58,0.35)] ring-4 ring-black/5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_14px_28px_-6px_rgba(52,87,202,0.45)]`}>
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:rotate-6" aria-hidden />
                    </div>
                    <span className="rounded-full border border-[#e8decb]/80 bg-[#fffdf8] px-3 py-1 text-[11px] font-bold tracking-wide text-[#6c7788] transition-colors group-hover:border-[#3457ca]/30 group-hover:text-[#3457ca]">
                      {tag}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-xl font-bold tracking-tight text-[#10213a] transition-colors duration-200 group-hover:text-[#3457ca]">
                    {title}
                  </h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-[#6c7788]">
                    {desc}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-[#f0e8d8] pt-4">
                  <span className="text-xs font-semibold text-[#6c7788] transition-colors group-hover:text-[#3457ca]">
                    Explore Style
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e8decb] bg-[#fffdf8] text-[#10213a] shadow-sm transition-all duration-300 group-hover:bg-[#3457ca] group-hover:border-[#3457ca] group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
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
              <p className="eyebrow text-[#ad7f19]">Why choose Yana</p>
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
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-semibold text-white shadow-[0_18px_30px_-18px_rgba(52,87,202,0.8)] transition-all duration-300 hover:-translate-y-0.5"
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
                <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-deep md:text-4xl">
                  Packages that now feel more premium at first glance
                </h2>
              </div>

              {/* Action Controls: Domestic/International Filter Pills + Advanced Dropdown */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Segmented Filter Pills (All / Domestic / International) */}
                <div className="inline-flex items-center rounded-full border border-[#e8decb] bg-white p-1 shadow-sm backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setSelectedScope("all")}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                      selectedScope === "all"
                        ? "bg-primary text-white shadow-[0_8px_18px_-6px_rgba(52,87,202,0.6)]"
                        : "text-text-secondary hover:text-deep",
                    )}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedScope("domestic")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                      selectedScope === "domestic"
                        ? "bg-primary text-white shadow-[0_8px_18px_-6px_rgba(52,87,202,0.6)]"
                        : "text-text-secondary hover:text-deep",
                    )}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    Domestic
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedScope("international")}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                      selectedScope === "international"
                        ? "bg-primary text-white shadow-[0_8px_18px_-6px_rgba(52,87,202,0.6)]"
                        : "text-text-secondary hover:text-deep",
                    )}
                  >
                    <Globe2 className="h-3.5 w-3.5" />
                    International
                  </button>
                </div>

                {/* Advanced Browse Dropdown Menu */}
                <div ref={browseDropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setBrowseDropdownOpen((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-gradient-to-r from-primary to-[#2a48b8] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_22px_-8px_rgba(52,87,202,0.55)] transition-all duration-200 hover:shadow-[0_14px_28px_-8px_rgba(52,87,202,0.7)] hover:scale-[1.02] focus:outline-none sm:text-sm"
                    aria-expanded={browseDropdownOpen}
                  >
                    <span>Browse Packages</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-white/90 transition-transform duration-200",
                        browseDropdownOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {browseDropdownOpen && (
                    <div className="absolute right-0 top-full z-40 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-border-soft bg-white/98 p-2 shadow-[0_26px_56px_-18px_rgba(16,33,58,0.32)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#ad7f19]">
                        Explore Destinations
                      </div>

                      <Link
                        to="/packages?scope=domestic"
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lavender"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-deep transition-colors group-hover:text-primary">
                            Domestic Tours
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            India & Himalayan Journeys
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/packages?scope=international"
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lavender"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Globe2 className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-deep transition-colors group-hover:text-primary">
                            International Tours
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            Europe, Bali, Dubai & Beyond
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/group-tours"
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lavender"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Users2 className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-deep transition-colors group-hover:text-primary">
                            Group Departures
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            Escorted Social Departures
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/customized-tours"
                        onClick={() => setBrowseDropdownOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-lavender"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-deep transition-colors group-hover:text-primary">
                            Customized Packages
                          </div>
                          <div className="text-[11px] text-text-secondary">
                            Tailor-Made Private Trips
                          </div>
                        </div>
                      </Link>

                      <div className="mt-1 border-t border-border-soft/60 pt-1">
                        <Link
                          to="/packages"
                          onClick={() => setBrowseDropdownOpen(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/8"
                        >
                          <span>View All Packages</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
          {sample ? <SampleDataBanner /> : null}
          <PackageGrid items={displayedFeatured} columns={4} />
        </Section>
      ) : null}

      <Section>
        <HowItWorks />
      </Section>

      <DestinationMarquee />

      <Section tone="soft">
        <ValueProps />
      </Section>

      <TestimonialsSection />

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
            <Faq items={faqItems} />
          </div>
        </Reveal>
      </Section>

      <GallerySection />

      <EnquiryCta />
    </>
  );
}
