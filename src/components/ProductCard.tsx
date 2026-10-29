"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Eye, Plus } from "lucide-react";
import { firstParagraph, formatPrice, isPurchasable, type Product } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import QuickView from "./QuickView";

export default function ProductCard({ p, showBlurb = false }: { p: Product; showBlurb?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qv, setQv] = useState(false);
  const buyable = isPurchasable(p);

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <Link href={`/shop/${p.slug}`} aria-label={p.name} className="block h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.images[0]} alt={p.name} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${p.images[1] ? "group-hover:opacity-0" : ""}`} />
          {p.images[1] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
          )}
        </Link>
        <span className="pointer-events-none absolute top-3 left-3 bg-ivory/90 px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase">{p.type}</span>
        {p.onSale && <span className="absolute top-3 right-3 bg-terracotta px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">Sale</span>}
        <button onClick={() => setQv(true)} className="absolute right-3 bottom-3 left-3 flex translate-y-2 items-center justify-center gap-2 bg-ivory/95 py-2.5 text-[11px] font-semibold tracking-[0.14em] uppercase opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 max-md:hidden">
          <Eye className="h-4 w-4" /> Quick view
        </button>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] tracking-[0.12em] text-charcoal/55 uppercase">{p.brand}</p>
        <h3 className="mt-1 font-sans text-[0.95rem] leading-snug font-semibold">
          <Link href={`/shop/${p.slug}`} className="hover:text-forest">{p.name}</Link>
        </h3>
        {showBlurb && <p className="mt-1.5 line-clamp-2 text-sm text-charcoal/65">{firstParagraph(p, 110)}</p>}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <p className="text-sm font-semibold text-forest">
            {p.price > 0 ? formatPrice(p.price) : <span className="text-charcoal/50">Price unavailable</span>}
            {p.onSale && <s className="ml-2 font-normal text-charcoal/50">{formatPrice(p.regularPrice)}</s>}
          </p>
          {buyable ? (
            <button
              onClick={() => { add(p.slug); setAdded(true); setTimeout(() => setAdded(false), 1600); }}
              aria-label={`Add ${p.name} to bag`}
              className={`flex h-10 items-center gap-1.5 px-3 text-[11px] font-semibold tracking-[0.1em] uppercase transition ${added ? "bg-sage text-evergreen" : "bg-forest text-white hover:bg-evergreen"}`}
            >
              {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              <span className="max-sm:hidden">{added ? "Added" : "Add"}</span>
            </button>
          ) : (
            <Link href={`/shop/${p.slug}`} className="text-xs underline underline-offset-2">Details</Link>
          )}
        </div>
      </div>
      {qv && <QuickView p={p} onClose={() => setQv(false)} />}
    </article>
  );
}
