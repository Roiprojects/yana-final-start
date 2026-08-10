
import { type AdminDestinationRow } from "@/lib/types/admin";
import { useModuleItems } from "@/lib/hooks/use-module-items";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  {
    name: "name",
    label: "Destination Name",
    type: "text",
    placeholder: "e.g. Bali",
  },
  { name: "slug", label: "Slug (URL)", type: "text", placeholder: "e.g. bali" },
  {
    name: "scope",
    label: "Scope",
    type: "select",
    options: [
      { label: "International", value: "international" },
      { label: "Domestic (India)", value: "domestic" },
    ],
  },
  {
    name: "country",
    label: "Country / State",
    type: "text",
    placeholder: "e.g. Indonesia",
  },
  {
    name: "description",
    label: "Short Description",
    type: "textarea",
    placeholder: "Highlights of this destination...",
  },
  { name: "image_url", label: "Destination Cover Photo", type: "image" },
  {
    name: "is_featured",
    label: "Show on Home Page (Featured)",
    type: "checkbox",
  },
];

export function DestinationsClient() {
  const { items, loading, error, reload } =
    useModuleItems<AdminDestinationRow>("destinations");

  if (loading)
    return <p className="text-sm text-slate-500">Loading destinations…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <CrudManager<AdminDestinationRow>
      title="Destinations"
      description="Manage international & domestic destinations displayed on the website."
      module="destinations"
      items={items}
      onReload={reload}
      fields={fields}
      columns={[
        {
          key: "name",
          label: "Destination",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-10 w-12 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="h-10 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  No img
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900">{item.name}</div>
                <div className="text-xs text-slate-500">
                  {item.country || item.scope}
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "scope",
          label: "Scope",
          render: (item) => <span className="capitalize">{item.scope}</span>,
        },
        {
          key: "is_featured",
          label: "Featured",
          render: (item) => (item.is_featured ? "⭐ Featured" : "Standard"),
        },
      ]}
    />
  );
}
