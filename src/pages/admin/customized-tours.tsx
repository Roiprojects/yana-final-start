import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminCustomizedToursPage() {
  return (
    <ModuleScaffold
      title="Customized Tours"
      description="Manage customized tour listings and copy."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
