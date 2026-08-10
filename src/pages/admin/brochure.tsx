import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminBrochurePage() {
  return (
    <ModuleScaffold
      title="Brochure & PDFs"
      description="Upload and manage the brochure and package PDFs."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
