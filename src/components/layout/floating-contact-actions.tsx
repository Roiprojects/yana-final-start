import { useEffect, useState } from "react";
import { ArrowUp, PhoneCall } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";
import { useSiteSettings } from "@/components/providers/site-settings-context";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
    >
      <path d="M16 3.2A12.75 12.75 0 0 0 5.07 22.53L3.2 28.8l6.43-1.84A12.8 12.8 0 1 0 16 3.2Zm0 23.25a10.43 10.43 0 0 1-5.32-1.46l-.38-.23-3.82 1.1 1.1-3.72-.25-.39A10.45 10.45 0 1 1 16 26.45Zm5.73-7.82c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.7.16-.2.31-.8 1-.98 1.2-.18.21-.36.24-.67.08-.31-.16-1.28-.47-2.44-1.5a9.2 9.2 0 0 1-1.7-2.1c-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53l-.59-.01c-.2 0-.54.08-.83.39-.28.31-1.08 1.05-1.08 2.57s1.11 2.98 1.27 3.19c.16.2 2.18 3.33 5.28 4.67.74.32 1.32.51 1.77.65.75.24 1.43.2 1.97.12.6-.09 1.82-.75 2.08-1.48.26-.73.26-1.36.18-1.49-.08-.13-.28-.2-.59-.36Z" />
    </svg>
  );
}
export function FloatingContactActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { phone, whatsapp } = useSiteSettings();

  useEffect(() => {
    const updateVisibility = () => setShowScrollTop(window.scrollY > 360);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <>
      <div className="fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] left-4 z-50 flex shrink-0 flex-col gap-3 md:bottom-8 md:left-6">
        <a
          href={phoneHref}
          aria-label={`Call Yana Travels at ${phone}`}
          className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(145deg,#2a9bea,#075eac)] text-white shadow-[0_18px_34px_-14px_rgba(16,93,157,0.72)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_24px_42px_-14px_rgba(16,93,157,0.82)] sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-4 sm:py-3"
        >
          <PhoneCall className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={whatsappLink(undefined, whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Yana Travels on WhatsApp"
          className="group inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-[linear-gradient(145deg,#35e47b,#119447)] text-white shadow-[0_18px_34px_-14px_rgba(18,148,71,0.62)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_24px_42px_-14px_rgba(18,148,71,0.76)] sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-4 sm:py-3"
        >
          <WhatsAppIcon />
        </a>
      </div>

      <button
        type="button"
        aria-label="Scroll to top"

        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-[calc(6.5rem+env(safe-area-inset-bottom))] right-4 z-50 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/75 bg-[linear-gradient(145deg,#f8d978,#c8941d)] text-deep shadow-[0_18px_34px_-14px_rgba(174,125,23,0.62)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 md:bottom-8 md:right-6 ${showScrollTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden />
      </button>
    </>
  );
}
