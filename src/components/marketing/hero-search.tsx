import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, CornerDownLeft } from "lucide-react";
import { api } from "@/lib/api/client";
import type { PackageListItem } from "@/lib/types/tour";

/** Hero search box with a live package autocomplete dropdown. */
export function HeroSearch() {
  const [items, setItems] = useState<PackageListItem[]>([]);
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .listPackages()
      .then((res) => setItems(res.items))
      .catch(() => setItems([]));
  }, []);

  const query = term.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];
    const scored = items
      .map((p) => {
        const title = (p.title ?? "").toLowerCase();
        const dest = (p.destination_name ?? "").toLowerCase();
        let score = -1;
        if (title.startsWith(query) || dest.startsWith(query)) score = 0;
        else if (title.includes(query) || dest.includes(query)) score = 1;
        return { p, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => a.score - b.score)
      .slice(0, 6);
    return scored.map((r) => r.p);
  }, [items, query]);

  // Close the dropdown when clicking anywhere outside the search box.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    navigate(query ? `/packages?q=${encodeURIComponent(query)}` : "/packages");
  }

  function goTo(pkg: PackageListItem) {
    setOpen(false);
    setTerm("");
    navigate(`/packages/${pkg.slug}`);
  }

  const showDropdown = open && query.length > 0 && results.length > 0;

  return (
    <div ref={boxRef} className="relative w-full max-w-xl">
      <form onSubmit={submit}>
        <div className="flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 shadow-[0_14px_30px_-20px_rgba(0,0,0,0.6)] backdrop-blur-lg transition-colors focus-within:bg-white/25">
          <input
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search packages…"
            aria-label="Search packages"
            autoComplete="off"
            className="w-full bg-transparent text-xs text-white placeholder-white/70 outline-none sm:text-sm [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/35 hover:scale-105"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </form>

      {showDropdown && (
        <div
          role="listbox"
          aria-label="Package suggestions"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/60 bg-white/95 text-text-main shadow-[0_28px_60px_-24px_rgba(16,33,58,0.5)] backdrop-blur-xl"
        >
          <div className="max-h-80 overflow-y-auto p-1.5">
            {results.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                role="option"
                onClick={() => goTo(pkg)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[#eef2fb]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-deep">
                    {pkg.title}
                  </span>
                  {pkg.destination_name ? (
                    <span className="block truncate text-xs text-text-secondary">
                      {pkg.destination_name}
                      {pkg.scope === "domestic"
                        ? " · Domestic"
                        : " · International"}
                    </span>
                  ) : null}
                </span>
              </button>
            ))}
          </div>
          <Link
            to={`/packages?q=${encodeURIComponent(query)}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 border-t border-border-soft bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-[#f4f6fb]"
          >
            <Search className="h-4 w-4" aria-hidden />
            See all results for &ldquo;{term}&rdquo;
          </Link>
        </div>
      )}
    </div>
  );
}
