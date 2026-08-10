import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { unsplash } from "@/lib/images";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  image,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: string;
}) {
  if (image) {
    return (
      <div className="px-3 pt-22 sm:px-4">
        <div className="grain relative overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_30px_80px_-40px_rgba(16,33,58,0.4)] md:rounded-[2.4rem]">
          <div
            className="absolute inset-0 scale-[1.02] bg-cover bg-center saturate-[1.14] contrast-[1.05] brightness-[1.08]"
            style={{ backgroundImage: `url(${unsplash(image, 1800)})` }}
            aria-hidden
          />
          <Container className="relative pb-16 pt-16 text-white md:pb-24 md:pt-24">
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <Breadcrumbs crumbs={breadcrumbs} tone="light" />
            ) : null}
            <div className="max-w-3xl">
              <span className="mb-5 inline-flex rounded-full border border-white/55 bg-white/72 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-deep shadow-sm backdrop-blur-sm">
                Premium travel experiences
              </span>
              <h1 className="text-4xl font-extrabold tracking-[-0.05em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.18)] md:text-6xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.14)] md:text-xl">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-[#eadfcf] bg-[linear-gradient(180deg,#fffdf8,#f7f1e4)] pt-24">
      <Container className="pb-14 pt-10 md:pb-18 md:pt-14">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs crumbs={breadcrumbs} tone="dark" />
        ) : null}
        <div className="max-w-3xl">
          <span className="mb-4 inline-flex rounded-full border border-[#eadfcf] bg-white/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
            Signature journeys
          </span>
          <h1 className="text-4xl font-extrabold tracking-[-0.05em] md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              {subtitle}
            </p>
          ) : null}
        </div>
      </Container>
    </div>
  );
}

function Breadcrumbs({
  crumbs,
  tone,
}: {
  crumbs: Crumb[];
  tone: "light" | "dark";
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-5 flex flex-wrap items-center gap-1 text-sm font-medium",
        tone === "light"
          ? "text-white/92 [text-shadow:0_2px_10px_rgba(0,0,0,0.18)]"
          : "text-text-secondary",
      )}
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 ? <ChevronRight className="h-3.5 w-3.5" aria-hidden /> : null}
          {crumb.href ? (
            <Link
              to={crumb.href}
              className={cn(
                "transition-colors",
                tone === "light" ? "hover:text-white" : "hover:text-primary",
              )}
            >
              {crumb.label}
            </Link>
          ) : (
            <span
              className={tone === "light" ? "text-white" : "text-text-main"}
            >
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
