import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Package, CheckCircle2, Star } from "lucide-react";
import { enquiryCounts, packageCounts } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [enq, pkg] = await Promise.all([enquiryCounts(), packageCounts()]);

  const kpis = [
    { label: "New enquiries", value: enq.new, icon: Inbox, href: "/admin/enquiries" },
    { label: "Total enquiries", value: enq.total, icon: CheckCircle2, href: "/admin/enquiries" },
    { label: "Published packages", value: pkg.published, icon: Package, href: "/admin/packages" },
    { label: "Featured packages", value: pkg.featured, icon: Star, href: "/admin/packages" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Overview of your website content and leads.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-border-soft bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 w-fit rounded-full bg-bg-soft p-2.5">
              <Icon className="h-5 w-5 text-primary" aria-hidden />
            </div>
            <p className="font-heading text-3xl font-extrabold">{value}</p>
            <p className="text-sm text-text-secondary">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/enquiries"
          className="rounded-xl border border-border-soft bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="font-bold">Manage enquiries</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {enq.new} new · {enq.contacted} contacted · {enq.closed} closed
          </p>
        </Link>
        <Link
          href="/admin/packages"
          className="rounded-xl border border-border-soft bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="font-bold">Manage packages</h2>
          <p className="mt-1 text-sm text-text-secondary">
            {pkg.total} total · {pkg.published} live · {pkg.featured} featured
          </p>
        </Link>
      </div>
    </div>
  );
}
