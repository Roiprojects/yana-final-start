import { Plus, Search, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

/**
 * Standard admin module scaffold — the shared shell every content module uses.
 * Shows the toolbar (search / filter / add) and an empty state. The list table,
 * forms, and draft→preview→publish workflow are wired to the admin API.
 */
export function ModuleScaffold({
  title,
  description,
  icon,
  addLabel = "Add new",
  capabilities,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  addLabel?: string;
  capabilities?: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border-soft bg-white p-3">
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-bg-soft px-3 py-2">
          <Search className="h-4 w-4 text-text-secondary" aria-hidden />
          <input
            className="w-full bg-transparent text-sm outline-none"
            placeholder="Search…"
            disabled
          />
        </div>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-sm text-text-secondary"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>

      <EmptyState
        icon={icon}
        title="Nothing here yet"
        description="This module isn't wired up yet. Records will appear once the module is implemented."
      />

      {capabilities && capabilities.length > 0 && (
        <div className="rounded-xl border border-dashed border-border-soft bg-bg-soft p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-text-secondary">
            Planned capabilities
          </p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((c) => (
              <span
                key={c}
                className="rounded-full bg-white px-2.5 py-1 text-xs text-text-secondary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
