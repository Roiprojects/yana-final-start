import type { Metadata } from "next";
import { Inbox } from "lucide-react";
import { listEnquiries } from "@/lib/data/admin";
import { EnquiryStatusSelect } from "@/components/admin/enquiry-status-select";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Enquiries" };
export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function EnquiriesPage() {
  const enquiries = await listEnquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Enquiries</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} from the website.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No enquiries yet"
          description="Submissions from the site's enquiry and contact forms will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border-soft bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-soft bg-bg-soft text-left text-xs uppercase tracking-wide text-text-secondary">
                  <th className="px-4 py-3 font-semibold">Received</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Interest</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {enquiries.map((e) => (
                  <tr key={e.id} className="align-top hover:bg-bg-soft/50">
                    <td className="whitespace-nowrap px-4 py-3 text-text-secondary">
                      {fmtDate(e.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-text-main">{e.name}</div>
                      {e.message && (
                        <div className="mt-0.5 max-w-xs text-xs text-text-secondary">
                          {e.message}
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a href={`tel:${e.phone}`} className="block text-primary hover:underline">
                        {e.phone}
                      </a>
                      {e.email && (
                        <a
                          href={`mailto:${e.email}`}
                          className="block text-xs text-text-secondary hover:underline"
                        >
                          {e.email}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-lavender px-2.5 py-1 text-xs font-semibold capitalize text-deep">
                        {e.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {e.destination_interest || e.scope || "—"}
                      {e.travellers ? (
                        <span className="block text-xs">{e.travellers} travellers</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <EnquiryStatusSelect id={e.id} status={e.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
