import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Yana Travels collects and uses the information you share when you enquire or book a tour.",
};

const sections: { title: string; items: string[] }[] = [
  {
    title: "Information we collect",
    items: [
      "Details you submit through our enquiry and contact forms — your name, phone number, email address, and the trip details you choose to share.",
      "For confirmed bookings, the documents required to arrange your travel — such as a copy of your Voter ID, Aadhaar Card, or Passport.",
    ],
  },
  {
    title: "How we use your information",
    items: [
      "To respond to your enquiry and help plan your tour.",
      "To make and manage your booking — flights, stays, transport, sightseeing, and documentation.",
      "To contact you before and during your journey with updates related to your trip.",
    ],
  },
  {
    title: "How we share it",
    items: [
      "We share your information only with the partners needed to fulfil your booking — for example airlines, hotels, transport operators, and visa/documentation services.",
      "We do not sell your personal information.",
    ],
  },
  {
    title: "Your choices",
    items: [
      `To access, update, or remove the information you have shared with us, email ${siteConfig.email} or call ${siteConfig.phone}.`,
      "We keep your booking information only as long as needed to provide your travel services and meet legal requirements.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How we handle the information you share with us."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        image="photo-1501785888041-af3ef285b470"
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="rounded-xl border border-border-soft bg-bg-soft p-4 text-sm text-text-secondary">
            This notice explains what information Yana Travels collects when you
            enquire or book, and how we use it. For our booking and cancellation
            terms, please see our{" "}
            <a href="/terms" className="font-semibold text-primary hover:underline">
              Terms &amp; Conditions
            </a>
            .
          </p>
          {sections.map((sec, i) => (
            <Reveal key={sec.title} delay={i * 50}>
              <section className="rounded-2xl border border-border-soft bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">{sec.title}</h2>
                <ul className="space-y-2.5">
                  {sec.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
