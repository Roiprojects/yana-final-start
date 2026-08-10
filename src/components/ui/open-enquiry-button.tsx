
import { useEnquiryModal } from "@/components/providers/enquiry-modal-context";

export function OpenEnquiryButton({
  children,
  className,
  destination,
}: {
  children: React.ReactNode;
  className?: string;
  destination?: string;
}) {
  const { open } = useEnquiryModal();
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        open(destination ? { destinationInterest: destination } : {})
      }
    >
      {children}
    </button>
  );
}
