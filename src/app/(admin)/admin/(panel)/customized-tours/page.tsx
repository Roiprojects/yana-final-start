import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Customized Tours" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Customized Tours"
      description="Manage customized tour listings and copy."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
