import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminGroupToursPage() {
  return (
    <ModuleScaffold
      title="Group Tours"
      description="Manage group tours, including kitchen-staff departures."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
