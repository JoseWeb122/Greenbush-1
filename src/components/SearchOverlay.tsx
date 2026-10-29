"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { TYPES, formatPrice, searchProducts } from "@/lib/catalog";

const POPULAR = ["Seven Sisters", "Candle", "Soap bar", "Body butter", "Essential oil", "Mug"];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(-1);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => (q.trim().length > 1 ? searchProducts(q).slice(0, 6) : []), [q]);
  const cats = useMemo(() => (q.trim().length > 1 ? TYPES.filter((t) => t.name.toLowerCase().includes(q.trim().toLowerCase())) : []), [q]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => input.current?.focus(), 50);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="absolute inset-0 bg-evergreen/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fadein relative max-h-[90vh] overflow-y-auto bg-ivory px-5 pt-6 pb-10 md:px-10">
        <div className="mx-auto max-w-3xl">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              if (idx >= 0 && results[idx]) go(`/shop/${results[idx].slug}`);
              else go(`/shop?q=${encodeURIComponent(q.trim())}`);
            }}
            className="flex items-center gap-3 border-b-2 border-forest pb-3"
          >
            <Search className="h-6 w-6 shrink-0 text-forest" aria-hidden />
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input
              id="site-search"
              ref={input}
              value={q}
              onChange={(e) => { setQ(e.target.value); setIdx(-1); }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(results.length - 1, i + 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(-1, i - 1)); }
              }}
              placeholder="Search candles, soaps, the Seven Sisters book…"
              className="font-display w-full bg-transparent text-2xl outline-none placeholder:text-charcoal/35 md:text-3xl"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls="search-results"
              aria-activedescendant={idx >= 0 ? `sr-${idx}` : undefined}
              autoComplete="off"
            />
            {q && (
              <button type="button" aria-label="Clear search" onClick={() => { setQ(""); input.current?.focus(); }} className="p-1 text-charcoal/60 hover:text-charcoal">
                <X className="h-5 w-5" />
              </button>
            )}
            <button type="button" onClick={onClose} className="ml-2 text-xs font-semibold tracking-[0.14em] uppercase hover:text-forest">Close</button>
          </form>

          {q.trim().length < 2 ? (
            <div className="mt-8">
              <p className="eyebrow mb-3 text-terracotta">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((p) => (
                  <button key={p} onClick={() => setQ(p)} className="border border-charcoal/15 px-4 py-2 text-sm hover:border-forest hover:text-forest">{p}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              {cats.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <Link key={c.slug} href={`/shop?category=${c.slug}`} onClick={onClose} className="bg-cream px-3 py-1.5 text-sm hover:bg-sage/40">Category: {c.name}</Link>
                  ))}
                </div>
              )}
              {results.length ? (
                <ul id="search-results" role="listbox" className="divide-y divide-charcoal/10">
                  {results.map((p, i) => (
                    <li key={p.slug} id={`sr-${i}`} role="option" aria-selected={idx === i}>
                      <Link href={`/shop/${p.slug}`} onClick={onClose} className={`flex items-center gap-4 py-3 transition-colors ${idx === i ? "bg-cream" : "hover:bg-cream/60"}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images[0]} alt="" className="h-16 w-16 shrink-0 bg-cream object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold">{p.name}</span>
                          <span className="block text-xs text-charcoal/60">{p.brand} · {p.type}</span>
                        </span>
                        <span className="text-sm font-semibold text-forest">{p.price > 0 ? formatPrice(p.price) : "Unavailable"}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-10 text-center">
                  <p className="font-display text-2xl">No matches for “{q}”.</p>
                  <p className="mt-2 text-charcoal/70">Try a broader word like “soap,” “candle,” or “oil.”</p>
                </div>
              )}
              <button onClick={() => go(`/shop?q=${encodeURIComponent(q.trim())}`)} className="btn btn-outline mt-6">View all results</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
