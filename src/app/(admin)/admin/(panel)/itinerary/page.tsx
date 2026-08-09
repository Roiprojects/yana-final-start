import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Itineraries" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Itineraries"
      description="Manage day-wise itineraries for packages."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
