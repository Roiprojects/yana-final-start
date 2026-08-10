
import { useState } from "react";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

function Toggle({
  on,
  label,
  onToggle,
}: {
  on: boolean;
  label: string;
  onToggle: (next: boolean) => void;
}) {
  const [value, setValue] = useState(on);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      onClick={() => {
        const next = !value;
        setValue(next);
        void onToggle(next);
      }}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        value ? "bg-primary" : "bg-border-soft",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          value ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

export function ActiveToggle({
  id,
  active,
  onChanged,
}: {
  id: string;
  active: boolean;
  onChanged?: () => void;
}) {
  return (
    <Toggle
      on={active}
      label="Active"
      onToggle={(next) => {
        void api.togglePackageActive(id, next).then(() => onChanged?.());
      }}
    />
  );
}

export function FeaturedToggle({
  id,
  featured,
  onChanged,
}: {
  id: string;
  featured: boolean;
  onChanged?: () => void;
}) {
  return (
    <Toggle
      on={featured}
      label="Featured"
      onToggle={(next) => {
        void api.togglePackageFeatured(id, next).then(() => onChanged?.());
      }}
    />
  );
}
