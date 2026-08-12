import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { siteConfig } from "@/lib/site-config";
import type { AboutContent, SiteSettings } from "@/lib/types/content";

export type SiteOverrides = {
  phone: string;
  email: string;
  whatsapp: string;
  tagline: string;
  founded: number;
  facebook: string;
  instagram: string;
  about: AboutContent;
  seo: { title?: string; description?: string };
};

const defaults: SiteOverrides = {
  phone: siteConfig.phone,
  email: siteConfig.email,
  whatsapp: siteConfig.whatsapp,
  tagline: siteConfig.tagline,
  founded: siteConfig.founded,
  facebook: siteConfig.social.facebook,
  instagram: siteConfig.social.instagram,
  about: {},
  seo: {},
};

const Ctx = createContext<SiteOverrides>(defaults);

export function useSiteSettings(): SiteOverrides {
  return useContext(Ctx);
}

function applySeo(seo: { title?: string; description?: string }) {
  if (seo.title) {
    document.title = `${seo.title} | ${siteConfig.name}`;
  }
  if (seo.description) {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (meta) meta.content = seo.description;
  }
}

/**
 * Loads editable site settings from the API (single source of truth with the
 * admin panel) and exposes them with confirmed fallbacks from siteConfig.
 */
export function SiteSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteOverrides>(defaults);

  useEffect(() => {
    let cancelled = false;
    api
      .getPublicSettings()
      .then((res: SiteSettings) => {
        if (cancelled) return;
        const site = res.site ?? {};
        setSettings({
          phone: site.phone ?? defaults.phone,
          email: site.email ?? defaults.email,
          whatsapp: site.whatsapp ?? defaults.whatsapp,
          tagline: site.tagline ?? defaults.tagline,
          founded: site.founded ?? defaults.founded,
          facebook: site.social?.facebook ?? defaults.facebook,
          instagram: site.social?.instagram ?? defaults.instagram,
          about: res.about ?? {},
          seo: res.seo ?? {},
        });
        applySeo(res.seo ?? {});
      })
      .catch(() => {
        /* keep confirmed fallbacks */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <Ctx.Provider value={settings}>{children}</Ctx.Provider>;
}
