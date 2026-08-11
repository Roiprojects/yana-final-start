import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 overflow-hidden bg-[#3457ca] text-white/80">
      <Container className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-18 w-18 items-center justify-center rounded-[1.35rem] bg-white shadow-[0_22px_40px_-24px_rgba(23,63,107,0.55)]">
              <img
                src="/brand/yana-logo.png"
                alt="Yana Travels"
                className="h-13 w-auto object-contain"
              />
            </span>
            <div className="flex flex-col">
              <p className="font-heading text-[1.85rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-white">
                Yana
              </p>
              <p className="font-heading text-[1.85rem] font-extrabold leading-[0.88] tracking-[-0.03em] text-white">
                Travels
              </p>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/10 p-2.5 transition-colors hover:bg-white/16"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/12 bg-white/10 p-2.5 transition-colors hover:bg-white/16"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white">
            Contact
          </p>
          <ul className="mt-4 space-y-3.5 text-sm text-white/70">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-[#e8c979]" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-[#e8c979]" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white">
            Offices
          </p>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            {siteConfig.offices.map((office) => (
              <li key={office.name} className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#e8c979]" />
                <span>
                  <span className="font-semibold text-white">
                    {office.name}
                    {office.note ? ` — ${office.note}` : ""}
                  </span>
                  <br />
                  {office.address}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 pb-28 text-xs text-white/50 sm:flex-row md:pb-6">
          <p>© {year} Yana Travels. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
