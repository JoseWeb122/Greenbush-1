"use client";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./CartProvider";

export default function OrderSummary({ compact = false }: { compact?: boolean }) {
  const { lines, subtotal, shipping } = useCart();
  const total = subtotal + (shipping.cost ?? 0);
  return (
    <div className="bg-cream/70 p-5 md:p-6">
      <h2 className="font-sans text-base font-bold">Order summary</h2>
      {compact && (
        <ul className="mt-4 space-y-3">
          {lines.map((l) => (
            <li key={l.slug} className="flex items-center gap-3 text-sm">
              <span className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.product.images[0]} alt="" className="h-14 w-14 bg-white object-cover" />
                <span className="absolute -top-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-charcoal text-[10px] text-white">{l.qty}</span>
              </span>
              <span className="line-clamp-2 flex-1">{l.product.name}</span>
              <span className="font-semibold">{formatPrice(l.qty * l.product.price)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-4 space-y-2 border-t border-charcoal/10 pt-4 text-sm">
        <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between"><dt>Shipping <span className="text-charcoal/55">(demo estimate)</span></dt><dd>{shipping.cost === null ? "Calculate below" : shipping.cost === 0 ? "Free" : formatPrice(shipping.cost)}</dd></div>
        <div className="flex justify-between"><dt>Taxes</dt><dd className="text-charcoal/60">Calculated at checkout</dd></div>
        <div className="flex justify-between border-t border-charcoal/10 pt-3 text-base font-bold"><dt>Estimated total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
    </div>
  );
}
