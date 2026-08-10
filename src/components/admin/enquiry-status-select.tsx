
import { useState } from "react";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

const OPTIONS = ["new", "contacted", "closed"] as const;
type Status = (typeof OPTIONS)[number];

const tone: Record<Status, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-warning/10 text-warning",
  closed: "bg-success/10 text-success",
};

export function EnquiryStatusSelect({
  id,
  status,
  onChanged,
}: {
  id: string;
  status: Status;
  onChanged?: () => void;
}) {
  const [value, setValue] = useState<Status>(status);
  const [pending, setPending] = useState(false);

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as Status;
        setValue(next);
        setPending(true);
        void api
          .setEnquiryStatus(id, next)
          .then(() => onChanged?.())
          .catch(() => setValue(status))
          .finally(() => setPending(false));
      }}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold capitalize outline-none",
        tone[value],
        pending && "opacity-60",
      )}
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o} className="bg-white text-text-main">
          {o}
        </option>
      ))}
    </select>
  );
}
