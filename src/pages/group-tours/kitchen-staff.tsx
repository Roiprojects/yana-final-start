import { PageHeader } from "@/components/ui/page-header";
import { FilteredPackages } from "@/components/tours/filtered-packages";

export function KitchenStaffToursPage() {
  return (
    <>
      <PageHeader
        title="Group Tours with Kitchen Staff"
        subtitle="Home-style meals prepared by travelling kitchen staff throughout your journey."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Group Tours", href: "/group-tours" },
          { label: "With Kitchen Staff" },
        ]}
      />
      {/* Offering details (which tours, what's included) NEEDS CLIENT CONFIRMATION. */}
      <FilteredPackages
        filters={{ tourType: "group", groupSubtype: "kitchen_staff" }}
        emptyTitle="Kitchen-staff tours coming soon"
        emptyDescription="Details of these specialised group departures will be published from the admin panel once confirmed."
      />
    </>
  );
}
