import type { Metadata } from "next";
import {
  ModuleScaffold,
  STANDARD_CAPABILITIES,
} from "@/components/admin/module-scaffold";

export const metadata: Metadata = { title: "SEO" };

export default function Page() {
  return (
    <ModuleScaffold
      title="SEO"
      description="Manage per-page SEO metadata."
      addLabel="Add new"
      capabilities={STANDARD_CAPABILITIES}
    />
  );
}
