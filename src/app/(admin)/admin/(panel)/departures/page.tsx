import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Departures" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Departures"
      description="Manage departure dates and seats for packages."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
