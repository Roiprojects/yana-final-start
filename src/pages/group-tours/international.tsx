import { PageHeader } from "@/components/ui/page-header";
import { FilteredPackages } from "@/components/tours/filtered-packages";

export function InternationalGroupToursPage() {
  return (
    <>
      <PageHeader
        title="International Group Tours"
        subtitle="Escorted group departures to destinations around the world."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Group Tours", href: "/group-tours" },
          { label: "International" },
        ]}
      />
      <FilteredPackages
        filters={{ scope: "international", tourType: "group" }}
      />
    </>
  );
}
