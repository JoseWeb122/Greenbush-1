"use client";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";
import ShippingEstimator from "./ShippingEstimator";
import OrderSummary from "./OrderSummary";

export default function CartPage() {
  const { lines, setQty, remove, count } = useCart();
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-24 md:px-10">
      <h1 className="text-5xl text-evergreen">Your Bag</h1>
      <p className="mt-2 text-charcoal/70">{count} {count === 1 ? "item" : "items"}</p>
      {lines.length === 0 ? (
        <div className="mt-10 bg-cream/60 px-6 py-20 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-sage" />
          <p className="font-display mt-4 text-3xl">Your bag is empty</p>
          <p className="mt-2 text-charcoal/70">Discover soaps, candles, the Seven Sisters book, and more.</p>
          <Link href="/shop" className="btn btn-primary mt-6">Continue shopping</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
              {lines.map((l) => (
                <li key={l.slug} className="grid grid-cols-[88px_1fr] gap-4 py-6 sm:grid-cols-[110px_1fr_auto]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.product.images[0]} alt={l.product.name} className="aspect-[4/5] w-full bg-cream object-cover" />
                  <div>
                    <p className="text-[11px] tracking-[0.12em] text-charcoal/55 uppercase">{l.product.brand}</p>
                    <Link href={`/shop/${l.slug}`} className="font-semibold hover:text-forest">{l.product.name}</Link>
                    <p className="mt-1 text-sm text-charcoal/60">{formatPrice(l.product.price)} each</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <QtyStepper value={l.qty} onChange={(n) => setQty(l.slug, n)} label={l.product.name} small />
                      <button onClick={() => remove(l.slug)} className="flex items-center gap-1 text-xs text-charcoal/60 hover:text-terracotta"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                    </div>
                  </div>
                  <p className="col-start-2 font-semibold sm:col-start-3 sm:text-right">{formatPrice(l.qty * l.product.price)}</p>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> Continue shopping</Link>
          </div>
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <OrderSummary />
            <ShippingEstimator />
            <Link href="/checkout" className="btn btn-primary w-full">Proceed to checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
