"use client";
import { Minus, Plus } from "lucide-react";
import { MAX_QTY } from "./CartProvider";

export default function QtyStepper({ value, onChange, min = 1, label, small }: { value: number; onChange: (n: number) => void; min?: number; label: string; small?: boolean }) {
  const h = small ? "h-9" : "h-12";
  return (
    <div className={`inline-flex items-center border border-charcoal/20 bg-white ${h}`}>
      <button type="button" aria-label={`Decrease quantity of ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))} className={`grid ${h} w-9 place-items-center disabled:opacity-30`}>
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        aria-label={`Quantity of ${label}`}
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
          if (!isNaN(n)) onChange(Math.min(MAX_QTY, Math.max(min, n)));
        }}
        className="w-9 bg-transparent text-center text-sm font-semibold outline-none"
      />
      <button type="button" aria-label={`Increase quantity of ${label}`} disabled={value >= MAX_QTY} onClick={() => onChange(Math.min(MAX_QTY, value + 1))} className={`grid ${h} w-9 place-items-center disabled:opacity-30`}>
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
