"use client";

import { type AdminOfficeRow } from "@/lib/data/admin";
import { saveOfficeAction } from "@/lib/actions/admin-actions";
import { CrudManager, type FieldDef } from "@/components/admin/crud-manager";

const fields: FieldDef[] = [
  { name: "office_name", label: "Office Location / City", type: "text", placeholder: "e.g. Bengaluru" },
  { name: "address", label: "Street Address", type: "textarea", placeholder: "Full office address..." },
  { name: "city", label: "City", type: "text", placeholder: "e.g. Bengaluru" },
  { name: "pincode", label: "Pincode", type: "text", placeholder: "e.g. 560003" },
  { name: "phone", label: "Phone Number", type: "text", placeholder: "+91 9513588143" },
  { name: "email", label: "Email Address", type: "text", placeholder: "info@yanaindia.com" },
];

export function ContactClient({ initialItems }: { initialItems: AdminOfficeRow[] }) {
  return (
    <CrudManager<AdminOfficeRow>
      title="Contact Offices"
      description="Manage office addresses and contact information displayed on the website and footer."
      tableName="contact_info"
      items={initialItems}
      onSaveAction={saveOfficeAction}
      fields={fields}
      columns={[
        {
          key: "office_name",
          label: "Office",
          render: (item) => (
            <div>
              <div className="font-bold text-slate-900">{item.office_name}</div>
              <div className="text-xs text-slate-500">{item.city || item.office_name}</div>
            </div>
          ),
        },
        { key: "address", label: "Address", render: (item) => <span className="line-clamp-2 max-w-sm">{item.address || "—"}</span> },
        { key: "phone", label: "Phone", render: (item) => item.phone || "—" },
      ]}
    />
  );
}
