import { ModuleScaffold } from "@/components/admin/module-scaffold";
import { STANDARD_CAPABILITIES } from "@/lib/admin-constants";

export function AdminSettingsPage() {
  return (
    <ModuleScaffold
      title="Website Settings"
      description="Manage logo, socials, WhatsApp, and toggles."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
