import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminAboutPage() {
  return (
    <ModuleScaffold
      title="About Us"
      description="Edit the company story, mission, and images."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
