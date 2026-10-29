"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BRANDS, FEATURED_SLUGS, TYPES, products, searchProducts, typeFromSlug } from "@/lib/catalog";
import ProductCard from "./ProductCard";

const PRICES = [
  { id: "u15", label: "Under $15", min: 0, max: 15 },
  { id: "15-25", label: "$15 – $25", min: 15, max: 25 },
  { id: "25-50", label: "$25 – $50", min: 25, max: 50 },
  { id: "50p", label: "$50 & up", min: 50, max: Infinity },
];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "alpha", label: "Alphabetical (A–Z)" },
];

export default function ShopClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = sp.get("q") ?? "";
  const cat = sp.get("category") ?? "";
  const brand = sp.get("brand") ?? "";
  const price = sp.get("price") ?? "";
  const sort = sp.get("sort") ?? "featured";
  const [draft, setDraft] = useState(q);
  const [panel, setPanel] = useState(false);
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) { setLastQ(q); setDraft(q); }

  const update = (patch: Record<string, string>) => {
    const n = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? n.set(k, v) : n.delete(k)));
    router.replace(`${pathname}${n.toString() ? `?${n}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    let l = searchProducts(q, products);
    const typeName = typeFromSlug(cat);
    if (typeName) l = l.filter((p) => p.type === typeName);
    if (brand) l = l.filter((p) => p.brand === brand);
    const pr = PRICES.find((x) => x.id === price);
    if (pr) l = l.filter((p) => p.price >= pr.min && p.price < pr.max);
    const s = [...l];
    if (sort === "price-asc") s.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") s.sort((a, b) => b.price - a.price);
    else if (sort === "alpha") s.sort((a, b) => a.name.localeCompare(b.name));
    else s.sort((a, b) => {
      const ia = FEATURED_SLUGS.indexOf(a.slug), ib = FEATURED_SLUGS.indexOf(b.slug);
      const r = (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      return r !== 0 ? r : Number(b.price > 0) - Number(a.price > 0);
    });
    return s;
  }, [q, cat, brand, price, sort]);

  const chips = [
    q && { k: "q", label: `“${q}”` },
    cat && { k: "category", label: typeFromSlug(cat) ?? cat },
    brand && { k: "brand", label: brand },
    price && { k: "price", label: PRICES.find((p) => p.id === price)?.label ?? price },
  ].filter(Boolean) as { k: string; label: string }[];

  const countFor = (slug: string) => {
    const n = typeFromSlug(slug);
    return searchProducts(q).filter((p) => p.type === n && (!brand || p.brand === brand)).length;
  };

  const Filters = (
    <div className="space-y-8">
      <fieldset>
        <legend className="eyebrow mb-3 text-terracotta">Category</legend>
        <ul className="space-y-1">
          <li><button onClick={() => update({ category: "" })} className={`w-full py-1.5 text-left text-sm ${!cat ? "font-bold text-forest" : "hover:text-forest"}`}>All products</button></li>
          {TYPES.map((t) => (
            <li key={t.slug}>
              <button onClick={() => update({ category: cat === t.slug ? "" : t.slug })} aria-pressed={cat === t.slug} className={`flex w-full justify-between py-1.5 text-left text-sm ${cat === t.slug ? "font-bold text-forest" : "hover:text-forest"}`}>
                <span>{t.name}</span><span className="text-charcoal/45">{countFor(t.slug)}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3 text-terracotta">Price</legend>
        <div className="space-y-2">
          {PRICES.map((p) => (
            <label key={p.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input type="radio" name="price" checked={price === p.id} onChange={() => update({ price: p.id })} className="h-4 w-4 accent-forest" />
              {p.label}
            </label>
          ))}
          {price && <button onClick={() => update({ price: "" })} className="text-xs underline">Any price</button>}
        </div>
      </fieldset>
      <fieldset>
        <legend className="eyebrow mb-3 text-terracotta">Maker</legend>
        <label htmlFor="brand" className="sr-only">Filter by maker</label>
        <select id="brand" value={brand} onChange={(e) => update({ brand: e.target.value })} className="field text-sm">
          <option value="">All makers</option>
          {BRANDS.map((b) => <option key={b}>{b}</option>)}
        </select>
      </fieldset>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10">
      <form role="search" onSubmit={(e) => { e.preventDefault(); update({ q: draft.trim() }); }} className="relative mb-8 max-w-2xl">
        <label htmlFor="shop-q" className="sr-only">Search products</label>
        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-charcoal/50" aria-hidden />
        <input id="shop-q" value={draft} onChange={(e) => { setDraft(e.target.value); if (!e.target.value) update({ q: "" }); }} placeholder="Search by name, scent, maker, or category…" className="field h-14 pr-28 pl-12 text-base" />
        {draft && <button type="button" aria-label="Clear search" onClick={() => { setDraft(""); update({ q: "" }); }} className="absolute top-1/2 right-24 -translate-y-1/2 p-2"><X className="h-4 w-4" /></button>}
        <button className="btn btn-primary absolute top-1 right-1 bottom-1 min-h-0 px-4">Search</button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-charcoal/10 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setPanel(true)} className="btn btn-outline min-h-10 px-4 lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
          <p className="text-sm" aria-live="polite"><strong>{list.length}</strong> {list.length === 1 ? "product" : "products"}</p>
          {chips.map((c) => (
            <button key={c.k} onClick={() => update({ [c.k]: "" })} className="flex items-center gap-1.5 bg-cream px-3 py-1.5 text-xs font-semibold hover:bg-sage/40" aria-label={`Remove filter ${c.label}`}>
              {c.label} <X className="h-3 w-3" />
            </button>
          ))}
          {chips.length > 0 && <button onClick={() => { setDraft(""); router.replace(pathname, { scroll: false }); }} className="text-xs underline underline-offset-2 hover:text-terracotta">Reset filters</button>}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-charcoal/70">Sort</label>
          <select id="sort" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? "" : e.target.value })} className="field min-h-10 w-auto py-1 text-sm">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block" aria-label="Product filters">{Filters}</aside>
        <div>
          {list.length ? (
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 min-[380px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-x-6">
              {list.map((p) => <ProductCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="bg-cream/60 px-6 py-20 text-center">
              <p className="font-display text-3xl">Nothing matches just yet.</p>
              <p className="mx-auto mt-3 max-w-md text-charcoal/70">Try a broader search term, remove a filter, or browse a popular category below.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <button onClick={() => { setDraft(""); router.replace(pathname); }} className="btn btn-primary">Reset filters</button>
                {TYPES.slice(0, 3).map((t) => <button key={t.slug} onClick={() => router.replace(`${pathname}?category=${t.slug}`)} className="btn btn-outline">{t.name}</button>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {panel && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-black/40" onClick={() => setPanel(false)} />
          <div className="fadein absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-ivory p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl">Filters</h2>
              <button aria-label="Close filters" onClick={() => setPanel(false)} className="p-2"><X className="h-5 w-5" /></button>
            </div>
            {Filters}
            <button onClick={() => setPanel(false)} className="btn btn-primary mt-8 w-full">Show {list.length} products</button>
          </div>
        </div>
      )}
    </div>
  );
}
