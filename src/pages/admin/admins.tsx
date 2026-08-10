import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminAdminsPage() {
  return (
    <ModuleScaffold
      title="Administrators"
      description="Manage admin accounts and roles."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
