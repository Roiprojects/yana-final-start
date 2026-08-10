import { PageHeader } from "@/components/ui/page-header";
import { FilteredPackages } from "@/components/tours/filtered-packages";

export function DomesticCustomizedToursPage() {
  return (
    <>
      <PageHeader
        title="Domestic Tours"
        subtitle="Explore our tours across India — each one can be tailored around your dates and interests."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Customized Tours", href: "/customized-tours" },
          { label: "Domestic" },
        ]}
        image="photo-1524492412937-b28074a5d7da"
      />
      <FilteredPackages
        filters={{ scope: "domestic" }}
        emptyTitle="Let's build your trip"
        emptyDescription="Domestic itineraries can be planned per enquiry. Share your plans and we'll design a tailored proposal."
      />
    </>
  );
}
