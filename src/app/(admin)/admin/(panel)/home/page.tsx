import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, MapPin, Briefcase, Star, HelpCircle, Layers } from "lucide-react";

export const metadata: Metadata = { title: "Home Page Sections" };

const sections = [
  { title: "Hero Banners & Quotes", description: "Manage top banner slideshow, quote text & call to action buttons.", href: "/admin/hero", icon: Sparkles },
  { title: "Featured Destinations", description: "Manage travel destinations highlighted on homepage.", href: "/admin/destinations", icon: MapPin },
  { title: "Travel Services", description: "Manage flight bookings, forex, visa, and tour services.", href: "/admin/services", icon: Briefcase },
  { title: "Customer Reviews", description: "Manage customer testimonials and star ratings.", href: "/admin/testimonials", icon: Star },
  { title: "Photo Gallery", description: "Manage photo gallery images.", href: "/admin/gallery", icon: Layers },
  { title: "Contact & Offices", description: "Manage office addresses and contact numbers.", href: "/admin/contact", icon: HelpCircle },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0c1e36]">Home Page Content Hub</h1>
        <p className="mt-1 text-sm text-slate-500">Select a section below to edit content live on the home page.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-xl bg-sky-50 p-3 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
              <Icon className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
