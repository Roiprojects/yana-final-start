
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";

export function EnquireNowButton({ destination }: { destination?: string }) {
  const { open } = useEnquiryModal();
  return (
    <button
      type="button"
      onClick={() =>
        open(destination ? { destinationInterest: destination } : {})
      }
      className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-[#2b7fc7] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_26px_-8px_rgba(18,96,158,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-8px_rgba(18,96,158,0.8)]"
    >
      Enquire now
    </button>
  );
}
