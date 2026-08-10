
import { type AdminHeroRow } from "@/lib/types/admin";
import { useModuleItems } from "@/lib/hooks/use-module-items";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  {
    name: "title",
    label: "Headline Quote / Title",
    type: "textarea",
    placeholder:
      "TRAVELING - IT LEAVES YOU SPEECHLESS, THEN TURNS YOU INTO A STORY TELLER",
  },
  {
    name: "subtitle",
    label: "Subtitle",
    type: "text",
    placeholder: "Tailor-made itineraries, group departures, and luxury travel",
  },
  { name: "image_url", label: "Hero Background Image", type: "image" },
  {
    name: "cta_primary_text",
    label: "Button Text",
    type: "text",
    defaultValue: "Explore Packages",
  },
  {
    name: "cta_primary_link",
    label: "Button Link",
    type: "text",
    defaultValue: "/packages",
  },
];

export function HeroClient() {
  const { items, loading, error, reload } =
    useModuleItems<AdminHeroRow>("hero_slides");

  if (loading)
    return <p className="text-sm text-slate-500">Loading hero banners…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <CrudManager<AdminHeroRow>
      title="Hero Banners & Slides"
      description="Manage rotating background images, headline quotes, and call to action buttons on the home page hero."
      module="hero_slides"
      items={items}
      onReload={reload}
      fields={fields}
      columns={[
        {
          key: "title",
          label: "Headline / Slide",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-12 w-20 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="h-12 w-20 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  No img
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900 line-clamp-1">
                  {item.title}
                </div>
                <div className="text-xs text-slate-500">
                  {item.subtitle || "Default hero quote"}
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "cta_primary_text",
          label: "Button",
          render: (item) => item.cta_primary_text || "Explore",
        },
      ]}
    />
  );
}
