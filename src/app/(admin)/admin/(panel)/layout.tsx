import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

/**
 * Admin panel chrome (sidebar + topbar).
 * AUTH: /admin/* is gated in proxy.ts by a signed session cookie; unauthenticated
 * requests are redirected to /admin/login.
 */
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-soft">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-deep lg:block">
        <AdminSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-border-soft bg-white px-4 lg:px-6">
          <p className="text-sm font-semibold text-text-secondary lg:hidden">
            Yana Admin
          </p>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
