
import { useState } from "react";
import { Plus, HelpCircle, PhoneCall, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/components/providers/site-settings-context";
import { whatsappLink } from "@/lib/site-config";
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const { phone, whatsapp } = useSiteSettings();
  const { open: openEnquiry } = useEnquiryModal();

  const displayedItems = showAll ? items : items.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* FAQ Accordion Cards */}
      <div className="space-y-3.5">
        {displayedItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={cn(
                "overflow-hidden rounded-2xl border bg-white/95 transition-all duration-300 backdrop-blur-md",
                isOpen
                  ? "border-primary/40 shadow-[0_16px_36px_-16px_rgba(11,102,228,0.18)]"
                  : "border-[#e8decb]/80 shadow-[0_4px_20px_-8px_rgba(16,33,58,0.06)] hover:border-primary/25 hover:shadow-md",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-colors",
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-[#f5efe3] text-[#8e6515]",
                    )}
                  >
                    Q{i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-base font-bold transition-colors",
                      isOpen ? "text-primary" : "text-[#10213a]",
                    )}
                  >
                    {item.q}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "border-primary bg-primary text-white rotate-45"
                      : "border-[#e8decb] bg-[#fffdf8] text-[#6c7788] hover:border-primary/40 hover:text-primary",
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </div>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#f0e8d8] px-6 py-4.5 pl-16">
                    <p className="text-sm leading-relaxed text-[#556377]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More / Show Less Toggle Button */}
      {items.length > 6 && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white px-5 py-2.5 text-xs font-bold text-primary shadow-sm transition-all hover:bg-primary hover:text-white hover:shadow-md"
          >
            <span>{showAll ? "Show Less Questions" : `View All ${items.length} Questions`}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Interactive Bottom Help Banner */}
      <div className="mt-10 rounded-[2rem] border border-[#e8decb] bg-[linear-gradient(135deg,#fffdf8,#f5efe3)] p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[#1d4ed8] text-white shadow-md">
          <HelpCircle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-deep sm:text-xl">
          Still have questions about your upcoming trip?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
          Our dedicated destination planners are available 24/7 to help you choose or customize the perfect travel itinerary.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => openEnquiry()}
            className="inline-flex items-center gap-2 rounded-full bg-cta px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            <span>Send Quick Enquiry</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <a
            href={whatsappLink("Hi Yana Travels, I have a question about planning a trip", whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25d366]/40 bg-white px-5 py-2.5 text-xs font-bold text-[#128c7e] shadow-sm transition-all hover:bg-[#25d366] hover:text-white hover:border-[#25d366]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-white px-5 py-2.5 text-xs font-bold text-deep shadow-sm transition-all hover:border-primary hover:text-primary"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Call Helpline</span>
          </a>
        </div>
      </div>
    </div>
  );
}
