import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "Brochure & PDFs" };

export default function Page() {
  return (
    <ModuleScaffold
      title="Brochure & PDFs"
      description="Upload and manage the brochure and package PDFs."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
