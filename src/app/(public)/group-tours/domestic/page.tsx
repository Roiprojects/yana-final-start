import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { FilteredPackages } from "@/components/tours/filtered-packages";

export const metadata: Metadata = {
  title: "Domestic Group Tours",
  description: "Escorted group tour departures to destinations across India.",
};

export default function DomesticGroupToursPage() {
  return (
    <>
      <PageHeader
        title="Domestic Group Tours"
        subtitle="Escorted group departures to destinations across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Group Tours", href: "/group-tours" },
          { label: "Domestic" },
        ]}
      />
      <FilteredPackages filters={{ scope: "domestic", tourType: "group" }} />
    </>
  );
}
