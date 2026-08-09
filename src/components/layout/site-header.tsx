"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { primaryNav, siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-provider";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openEnquiry } = useEnquiryModal();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const revealOffset = isHome ? Math.max(window.innerHeight * 0.72, 420) : 18;
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
        scrolled
          ? "bg-white/94 shadow-[0_18px_44px_-28px_rgba(16,33,58,0.36)] backdrop-blur-xl"
          : "bg-white/72 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-site)] items-center justify-between gap-3 px-4 sm:h-22 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Yana Travels home"
          className="group flex shrink-0 items-center gap-3 rounded-full px-1 py-1"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[linear-gradient(145deg,#2a9bea,#075eac)] shadow-[0_18px_34px_-18px_rgba(23,63,107,0.85)] ring-2 ring-[#f5d779]/75 transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16 sm:rounded-[1.15rem]">
            <Image
              src="/brand/yana-logo.png"
              alt="Yana Travels"
              width={124}
              height={80}
              priority
              className="h-9 w-auto object-contain brightness-125 contrast-125 saturate-125 drop-shadow-[0_3px_8px_rgba(255,255,255,0.28)] sm:h-12"
            />
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="font-heading text-[1.3rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-deep">
              Yana
            </span>
            <span className="font-heading text-[1.3rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-deep">
              Travels
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full border border-border-soft bg-white/80 px-3 py-2 text-sm font-semibold text-text-main shadow-sm transition-colors hover:text-primary xl:inline-flex"
          >
            <Phone className="h-4 w-4 text-primary" aria-hidden />
            {siteConfig.phone}
          </a>
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="hidden rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(23,63,107,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:inline-block"
          >
            Plan your trip
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border-soft bg-white/85 p-2.5 text-deep shadow-sm transition-colors hover:text-primary lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border-soft bg-white/96 shadow-[0_24px_48px_-24px_rgba(16,33,58,0.28)] lg:hidden">
          <div className="flex flex-col gap-1 p-4">
            {primaryNav.map((item) => (
              <div key={item.href} className="py-1">
                <Link
                  href={item.href}
                  className="block rounded-xl px-2 py-2 font-medium text-text-main"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-border-soft pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-lg px-2 py-1.5 text-sm text-text-secondary hover:text-primary"
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
                className="flex-1 rounded-full bg-cta px-5 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => {
                  setMobileOpen(false);
                  openEnquiry();
                }}
              >
                Enquire now
              </button>
              <a
                href={whatsappLink()}
                className="flex-1 rounded-full border border-primary px-5 py-2.5 text-center text-sm font-semibold text-primary"
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

function NavLink({
  item,
}: {
  item: (typeof primaryNav)[number];
}) {
  const linkClass =
    "inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold text-text-main transition-colors duration-200 hover:bg-[#f8f3e8] hover:text-primary";

  if (!item.children) {
    return (
      <Link href={item.href} className={linkClass}>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link href={item.href} className={linkClass}>
        {item.label}
        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
      </Link>
      <div className="invisible absolute left-0 top-full min-w-56 rounded-[1.4rem] border border-border-soft bg-white/98 p-1.5 opacity-0 shadow-[0_28px_60px_-26px_rgba(16,33,58,0.34)] transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-text-main transition-colors hover:bg-[#f8f3e8] hover:text-primary"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
