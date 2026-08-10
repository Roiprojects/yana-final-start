
import { type AdminServiceRow } from "@/lib/types/admin";
import { useModuleItems } from "@/lib/hooks/use-module-items";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  {
    name: "name",
    label: "Service Name",
    type: "text",
    placeholder: "e.g. Flight Booking",
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "e.g. flight-booking",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Brief summary of service offered...",
  },
];

export function ServicesClient() {
  const { items, loading, error, reload } =
    useModuleItems<AdminServiceRow>("services");

  if (loading)
    return <p className="text-sm text-slate-500">Loading services…</p>;
  if (error) return <p className="text-sm text-rose-600">{error}</p>;

  return (
    <CrudManager<AdminServiceRow>
      title="Services"
      description="Manage services offered by Yana Travels (Flight Bookings, Forex, Visas, Hotels, etc.)."
      module="services"
      items={items}
      onReload={reload}
      fields={fields}
      columns={[
        {
          key: "name",
          label: "Service",
          render: (item) => (
            <div>
              <div className="font-bold text-slate-900">{item.name}</div>
              <div className="text-xs text-slate-500">{item.slug}</div>
            </div>
          ),
        },
        {
          key: "description",
          label: "Description",
          render: (item) => item.description || "—",
        },
      ]}
    />
  );
}
