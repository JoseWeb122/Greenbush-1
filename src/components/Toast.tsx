"use client";
import { Check } from "lucide-react";
import { useCart } from "./CartProvider";

export default function Toast() {
  const { toast, setDrawerOpen } = useCart();
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      {toast && (
        <div className="fadein pointer-events-auto flex items-center gap-3 bg-evergreen px-5 py-4 text-sm text-ivory shadow-2xl">
          <Check className="h-5 w-5 shrink-0 text-sage" />
          <span className="flex-1">{toast}</span>
          <button onClick={() => setDrawerOpen(true)} className="text-xs font-semibold tracking-[0.12em] uppercase underline underline-offset-4">View bag</button>
        </div>
      )}
    </div>
  );
}
