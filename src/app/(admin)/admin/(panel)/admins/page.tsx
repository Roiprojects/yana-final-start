import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Administrators" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Administrators"
      description="Manage admin accounts and roles."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
