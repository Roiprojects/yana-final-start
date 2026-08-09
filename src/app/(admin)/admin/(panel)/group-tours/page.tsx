import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Group Tours" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Group Tours"
      description="Manage group tours, including kitchen-staff departures."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
