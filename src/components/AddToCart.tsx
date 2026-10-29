"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { formatPrice, isPurchasable, type Product } from "@/lib/catalog";
import { MAX_QTY, useCart } from "./CartProvider";
import QtyStepper from "./QtyStepper";

export default function AddToCart({ p }: { p: Product }) {
  const { add, lines } = useCart();
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const inBag = lines.find((l) => l.slug === p.slug)?.qty ?? 0;
  const room = MAX_QTY - inBag;

  if (!isPurchasable(p))
    return (
      <div className="bg-cream p-5 text-sm">
        This item isn’t available to order online right now. <Link href="/contact" className="underline">Contact us</Link> to ask about availability.
      </div>
    );

  const submit = () => {
    if (qty < 1 || qty > room) return;
    setState("loading");
    setTimeout(() => { add(p.slug, qty); setState("done"); setTimeout(() => setState("idle"), 2200); }, 350);
  };

  return (
    <div>
      <div className="flex gap-3">
        <QtyStepper value={Math.min(qty, Math.max(1, room))} onChange={setQty} label={p.name} />
        <button onClick={submit} disabled={room < 1 || state === "loading"} className={`btn flex-1 ${state === "done" ? "bg-sage text-evergreen" : "btn-primary"}`}>
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : state === "done" ? <><Check className="h-4 w-4" /> Added to bag</> : <>Add to bag · {formatPrice(p.price * qty)}</>}
        </button>
      </div>
      {room < 1 && <p className="err">You’ve reached the maximum of {MAX_QTY} for this item.</p>}
      {inBag > 0 && (
        <p className="mt-3 text-sm text-charcoal/70">{inBag} in your bag · <Link href="/cart" className="underline">View bag</Link> · <Link href="/checkout" className="underline">Checkout</Link></p>
      )}
    </div>
  );
}
