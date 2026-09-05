import { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  CheckCircle2,
  Loader2,
  Send,
  MapPin,
  Calendar,
  Users,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/schemas/enquiry";
import { api } from "@/lib/api/client";
import { EnquiryModalContext } from "./enquiry-modal-context";

const errorClass = "mt-1 text-[11px] font-medium text-red-500";

/* ── Modal dialog ── */
function EnquiryDialog({
  prefill,
  onClose,
}: {
  prefill: Partial<EnquiryFormValues>;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: { type: "general", ...prefill },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function onSubmit(values: EnquiryFormValues) {
    setSubmitError(null);
    const result = await api.submitEnquiry({ ...values, type: "general" });
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof EnquiryFormValues, { message });
      }
    }
    setSubmitError(result.error ?? "Something went wrong. Please try again.");
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
    >
      <div className="relative flex max-h-[94vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-16px_rgba(12,39,64,0.45)]">
        {/* Left — team image (desktop only) */}
        <div
          className="relative hidden w-[42%] shrink-0 flex-col justify-end overflow-hidden bg-cover bg-top p-6 md:flex"
          style={{ backgroundImage: `url('/brand/enquiry-modal-team.png')` }}
        >
          {/* Gentle gradient overlay to keep team smiling faces clear and bottom text readable */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent"
            aria-hidden
          />
          <div className="relative z-10">
            <p className="text-sm font-extrabold uppercase tracking-widest text-[#fcd34d]">
              Yana Travels
            </p>
            <h2 className="mt-1 font-heading text-xl font-bold leading-snug text-white">
              Plan your
              <br />
              dream journey
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-white/85">
              Share a few details and our travel experts will craft the perfect
              itinerary for you.
            </p>
            <div className="mt-4 space-y-2">
              {[
                "Domestic & international tours",
                "Tailor-made itineraries",
                "Expert guidance",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fcd34d]" />
                  <span className="text-[11px] font-medium text-white/90">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0b66e4] to-[#0952b7] px-5 py-4">
            <div>
              <h3 className="font-heading text-base font-bold text-white">
                Enquire Now / Get a Callback
              </h3>
              <p className="text-[11px] text-white/80">
                Fill out the form and our team will get back to you shortly.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
              aria-label="Close enquiry form"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
                <h3 className="mt-4 text-lg font-bold text-text-main">
                  Thank you!
                </h3>
                <p className="mt-2 max-w-xs text-sm text-text-secondary">
                  Your enquiry has been received. Our team will call you back
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-[#0b66e4] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0952b7]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-3"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <div className="relative">
                      <input
                        id="modal-name"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-10 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                        placeholder="Enter Name *"
                        {...register("name")}
                      />
                      <User className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <div className="relative">
                      <input
                        id="modal-email"
                        type="email"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-10 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                        placeholder="Enter Email ID"
                        {...register("email")}
                      />
                      <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50/60 transition focus-within:border-[#0b66e4] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0b66e4]/15">
                      <span className="flex items-center gap-1 border-r border-gray-200 px-3 text-xs font-semibold text-gray-700 select-none">
                        <span className="text-base leading-none">🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        id="modal-phone"
                        inputMode="tel"
                        className="w-full bg-transparent px-3 py-2.5 pr-10 text-sm text-text-main outline-none"
                        placeholder="Phone Number *"
                        {...register("phone")}
                      />
                      <Phone className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.phone && (
                      <p className={errorClass}>{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Destination */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <input
                        id="modal-destination"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-10 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                        placeholder="Enter Your Destination (e.g. Europe, Bali, Kerala…)"
                        {...register("destinationInterest")}
                      />
                      <MapPin className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Travellers */}
                  <div>
                    <div className="relative">
                      <input
                        id="modal-travellers"
                        type="number"
                        min={1}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 pr-10 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                        placeholder="Travellers (e.g. 2)"
                        {...register("travellers")}
                      />
                      <Users className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <div className="relative">
                      <input
                        id="modal-date"
                        type="date"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                        {...register("travelDate")}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <textarea
                      id="modal-message"
                      rows={2}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-3.5 py-2.5 text-sm text-text-main outline-none transition focus:border-[#0b66e4] focus:bg-white focus:ring-2 focus:ring-[#0b66e4]/15"
                      placeholder="Any other details (budget, special requirements, etc.)"
                      {...register("message")}
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="rounded-xl bg-red-50 px-3.5 py-2 text-xs text-red-600">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b66e4] py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_-8px_rgba(11,102,228,0.5)] transition-all duration-200 hover:bg-[#0952b7] hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(11,102,228,0.7)] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>{isSubmitting ? "Submitting…" : "Submit Now"}</span>
                </button>

                <p className="text-center text-[11px] text-text-secondary">
                  We&apos;ll call you back within 2 business hours. No spam,
                  ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Provider ── */
export function EnquiryModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<{
    open: boolean;
    prefill: Partial<EnquiryFormValues>;
  }>({
    open: false,
    prefill: {},
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((prefill: Partial<EnquiryFormValues> = {}) => {
    setState({ open: true, prefill });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  // Auto-open the enquiry popup when the site first opens or is refreshed.
  useEffect(() => {
    const t = setTimeout(() => {
      open();
    }, 800);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <EnquiryModalContext.Provider value={{ open, close }}>
      {children}
      {mounted &&
        state.open &&
        createPortal(
          <EnquiryDialog prefill={state.prefill} onClose={close} />,
          document.body,
        )}
    </EnquiryModalContext.Provider>
  );
}
