"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-sm text-text-main hover:bg-bg-soft"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </form>
  );
}
