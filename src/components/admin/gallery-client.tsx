"use client";

import { type AdminGalleryRow } from "@/lib/data/admin";
import { saveGalleryAction } from "@/lib/actions/admin-actions";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  { name: "title", label: "Image Title", type: "text", placeholder: "e.g. Scenic Alps Tour" },
  { name: "category", label: "Category", type: "text", placeholder: "e.g. International Tours" },
  { name: "image_url", label: "Upload Photo", type: "image" },
];

export function GalleryClient({ initialItems }: { initialItems: AdminGalleryRow[] }) {
  return (
    <CrudManager<AdminGalleryRow>
      title="Gallery"
      description="Manage photo gallery images and destination photos."
      tableName="gallery"
      items={initialItems}
      onSaveAction={saveGalleryAction}
      fields={fields}
      columns={[
        {
          key: "title",
          label: "Photo",
          render: (item) => (
            <div className="flex items-center gap-3">
              {item.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image_url} alt={item.title} className="h-12 w-16 rounded-lg object-cover border border-slate-200" />
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
