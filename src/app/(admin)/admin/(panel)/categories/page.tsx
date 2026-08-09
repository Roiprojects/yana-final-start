import type { Metadata } from "next";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { listAdminPackages } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Categories & Types" };
export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const packages = await listAdminPackages();

  const categories = [
    { name: "Group Tours (Domestic)", count: packages.filter(p => p.tour_type === "group" && p.scope === "domestic").length, href: "/admin/packages" },
    { name: "Group Tours (International)", count: packages.filter(p => p.tour_type === "group" && p.scope === "international").length, href: "/admin/packages" },
    { name: "Customized Tours (Domestic)", count: packages.filter(p => p.tour_type === "customized" && p.scope === "domestic").length, href: "/admin/packages" },
    { name: "Customized Tours (International)", count: packages.filter(p => p.tour_type === "customized" && p.scope === "international").length, href: "/admin/packages" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0c1e36]">Categories & Tour Types</h1>
        <p className="mt-1 text-sm text-slate-500">Overview of active package categories across domestic & international scopes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{cat.name}</h2>
                <p className="text-xs text-slate-500">{cat.count} packages published</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
