import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

// Sourced from the Yana Travels New Brochure 2025.
const sections: { title: string; items: string[] }[] = [
  {
    title: "Booking & Payment",
    items: [
      "For bookings, fill in our registration form and send it to us along with a copy of your Voter ID / Aadhaar Card / Passport.",
      "100% of the balance payment must be made in advance, as per the time limit given at the time of confirmation — i.e. before 45 days.",
      "GST is extra on the total tour cost for domestic tour packages. GST & TCS are extra on the total tour cost for international tour packages.",
      "Package cost does not cover all expenses of the tour. Before booking, please ensure what is included and excluded in the package cost — no discussion will be entertained after booking.",
    ],
  },
  {
    title: "Cancellation & Refunds",
    items: [
      "Requests for cancellation must be sent to us by email.",
      "Once the advance amount is paid, it will not be refunded under any circumstances.",
      "Domestic tours: before 15–21 days — 50% refund; before 14 days — no refund.",
      "International tours: before 31–45 days — 50% refund; before 30 days — no refund.",
      "Flight refundable amounts depend on the airline. For helicopter services (Amarnath, Vaishno Devi, Kedarnath) cancelled due to weather/technical reasons, refunds are as made by the helicopter companies, returned to you once we receive the money.",
      "We reserve the right to cancel a tour if the minimum number of paid seats is not met; you will be informed 10 days before departure and offered an alternate tour or a full refund. Air/AC-train cancellation charges on tickets you booked will be deducted from the refund.",
    ],
  },
  {
    title: "Charges for Children",
    items: [
      "Below 9 years: charges depend on the destination policy.",
      "9 years and above: adult charges are applicable.",
    ],
  },
  {
    title: "Accommodation",
    items: [
      "Hotels / resorts are booked to your choice (2★ / 3★ / 4★ / 5★), on twin- or triple-sharing basis with a meal plan.",
      "For a family of three, a triple-bedded room is provided subject to availability, otherwise an extra rollaway bed. A separate/single room is 35% extra on the tour cost.",
      "Room check-in and check-out times depend on hotel rules; we will update you before departure.",
    ],
  },
  {
    title: "Transport",
    items: [
      "Most tours are by 2+2 AC Deluxe bus. Hill stations, the North-East and some hilly areas use tempo travellers, mini buses or Sumo-type vehicles. Smaller groups may be arranged in a mini bus or tempo traveller.",
      "AC-class / flight tickets are arranged subject to availability if requested in writing well in advance; extra cost applies.",
      "You must travel in the berth / seat allotted by Indian Railways. Passengers with waiting-list or RAC tickets must make their own arrangements.",
    ],
  },
  {
    title: "Food & Guides",
    items: [
      "During group tours, fixed-menu pure-vegetarian South Indian food is provided. During train journeys, guests make their own arrangements.",
      "An expert tour manager accompanies you throughout the journey; local guides are appointed at historical and pilgrimage places subject to requirement and availability.",
    ],
  },
  {
    title: "Documents & Guests",
    items: [
      "All tourists must carry original ID cards (Voter ID, Aadhaar, Senior Citizen card, Passport, DL) throughout the journey.",
      "Senior citizens (aged 60+) must be accompanied by a family member or close relative for their safety and convenience.",
    ],
  },
  {
    title: "Itinerary Changes & Force Majeure",
    items: [
      "Tour timing and itinerary are subject to change and may be revised at any time, with or without notice, depending on the circumstances. We will inform you of amendments before or during the tour.",
      "If a tour is discontinued due to reasons such as war, riot, bandh, lockdown, epidemic/pandemic, or natural calamities (cyclone, earthquake, landslide, snowfall, road/bridge damage, flood), missed train/flight connections, or closure of darshan/sightseeing, the tourist bears the losses; Yana Travels does not compensate for the same.",
      "Entry fees, mineral water, daily-use medicines, taxi, boating, coolie, cable/doli/pony charges, camera charges and food during train journeys are to be borne by the passengers.",
    ],
  },
];

export function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="Our booking, payment, cancellation and tour-operation terms."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms & Conditions" },
        ]}
        image="photo-1469474968028-56623f02e42e"
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="rounded-xl border border-border-soft bg-bg-soft p-4 text-sm text-text-secondary">
            These terms are taken from the Yana Travels brochure. Specific
            prices, dates and charges are confirmed at the time of booking.
          </p>
          {sections.map((sec, i) => (
            <Reveal key={sec.title} delay={i * 50}>
              <section className="rounded-2xl border border-border-soft bg-white p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-3 text-xl font-bold">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  {sec.title}
                </h2>
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
