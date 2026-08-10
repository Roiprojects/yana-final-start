import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminItineraryPage() {
  return (
    <ModuleScaffold
      title="Itineraries"
      description="Manage day-wise itineraries for packages."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
