import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "About Us" };

export default function Page() {
  return (
    <ModuleScaffold
      title="About Us"
      description="Edit the company story, mission, and images."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
