"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { firstParagraph, formatPrice, isPurchasable, type Product } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";

export default function QuickView({ p, onClose }: { p: Product; onClose: () => void }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[66] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={`Quick view: ${p.name}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="fadein relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-ivory md:grid-cols-2">
        <button autoFocus aria-label="Close quick view" onClick={onClose} className="absolute top-3 right-3 z-10 bg-ivory p-2"><X className="h-5 w-5" /></button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.images[0]} alt={p.name} className="aspect-square h-full w-full bg-cream object-cover" />
        <div className="flex flex-col p-7">
          <p className="eyebrow text-terracotta">{p.brand}</p>
          <h2 className="mt-2 text-3xl leading-tight">{p.name}</h2>
          <p className="mt-3 text-lg font-semibold text-forest">{p.price > 0 ? formatPrice(p.price) : "Price unavailable"}</p>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/75">{firstParagraph(p, 260)}</p>
          <div className="mt-auto pt-6">
            {isPurchasable(p) && (
              <div className="flex gap-3">
                <QtyStepper value={qty} onChange={setQty} label={p.name} />
                <button className="btn btn-primary flex-1" onClick={() => { add(p.slug, qty); onClose(); }}>Add to bag</button>
              </div>
            )}
            <Link href={`/shop/${p.slug}`} className="mt-4 inline-block text-sm underline underline-offset-4">View full details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
