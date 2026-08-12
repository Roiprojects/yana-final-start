import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";
import { api } from "@/lib/api/client";
import { siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/lib/types/content";

type SiteForm = {
  phone: string;
  email: string;
  whatsapp: string;
  tagline: string;
  founded: string;
  facebook: string;
  instagram: string;
};

function field(
  label: string,
  value: string,
  onChange: (v: string) => void,
  opts: { type?: string; placeholder?: string; hint?: string } = {},
) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-600">
        {label}
      </label>
      <input
        type={opts.type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={opts.placeholder}
        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      {opts.hint && <p className="mt-1 text-xs text-slate-400">{opts.hint}</p>}
    </div>
  );
}

export function SettingsClient() {
  const [form, setForm] = useState<SiteForm>({
    phone: "",
    email: "",
    whatsapp: "",
    tagline: "",
    founded: "",
    facebook: "",
    instagram: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getPublicSettings()
      .then((res: SiteSettings) => {
        if (cancelled) return;
        const site = res.site ?? {};
        setForm({
          phone: site.phone ?? siteConfig.phone,
          email: site.email ?? siteConfig.email,
          whatsapp: site.whatsapp ?? siteConfig.whatsapp,
          tagline: site.tagline ?? siteConfig.tagline,
          founded: String(site.founded ?? siteConfig.founded),
          facebook: site.social?.facebook ?? siteConfig.social.facebook,
          instagram: site.social?.instagram ?? siteConfig.social.instagram,
        });
      })
      .catch(() => {
        if (!cancelled) setForm({ ...form, ...{} });
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key: keyof SiteForm) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const value = {
      phone: form.phone.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim().replace(/\D/g, ""),
      tagline: form.tagline.trim(),
      founded: Number(form.founded) || undefined,
      social: {
        facebook: form.facebook.trim(),
        instagram: form.instagram.trim(),
      },
    };
    try {
      const res = await api.saveSettings(
        "site",
        value as unknown as Record<string, unknown>,
      );
      setMessage(
        res.ok ? "Saved. Changes appear on the public site." : "Save failed.",
      );
    } catch {
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0c1e36]">
          Site Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Phone, email, WhatsApp, tagline, and social links shown across the
          header, footer, contact, and about pages.
        </p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2">
        {field("Phone", form.phone, set("phone"), {
          type: "tel",
          placeholder: "+91 9513588143",
        })}
        {field("Email", form.email, set("email"), {
          type: "email",
          placeholder: "info@yanaindia.com",
        })}
        {field("WhatsApp number", form.whatsapp, set("whatsapp"), {
          type: "tel",
          placeholder: "919513588143",
          hint: "Digits only, with country code — no + or spaces.",
        })}
        {field("Tagline", form.tagline, set("tagline"), {
          placeholder: "Reach your dream with us",
        })}
        {field("Founded (year)", form.founded, set("founded"), {
          type: "number",
          placeholder: "2015",
        })}
        {field("Facebook URL", form.facebook, set("facebook"), {
          type: "url",
          placeholder: "https://www.facebook.com/...",
        })}
        {field("Instagram URL", form.instagram, set("instagram"), {
          type: "url",
          placeholder: "https://www.instagram.com/...",
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Settings
        </button>
        {message && <p className="text-sm text-emerald-600">{message}</p>}
      </div>
    </div>
  );
}
