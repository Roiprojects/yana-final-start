import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, Phone, Search } from "lucide-react";
import { primaryNav, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";
import { useSiteSettings } from "@/components/providers/site-settings-context";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openEnquiry } = useEnquiryModal();
  const { phone, whatsapp } = useSiteSettings();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const revealOffset = isHome
        ? Math.max(window.innerHeight * 0.72, 420)
        : 18;
      setScrolled(window.scrollY > revealOffset);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
        isHome && !scrolled && "pointer-events-none -translate-y-4 opacity-0",
        "bg-[#0b66e4]/96 backdrop-blur-md shadow-[0_12px_32px_-18px_rgba(11,102,228,0.45)] border-b border-white/15 text-white",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-site)] items-center justify-between gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            to="/"
            aria-label="Yana Travels home"
            className="group flex items-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="/brand/yana-logo-header.png?v=2"
              alt="Yana Travels"
              className="h-10 w-auto max-w-[170px] object-contain sm:h-12 sm:max-w-[210px] md:h-14 md:max-w-[230px]"
            />
          </Link>
          <SearchBar dark={true} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink key={item.href} item={item} dark={true} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-[#0b66e4] xl:inline-flex"
          >
            <Phone
              className="h-4 w-4 text-[#fcd34d]"
              aria-hidden
            />
            {phone}
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/15 p-2.5 text-white shadow-sm transition-colors hover:bg-white/25 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/15 bg-[#0952b7] text-white shadow-[0_24px_48px_-24px_rgba(11,102,228,0.5)] lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {primaryNav.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  to={item.href}
                  className="block rounded-xl px-2 py-2 font-medium text-white hover:bg-white/15"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/20 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="rounded-lg px-2 py-1.5 text-sm text-white/80 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#0b66e4] shadow-md hover:bg-[#f8faff]"
                onClick={() => {
                  setMobileOpen(false);
                  openEnquiry();
                }}
              >
                Enquire now
              </button>
              <a
                href={whatsappLink(undefined, whatsapp)}
                className="flex-1 rounded-full border border-white/30 bg-[#25d366] px-5 py-2.5 text-center text-sm font-semibold text-white shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function SearchBar({ dark }: { dark: boolean }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    navigate(q ? `/packages?q=${encodeURIComponent(q)}` : "/packages");
  }

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn(
        "hidden items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors sm:flex",
        dark
          ? "border-white/30 bg-white/15 text-white focus-within:bg-white/25"
          : "border-border-soft bg-white/90 text-text-main shadow-sm focus-within:border-primary",
      )}
    >
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search packages…"
        aria-label="Search packages"
        className={cn(
          "w-28 bg-transparent text-xs outline-none sm:text-sm lg:w-40",
          dark
            ? "text-white placeholder-white/70 [&::-webkit-search-cancel-button]:hidden"
            : "text-text-main placeholder-text-secondary/60",
        )}
      />
      <button
        type="submit"
        aria-label="Search packages"
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200",
          dark
            ? "bg-white/20 text-white hover:bg-white/35 hover:scale-105"
            : "bg-primary/10 text-primary hover:bg-primary hover:text-white",
        )}
      >
        <Search className="h-3.5 w-3.5" aria-hidden />
      </button>
    </form>
  );
}

function NavLink({
  item,
  dark,
}: {
  item: (typeof primaryNav)[number];
  dark?: boolean;
}) {
  const linkClass = dark
    ? "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/15 hover:text-white"
    : "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-text-main transition-colors duration-200 hover:bg-[#f8f3e8] hover:text-primary";

  if (!item.children) {
    return (
      <Link to={item.href} className={linkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link to={item.href} className={linkClass}>
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </Link>
      <div className="invisible absolute left-0 top-full min-w-56 rounded-[1.4rem] border border-border-soft bg-white/98 p-1.5 opacity-0 shadow-[0_28px_60px_-26px_rgba(16,33,58,0.34)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {item.children.map((child) => (
          <Link
            key={child.href}
            to={child.href}
            className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-[#f8f3e8] hover:text-primary"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
