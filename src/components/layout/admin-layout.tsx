import { Link, Outlet } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";

/**
 * Admin panel chrome (sidebar + topbar). The /admin/* routes are wrapped in
 * RequireAdmin which checks the signed session cookie before rendering.
 */
export function AdminLayout() {
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
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
