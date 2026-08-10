import { createContext, useContext } from "react";
import type { EnquiryFormValues } from "@/lib/schemas/enquiry";

export type EnquiryModalCtx = {
  open: (prefill?: Partial<EnquiryFormValues>) => void;
  close: () => void;
};

export const EnquiryModalContext = createContext<EnquiryModalCtx | null>(null);

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx)
    throw new Error("useEnquiryModal must be used inside EnquiryModalProvider");
  return ctx;
}
