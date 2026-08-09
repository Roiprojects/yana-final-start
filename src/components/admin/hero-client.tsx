"use client";

import { type AdminHeroRow } from "@/lib/data/admin";
import { saveHeroSlideAction } from "@/lib/actions/admin-actions";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  { name: "title", label: "Headline Quote / Title", type: "textarea", placeholder: "TRAVELING - IT LEAVES YOU SPEECHLESS, THEN TURNS YOU INTO A STORY TELLER" },
  { name: "subtitle", label: "Subtitle", type: "text", placeholder: "Tailor-made itineraries, group departures, and luxury travel" },
  { name: "image_url", label: "Hero Background Image", type: "image" },
  { name: "cta_primary_text", label: "Button Text", type: "text", defaultValue: "Explore Packages" },
  { name: "cta_primary_link", label: "Button Link", type: "text", defaultValue: "/packages" },
];

export function HeroClient({ initialItems }: { initialItems: AdminHeroRow[] }) {
  return (
    <CrudManager<AdminHeroRow>
      title="Hero Banners & Slides"
      description="Manage rotating background images, headline quotes, and call to action buttons on the home page hero."
      tableName="hero_slides"
      items={initialItems}
      onSaveAction={saveHeroSlideAction}
      fields={fields}
      columns={[
        {
          key: "title",
          label: "Headline / Slide",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} className="h-12 w-20 rounded-lg object-cover border border-slate-200" />
              ) : (
                <div className="h-12 w-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  No img
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900 line-clamp-1">{item.title}</div>
                <div className="text-xs text-slate-500">{item.subtitle || "Default hero quote"}</div>
              </div>
            </div>
          ),
        },
        { key: "cta_primary_text", label: "Button", render: (item) => item.cta_primary_text || "Explore" },
      ]}
    />
  );
}
