"use client";
import { useEffect, useState } from "react";
import { Info, Loader2, Truck } from "lucide-react";
import { useCart } from "./CartProvider";
import { CA_PROVINCES, COUNTRIES, DEMO_RULES_NOTE, METHODS, US_STATES, estimateShipping, type Destination, type Method } from "@/lib/shipping";
import { formatPrice } from "@/lib/catalog";

export default function ShippingEstimator() {
  const { shipping, setShipping, subtotal, count } = useCart();
  const [dest, setDest] = useState<Destination>(shipping.dest);
  const [method, setMethod] = useState<Method>(shipping.method);
  const [error, setError] = useState<{ msg: string; field?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Sync once persisted state loads
  const [synced, setSynced] = useState(false);
  if (!synced && shipping.dest.postal) { setSynced(true); setDest(shipping.dest); setMethod(shipping.method); }

  const calc = (d = dest, m = method, silent = false) => {
    const r = estimateShipping(d, m, subtotal, count);
    if (!r.ok) {
      if (!silent) setError({ msg: r.error, field: r.field });
      setShipping({ dest: d, method: m, cost: null });
      setResult(null);
      return;
    }
    setError(null);
    setShipping({ dest: d, method: m, cost: r.cost });
    setResult(`${r.label} · ${r.eta} · ${r.cost === 0 ? "Free" : formatPrice(r.cost)}`);
  };

  // Recalculate when cart contents change after a successful estimate
  useEffect(() => {
    if (shipping.cost !== null) calc(shipping.dest, shipping.method, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal, count]);

  const regions = dest.country === "US" ? US_STATES : dest.country === "CA" ? CA_PROVINCES : [];
  const set = (patch: Partial<Destination>) => {
    const d = { ...dest, ...patch };
    setDest(d);
    setError(null);
    if (shipping.cost !== null) { setShipping({ dest: d, method, cost: null }); setResult(null); }
  };

  return (
    <section aria-labelledby="ship-h" className="border border-charcoal/10 bg-white p-5 md:p-6">
      <h2 id="ship-h" className="flex items-center gap-2 font-sans text-base font-bold"><Truck className="h-5 w-5 text-forest" /> Estimate shipping</h2>
      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); calc(); }, 450); }}
        className="mt-4 grid gap-3 sm:grid-cols-2"
      >
        <div>
          <label htmlFor="se-country" className="label">Country</label>
          <select id="se-country" className="field" value={dest.country} aria-invalid={error?.field === "country"} onChange={(e) => set({ country: e.target.value, region: "" })}>
            {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="se-region" className="label">{dest.country === "CA" ? "Province" : "State"}</label>
          <select id="se-region" className="field" value={dest.region} disabled={!regions.length} aria-invalid={error?.field === "region"} onChange={(e) => set({ region: e.target.value })}>
            <option value="">Select…</option>
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="se-postal" className="label">{dest.country === "CA" ? "Postal code" : "ZIP code"}</label>
          <input id="se-postal" className="field" value={dest.postal} aria-invalid={error?.field === "postal"} onChange={(e) => set({ postal: e.target.value })} autoComplete="postal-code" placeholder={dest.country === "CA" ? "K1A 0B1" : "90265"} />
        </div>
        <fieldset>
          <legend className="label">Method</legend>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(METHODS) as Method[]).map((m) => (
              <label key={m} className={`flex min-h-[46px] cursor-pointer items-center justify-center border text-sm ${method === m ? "border-forest bg-forest/5 font-semibold text-forest" : "border-[#d8d0c0]"}`}>
                <input type="radio" name="se-method" className="sr-only" checked={method === m} onChange={() => { setMethod(m); if (shipping.cost !== null) calc(dest, m); }} />
                {METHODS[m].label}
              </label>
            ))}
          </div>
        </fieldset>
        <button className="btn btn-primary sm:col-span-2" disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Calculate shipping"}</button>
      </form>
      <div aria-live="polite" className="mt-3">
        {error && <p className="err text-sm">{error.msg}</p>}
        {result && <p className="fadein bg-sage/25 px-3 py-2.5 text-sm font-semibold text-evergreen">{result}</p>}
      </div>
      <p className="mt-4 flex gap-2 text-xs leading-relaxed text-charcoal/60"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Illustrative demo estimate — not a live carrier rate. {DEMO_RULES_NOTE}</p>
    </section>
  );
}
