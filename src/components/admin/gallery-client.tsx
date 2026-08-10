
import { type AdminGalleryRow } from "@/lib/types/admin";
import { useModuleItems } from "@/lib/hooks/use-module-items";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  {
    name: "title",
    label: "Image Title",
    type: "text",
    placeholder: "e.g. Scenic Alps Tour",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    placeholder: "e.g. International Tours",
  },
  { name: "image_url", label: "Upload Photo", type: "image" },
];

export function GalleryClient() {
  const { items, loading, error, reload } =
    useModuleItems<AdminGalleryRow>("gallery");

  if (loading)
    return <p className="text-sm text-slate-500">Loading gallery…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <CrudManager<AdminGalleryRow>
      title="Gallery"
      description="Manage photo gallery images and destination photos."
      module="gallery"
      items={items}
      onReload={reload}
      fields={fields}
      columns={[
        {
          key: "title",
          label: "Photo",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-12 w-16 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="h-12 w-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                  No img
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900">{item.title}</div>
                <div className="text-xs text-slate-500">{item.category}</div>
              </div>
            </div>
          ),
        },
        { key: "category", label: "Category" },
      ]}
    />
  );
}
