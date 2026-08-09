import type { Metadata } from "next";
import { Briefcase, Sparkles, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";
import { listPublicServices } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Travel services by Yana Travels — bike trips, honeymoon and pilgrimage packages, MICE, cruises, flight booking, visa, forex, and hotel booking.",
};
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const dbServices = await listPublicServices();

  const services = dbServices.length > 0 ? dbServices : [
    { id: "1", name: "Domestic Packages", description: "Tours across India, planned end to end." },
    { id: "2", name: "International Packages", description: "Journeys to destinations around the world." },
    { id: "3", name: "Bike Trips", description: "Guided motorcycle journeys along scenic routes." },
    { id: "4", name: "Honeymoon Packages", description: "Romantic getaways planned for two." },
    { id: "5", name: "Historic Destinations", description: "Tours built around heritage and culture." },
    { id: "6", name: "Pilgrimage Packages", description: "Spiritual journeys to revered destinations." },
    { id: "7", name: "MICE", description: "Meetings, incentives, conferences, and events." },
    { id: "8", name: "Flight Booking", description: "Assistance booking domestic and international flights." },
    { id: "9", name: "Visa", description: "Support with visa applications and documentation." },
    { id: "10", name: "Forex", description: "Foreign currency exchange for your trip." },
    { id: "11", name: "Hotel Booking", description: "Accommodation arranged to suit your stay." },
  ];

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Everything you need for a seamless journey, presented with a more premium and attractive experience."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="photo-1469474968028-56623f02e42e"
      />

      <Section>
        <Reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#ad7f19]">What we offer</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
                From the first enquiry to the last mile of the journey
              </h2>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                Beyond full tour planning, Yana can coordinate the individual parts of your travel as well, so the trip feels smoother, more organized, and more premium from start to finish.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-[#eadfcf] bg-[linear-gradient(135deg,#fffefb,#f7f1e4)] p-6 shadow-[0_22px_52px_-34px_rgba(16,33,58,0.24)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-white shadow-[0_16px_30px_-18px_rgba(23,63,107,0.8)]">
                <Sparkles className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-sm leading-7 text-text-secondary">
                The service layer now reads as a premium concierge offering instead of a plain list, with stronger content blocks and better focus on convenience.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 90}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-[#eadfcf] bg-white p-6 shadow-[0_20px_46px_-30px_rgba(16,33,58,0.26)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(16,33,58,0.34)]">
                <span className="hairline absolute inset-x-6 top-0 h-px" aria-hidden />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[1.15rem] bg-[#f8f2e3] text-primary ring-1 ring-[#eadfcf] transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Briefcase className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-bold tracking-[-0.02em] text-deep">{item.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <EnquiryCta />
    </>
  );
}
