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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Full card background image */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url('/brand/enquiry-modal-team.png')` }}
          aria-hidden
        />
        {/* Crisp semi-transparent frosted white overlay for 100% text readability */}
        <div
          className="absolute inset-0 bg-white/90 backdrop-blur-[6px]"
          aria-hidden
        />

        {/* Modal content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Top-right close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-black/10 hover:text-gray-800"
            aria-label="Close enquiry form"
          >
            <X className="h-5 w-5" />
          </button>

          {submitted ? (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Thank you!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Your enquiry has been received. Our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 w-full rounded-xl bg-[#0b66e4] py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0952b7]"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              {/* Title & Subtitle */}
              <div className="text-center">
                <h2 className="text-2xl font-extrabold tracking-tight text-[#ea580c] sm:text-3xl">
                  Enquire Now
                </h2>
                <p className="mt-1.5 text-xs font-medium text-gray-600 sm:text-sm">
                  Fill out the form and our team will get back to you shortly.
                </p>
              </div>

              {/* Form fields */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-6 space-y-4"
              >
                {/* Name */}
                <div>
                  <div className="relative flex items-center rounded-xl border border-gray-200/90 bg-white/95 shadow-sm transition-colors focus-within:border-[#0b66e4] focus-within:ring-2 focus-within:ring-[#0b66e4]/20">
                    <input
                      id="modal-name"
                      className="w-full bg-transparent px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none"
                      placeholder="Enter Name"
                      {...register("name")}
                    />
                    <User className="pointer-events-none absolute right-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className={errorClass}>{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="relative flex items-center rounded-xl border border-gray-200/90 bg-white/95 shadow-sm transition-colors focus-within:border-[#0b66e4] focus-within:ring-2 focus-within:ring-[#0b66e4]/20">
                    <input
                      id="modal-email"
                      type="email"
                      className="w-full bg-transparent px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none"
                      placeholder="Enter Email ID"
                      {...register("email")}
                    />
                    <Mail className="pointer-events-none absolute right-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className={errorClass}>{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="relative flex items-center rounded-xl border border-gray-200/90 bg-white/95 shadow-sm transition-colors focus-within:border-[#0b66e4] focus-within:ring-2 focus-within:ring-[#0b66e4]/20">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 py-3.5 pl-3.5 pr-2.5 text-xs font-semibold text-gray-700 select-none">
                      <span className="text-base leading-none">🇮🇳</span>
                      <span className="text-[10px] text-gray-400">▾</span>
                      <span className="pl-1 text-sm text-gray-700">+91</span>
                    </div>
                    <input
                      id="modal-phone"
                      inputMode="tel"
                      className="w-full bg-transparent px-3 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none"
                      placeholder="Enter Phone Number"
                      {...register("phone")}
                    />
                    <Phone className="pointer-events-none absolute right-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.phone && (
                    <p className={errorClass}>{errors.phone.message}</p>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <div className="relative flex items-center rounded-xl border border-gray-200/90 bg-white/95 shadow-sm transition-colors focus-within:border-[#0b66e4] focus-within:ring-2 focus-within:ring-[#0b66e4]/20">
                    <input
                      id="modal-destination"
                      className="w-full bg-transparent px-4 py-3.5 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none"
                      placeholder="Enter Your Destination"
                      {...register("destinationInterest")}
                    />
                    <MapPin className="pointer-events-none absolute right-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {submitError && (
                  <p className="rounded-xl bg-red-50 px-3.5 py-2 text-xs text-red-600">
                    {submitError}
                  </p>
                )}

                {/* Royal Blue Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b66e4] py-3.5 text-base font-bold text-white shadow-md transition-all duration-200 hover:bg-[#0952b7] hover:shadow-lg disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Submitting…</span>
                    </>
                  ) : (
                    <span>Submit Now</span>
                  )}
                </button>
              </form>
            </div>
          )}
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
