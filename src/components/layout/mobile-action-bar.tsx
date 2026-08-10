
import { Link, useLocation } from "react-router-dom";
import { Compass, House, PackageOpen, Send } from "lucide-react";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";
import { cn } from "@/lib/utils";

const appNav = [
  { label: "Home", href: "/", icon: House },
  { label: "Packages", href: "/packages", icon: PackageOpen },
  { label: "Services", href: "/services", icon: Compass },
] as const;

export function MobileActionBar() {
  const { open: openEnquiry } = useEnquiryModal();
  const { pathname } = useLocation();

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      <nav
        aria-label="Mobile app navigation"
        className="mx-auto grid min-h-[4.25rem] grid-cols-4 gap-1 rounded-[1.45rem] border border-white/80 bg-white/92 px-2 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_22px_55px_-24px_rgba(16,33,58,0.48)] backdrop-blur-xl"
      >
        {appNav.map(({ label, href, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-bold transition-all",
                active
                  ? "bg-[#f8edc9] text-primary"
                  : "text-text-secondary hover:text-primary",
              )}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={active ? 2.5 : 2}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => openEnquiry()}
          className="flex min-w-0 flex-col items-center gap-1 rounded-xl bg-[linear-gradient(145deg,#2a9bea,#075eac)] px-1 py-1.5 text-[10px] font-bold text-white shadow-[0_10px_22px_-12px_rgba(23,63,107,0.9)]"
        >
          <Send className="h-5 w-5" aria-hidden />
          <span>Enquire</span>
        </button>
      </nav>
    </div>
  );
}
