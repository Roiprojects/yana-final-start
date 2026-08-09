import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

/**
 * Empty state — shown when a data-driven section has no (verified) content yet.
 * Deliberately honest: we show nothing rather than invented placeholder content.
 */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-soft bg-white px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-bg-soft p-4">
        <Icon className="h-7 w-7 text-primary" aria-hidden />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-text-secondary">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
