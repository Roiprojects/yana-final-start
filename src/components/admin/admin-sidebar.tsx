
import { Link, useLocation } from "react-router-dom";
import { adminNav } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Admin"
      className="flex h-full flex-col gap-6 overflow-y-auto p-4"
    >
      <Link to="/admin" className="px-2 py-1">
        <span className="font-heading text-lg font-extrabold text-white">
          Yana Admin
        </span>
      </Link>

      {adminNav.map((group) => (
        <div key={group.heading}>
          <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
            {group.heading}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-white/15 font-semibold text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
