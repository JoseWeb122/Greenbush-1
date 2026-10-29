"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Info, Loader2 } from "lucide-react";
import { useCart } from "./CartProvider";
import OrderSummary from "./OrderSummary";
import { CA_PROVINCES, COUNTRIES, METHODS, US_STATES, estimateShipping, type Method } from "@/lib/shipping";
import { formatPrice } from "@/lib/catalog";

type F = { email: string; first: string; last: string; phone: string; address: string; address2: string; city: string; country: string; region: string; postal: string };
const REQUIRED: (keyof F)[] = ["email", "first", "last", "address", "city", "country", "region", "postal"];

export default function CheckoutPreview() {
  const { lines, subtotal, count, shipping, setShipping, clear } = useCart();
  const [f, setF] = useState<F>({ email: "", first: "", last: "", phone: "", address: "", address2: "", city: "", country: shipping.dest.country || "US", region: shipping.dest.region, postal: shipping.dest.postal });
  const [method, setMethod] = useState<Method>(shipping.method);
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [ref] = useState(() => `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);

  const est = estimateShipping({ country: f.country, region: f.region, postal: f.postal }, method, subtotal, count);
  const regions = f.country === "US" ? US_STATES : f.country === "CA" ? CA_PROVINCES : [];

  const set = (k: keyof F, v: string) => {
    const nf = { ...f, [k]: v, ...(k === "country" ? { region: "" } : {}) };
    setF(nf);
    setErrors((e) => ({ ...e, [k]: undefined }));
    const r = estimateShipping({ country: nf.country, region: nf.region, postal: nf.postal }, method, subtotal, count);
    setShipping({ dest: { country: nf.country, region: nf.region, postal: nf.postal }, method, cost: r.ok ? r.cost : null });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof F, string>> = {};
    REQUIRED.forEach((k) => { if (!f[k].trim()) er[k] = "This field is required."; });
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) er.email = "Enter a valid email address.";
    if (!est.ok && est.field) er[est.field] = est.error;
    else if (!est.ok) er.country = est.error;
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`co-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  if (state === "done")
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-forest" />
        <p className="eyebrow mt-6 text-terracotta">Demo confirmation · {ref}</p>
        <h1 className="mt-3 text-5xl text-evergreen">Checkout preview complete</h1>
        <p className="mt-5 leading-relaxed text-charcoal/75">
          Thank you, {f.first}. Your details passed validation. <strong>This is a prototype: no order was placed, no payment was taken, and no email was sent.</strong> In production, this step hands off to the existing WooCommerce checkout and payment gateway.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/shop" onClick={clear} className="btn btn-primary">Clear bag &amp; keep browsing</Link>
          <Link href="/cart" className="btn btn-outline">Back to bag</Link>
        </div>
      </div>
    );

  if (!lines.length)
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="text-5xl text-evergreen">Checkout</h1>
        <p className="mt-4 text-charcoal/70">Your bag is empty — add a few things before checking out.</p>
        <Link href="/shop" className="btn btn-primary mt-8">Explore the shop</Link>
      </div>
    );

  const field = (k: keyof F, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, req = true) => (
    <div>
      <label htmlFor={`co-${k}`} className="label">{label}{req && <span className="text-terracotta"> *</span>}</label>
      <input id={`co-${k}`} className="field" value={f[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `co-${k}-e` : undefined} {...props} />
      {errors[k] && <p id={`co-${k}-e`} className="err">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-24 md:px-10">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft className="h-4 w-4" /> Back to bag</Link>
      <h1 className="mt-4 text-5xl text-evergreen">Checkout</h1>
      <p className="mt-3 flex items-start gap-2 bg-terracotta/10 px-4 py-3 text-sm text-charcoal/80"><Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" /> Demo checkout preview. No payment details are collected and no real order will be placed.</p>
      <form noValidate onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-display mb-2 text-2xl">Contact</legend>
            {field("email", "Email", { type: "email", autoComplete: "email" })}
            {field("phone", "Phone (optional)", { type: "tel", autoComplete: "tel" }, false)}
          </fieldset>
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="font-display mb-2 text-2xl">Shipping address</legend>
            {field("first", "First name", { autoComplete: "given-name" })}
            {field("last", "Last name", { autoComplete: "family-name" })}
            <div className="sm:col-span-2">{field("address", "Street address", { autoComplete: "address-line1" })}</div>
            <div className="sm:col-span-2">{field("address2", "Apartment, suite, etc. (optional)", { autoComplete: "address-line2" }, false)}</div>
            {field("city", "City", { autoComplete: "address-level2" })}
            <div>
              <label htmlFor="co-country" className="label">Country <span className="text-terracotta">*</span></label>
              <select id="co-country" className="field" value={f.country} onChange={(e) => set("country", e.target.value)} aria-invalid={!!errors.country}>
                {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              {errors.country && <p className="err">{errors.country}</p>}
            </div>
            <div>
              <label htmlFor="co-region" className="label">{f.country === "CA" ? "Province" : "State"} <span className="text-terracotta">*</span></label>
              <select id="co-region" className="field" value={f.region} disabled={!regions.length} onChange={(e) => set("region", e.target.value)} aria-invalid={!!errors.region}>
                <option value="">Select…</option>
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              {errors.region && <p className="err">{errors.region}</p>}
            </div>
            {field("postal", f.country === "CA" ? "Postal code" : "ZIP code", { autoComplete: "postal-code" })}
          </fieldset>
          <fieldset>
            <legend className="font-display mb-4 text-2xl">Shipping method</legend>
            <div className="space-y-3">
              {(Object.keys(METHODS) as Method[]).map((m) => {
                const r = estimateShipping({ country: f.country, region: f.region, postal: f.postal }, m, subtotal, count);
                return (
                  <label key={m} className={`flex cursor-pointer items-center gap-4 border p-4 ${method === m ? "border-forest bg-forest/5" : "border-[#d8d0c0] bg-white"}`}>
                    <input type="radio" name="method" checked={method === m} onChange={() => { setMethod(m); setShipping({ ...shipping, method: m, cost: r.ok ? r.cost : null }); }} className="h-4 w-4 accent-forest" />
                    <span className="flex-1"><span className="block font-semibold">{METHODS[m].label}</span><span className="text-sm text-charcoal/60">{METHODS[m].eta}</span></span>
                    <span className="text-sm font-semibold">{r.ok ? (r.cost === 0 ? "Free" : formatPrice(r.cost)) : "Enter address"}</span>
                  </label>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-charcoal/60">Illustrative demo rates. Live rates will come from WooCommerce shipping zones.</p>
          </fieldset>
          <fieldset>
            <legend className="font-display mb-3 text-2xl">Payment</legend>
            <p className="border border-dashed border-charcoal/25 bg-white p-5 text-sm text-charcoal/70">Payment is intentionally disabled in this prototype. In production, the existing WooCommerce payment gateway will appear here.</p>
          </fieldset>
        </div>
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <OrderSummary compact />
          <button className="btn btn-primary w-full" disabled={state === "loading"}>{state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Review demo order"}</button>
        </div>
      </form>
    </div>
  );
}
