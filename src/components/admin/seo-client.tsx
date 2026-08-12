import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import type { SiteSettings } from "@/lib/types/content";

type SeoForm = {
  title: string;
  description: string;
};

export function SeoClient() {
  const [form, setForm] = useState<SeoForm>({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getPublicSettings()
      .then((res: SiteSettings) => {
        if (cancelled) return;
        setForm({
          title: res.seo?.title ?? "",
          description: res.seo?.description ?? "",
        });
      })
      .catch(() => {
        /* keep empty form */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const value = {
      title: form.title.trim(),
      description: form.description.trim(),
    };
    try {
      const res = await api.saveSettings(
        "seo",
        value as unknown as Record<string, unknown>,
      );
      setMessage(
        res.ok
          ? "Saved. The new title and description appear on the public site."
          : "Save failed.",
      );
    } catch {
      setMessage("Error saving SEO settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0c1e36]">SEO</h1>
        <p className="mt-1 text-sm text-slate-500">
          Default page title and meta description used across the public site.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
            Page title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Yana Travels — Reach your dream with us"
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-slate-400">
            Displayed in the browser tab. Leave blank to keep the site default.
          </p>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
            Meta description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            rows={4}
            placeholder="Domestic and international group and customized tours, pilgrimage packages, weekend getaways, and travel services."
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <p className="mt-1 text-xs text-slate-400">
            Shown in search results. Keep it under ~160 characters.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save SEO Settings
        </button>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </div>
    </div>
  );
}
