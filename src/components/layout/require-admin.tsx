
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "@/lib/api/client";

/**
 * Guards the /admin/* routes. Checks the session cookie via /api/auth/me and
 * redirects to /admin/login?next=... when not authenticated.
 */
export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading" | "authed" | "denied">(
    "loading",
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    api
      .me()
      .then((res) => {
        if (cancelled) return;
        if (res.ok) setState("authed");
        else {
          setState("denied");
          const next = `${location.pathname}${location.search}`;
          navigate(
            `/admin/login${next ? `?next=${encodeURIComponent(next)}` : ""}`,
            { replace: true },
          );
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState("denied");
          navigate("/admin/login", { replace: true });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [location.pathname, location.search, navigate]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-soft">
        <p className="text-sm text-text-secondary">Checking session…</p>
      </div>
    );
  }

  if (state === "denied") return null;

  return <>{children}</>;
}
