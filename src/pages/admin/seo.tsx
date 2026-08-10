import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminSeoPage() {
  return (
    <ModuleScaffold
      title="SEO"
      description="Manage per-page SEO metadata."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
