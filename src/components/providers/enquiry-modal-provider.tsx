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
  PhoneCall,
} from "lucide-react";
import {
  enquiryFormSchema,
  type EnquiryFormValues,
} from "@/lib/schemas/enquiry";
import { api } from "@/lib/api/client";
import { unsplash } from "@/lib/images";
import { EnquiryModalContext } from "./enquiry-modal-context";

/* ── Form fields ── */
const fieldClass =
  "w-full rounded-lg border border-border-soft bg-bg-main px-3.5 py-2.5 text-sm text-text-main outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20";
const labelClass =
  "mb-1 block text-xs font-bold uppercase tracking-wide text-text-secondary";
const errorClass = "mt-1 text-[11px] text-red-500";

const MODAL_IMAGE = "photo-1469474968028-56623f02e42e";

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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-deep/60 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
    >
      <div className="relative flex w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_-16px_rgba(12,39,64,0.45)]">
        {/* Left — team image (desktop only) */}
        <div
          className="relative hidden w-[42%] shrink-0 flex-col justify-end overflow-hidden bg-cover bg-top p-6 md:flex"
          style={{ backgroundImage: `url('/brand/enquiry-modal-team.png')` }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/25"
            aria-hidden
          />
          <div className="relative z-10">
            <p className="text-base font-extrabold uppercase tracking-widest text-white">
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
          <div className="flex items-center justify-between bg-gradient-to-r from-[#3457ca] to-[#2a46a8] px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Free consultation
              </p>
              <h3 className="font-heading text-base font-bold text-white">
                Get a Callback
              </h3>
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
                  className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover"
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
                    <label className={labelClass} htmlFor="modal-name">
                      <PhoneCall className="mr-1 inline h-3 w-3" />
                      Name *
                    </label>
                    <input
                      id="modal-name"
                      className={fieldClass}
                      placeholder="Your full name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className={labelClass} htmlFor="modal-phone">
                      Phone *
                    </label>
                    <input
                      id="modal-phone"
                      inputMode="tel"
                      className={fieldClass}
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className={errorClass}>{errors.phone.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <label className={labelClass} htmlFor="modal-email">
                      Email
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      className={fieldClass}
                      placeholder="you@email.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>
                  {/* Travellers */}
                  <div>
                    <label className={labelClass} htmlFor="modal-travellers">
                      <Users className="mr-1 inline h-3 w-3" />
                      Travellers
                    </label>
                    <input
                      id="modal-travellers"
                      type="number"
                      min={1}
                      className={fieldClass}
                      placeholder="2"
                      {...register("travellers")}
                    />
                  </div>
                  {/* Destination */}
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="modal-destination">
                      <MapPin className="mr-1 inline h-3 w-3" />
                      Destination of interest
                    </label>
                    <input
                      id="modal-destination"
                      className={fieldClass}
                      placeholder="e.g. Kerala, Bali, Kashmir…"
                      {...register("destinationInterest")}
                    />
                  </div>
                  {/* Travel Date */}
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="modal-date">
                      <Calendar className="mr-1 inline h-3 w-3" />
                      Preferred travel date
                    </label>
                    <input
                      id="modal-date"
                      type="date"
                      className={fieldClass}
                      {...register("travelDate")}
                    />
                  </div>
                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="modal-message">
                      Any other details
                    </label>
                    <textarea
                      id="modal-message"
                      rows={2}
                      className={fieldClass}
                      placeholder="Budget, special requirements, etc."
                      {...register("message")}
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3457ca] to-[#2a46a8] py-3 text-sm font-bold text-white shadow-[0_10px_26px_-8px_rgba(52,87,202,0.5)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(52,87,202,0.7)] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                </button>

                <p className="text-center text-[10px] text-text-secondary">
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

  // Auto-open the enquiry popup once when the site first loads.
  const autoOpened = useRef(false);
  useEffect(() => {
    if (autoOpened.current) return;
    autoOpened.current = true;
    const t = setTimeout(() => open(), 700);
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
