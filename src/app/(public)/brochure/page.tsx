import type { Metadata } from "next";
import { FileDown, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryCta } from "@/components/marketing/enquiry-cta";
import { listPackages } from "@/lib/data/packages";

export const metadata: Metadata = {
  title: "Brochure & Itineraries",
  description:
    "Download detailed Yana Travels tour itineraries and trip documents as PDFs.",
};

function duration(d: number | null, n: number | null): string | null {
  if (d == null && n == null) return null;
  if (d != null && n != null) return `${n}N / ${d}D`;
  return d != null ? `${d} days` : `${n} nights`;
}

export default async function BrochurePage() {
  const { items } = await listPackages();

  return (
    <>
      <PageHeader
        title="Brochure & Itineraries"
        subtitle="Download detailed day-by-day itineraries and trip documents."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Brochure" }]}
        image="photo-1477587458883-47145ed94245"
      />
      <Section>
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow text-gold">Trip documents</p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Detailed itineraries, ready to download
            </h2>
            <p className="mt-4 text-text-secondary">
              Every tour comes with a detailed PDF — day-by-day plan,
              inclusions, exclusions, and pricing. Download the ones you love,
              or reach out for our full brochure.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => {
            const dur = duration(p.duration_days, p.duration_nights);
            return (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <a
                  href={`/itineraries/${p.slug}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border-soft bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
                >
                  <div className="rounded-xl bg-lavender p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <FileDown className="h-6 w-6" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-text-main group-hover:text-primary">
                      {p.title}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-secondary">
                      {p.destination_name && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {p.destination_name}
                        </span>
                      )}
                      {dur && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {dur}
                        </span>
                      )}
                    </div>
                    <span className="mt-3 inline-block text-xs font-semibold text-primary">
                      Download PDF →
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Section>
      <EnquiryCta />
    </>
  );
}
