import { PageHeader } from "@/components/ui/page-header";
import { FilteredPackages } from "@/components/tours/filtered-packages";

export function InternationalCustomizedToursPage() {
  return (
    <>
      <PageHeader
        title="International Tours"
        subtitle="Explore our journeys abroad — each one can be tailored around your preferences and budget."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Customized Tours", href: "/customized-tours" },
          { label: "International" },
        ]}
        image="photo-1502602898657-3e91760cbb34"
      />
      <FilteredPackages
        filters={{ scope: "international" }}
        emptyTitle="Let's build your trip"
        emptyDescription="International itineraries can be planned per enquiry. Share your plans and we'll design a tailored proposal."
      />
    </>
  );
}
