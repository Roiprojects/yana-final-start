"use client";

import { useState, useTransition } from "react";
import { togglePackageActive, togglePackageFeatured } from "@/lib/actions/admin";
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
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-label={label}
      disabled={pending}
      onClick={() => {
        const next = !value;
        setValue(next);
        startTransition(() => onToggle(next));
      }}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        value ? "bg-primary" : "bg-border-soft",
        pending && "opacity-60",
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

export function ActiveToggle({ id, active }: { id: string; active: boolean }) {
  return (
    <Toggle
      on={active}
      label="Active"
      onToggle={(next) => void togglePackageActive(id, next)}
    />
  );
}

export function FeaturedToggle({ id, featured }: { id: string; featured: boolean }) {
  return (
    <Toggle
      on={featured}
      label="Featured"
      onToggle={(next) => void togglePackageFeatured(id, next)}
    />
  );
}
