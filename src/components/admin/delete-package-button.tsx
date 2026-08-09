"use client";

import { useState, useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deletePackage } from "@/lib/actions/admin";

export function DeletePackageButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-danger/40 px-3 py-1.5 text-sm font-semibold text-danger hover:bg-danger/10"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/5 px-3 py-1.5">
      <span className="text-sm text-danger">Delete “{title}”?</span>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => void deletePackage(id))}
        className="inline-flex items-center gap-1 rounded-md bg-danger px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-60"
      >
        {pending && <Loader2 className="h-3 w-3 animate-spin" />} Yes, delete
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-md px-2.5 py-1 text-xs font-semibold text-text-secondary hover:bg-white"
      >
        Cancel
      </button>
    </div>
  );
}
