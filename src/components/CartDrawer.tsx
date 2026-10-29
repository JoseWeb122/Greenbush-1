"use client";
import Link from "next/link";
import { useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/catalog";
import QtyStepper from "./QtyStepper";

export default function CartDrawer() {
  const { drawerOpen: open, setDrawerOpen, lines, subtotal, setQty, remove, count, shipping } = useCart();
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, setDrawerOpen]);

  return (
    <div className={`fixed inset-0 z-[65] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setDrawerOpen(false)} />
      <aside role="dialog" aria-modal="true" aria-label="Shopping bag" className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
          <h2 className="text-2xl">Your Bag <span className="font-sans text-sm text-charcoal/60">({count})</span></h2>
          <button aria-label="Close bag" onClick={() => setDrawerOpen(false)} className="p-2" tabIndex={open ? 0 : -1}><X className="h-5 w-5" /></button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="h-10 w-10 text-sage" />
            <p className="font-display mt-4 text-2xl">Your bag is empty</p>
            <p className="mt-2 text-sm text-charcoal/70">Find something meaningful to bring into your world.</p>
            <Link href="/shop" onClick={() => setDrawerOpen(false)} className="btn btn-primary mt-6" tabIndex={open ? 0 : -1}>Explore the shop</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-charcoal/10 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4 py-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.product.images[0]} alt="" className="h-24 w-20 shrink-0 bg-cream object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link href={`/shop/${l.slug}`} onClick={() => setDrawerOpen(false)} className="line-clamp-2 text-sm font-semibold hover:text-forest">{l.product.name}</Link>
                    <p className="mt-0.5 text-xs text-charcoal/60">{formatPrice(l.product.price)} each</p>
                    <div className="mt-3 flex items-center justify-between">
                      <QtyStepper value={l.qty} onChange={(n) => setQty(l.slug, n)} min={1} label={l.product.name} small />
                      <span className="text-sm font-semibold">{formatPrice(l.qty * l.product.price)}</span>
                    </div>
                    <button onClick={() => remove(l.slug)} className="mt-2 text-xs text-charcoal/60 underline underline-offset-2 hover:text-terracotta">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-charcoal/10 bg-cream/60 px-6 py-5">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="mt-1 flex justify-between text-sm text-charcoal/70">
                <span>Shipping</span>
                <span>{shipping.cost === null ? "Estimate in bag" : shipping.cost === 0 ? "Free (demo estimate)" : `${formatPrice(shipping.cost)} (demo estimate)`}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={() => setDrawerOpen(false)} className="btn btn-outline">View bag</Link>
                <Link href="/checkout" onClick={() => setDrawerOpen(false)} className="btn btn-primary">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
