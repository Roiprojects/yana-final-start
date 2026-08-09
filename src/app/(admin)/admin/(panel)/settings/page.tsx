import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Website Settings" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Website Settings"
      description="Manage logo, socials, WhatsApp, and toggles."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
