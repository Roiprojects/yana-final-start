import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminDeparturesPage() {
  return (
    <ModuleScaffold
      title="Departures"
      description="Manage departure dates and seats for packages."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
