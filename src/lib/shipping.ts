/**
 * ILLUSTRATIVE DEMO SHIPPING RULES — not Greenbush Twins' real rates.
 * Production: replace `estimateShipping` with a call to WooCommerce
 * (Store API /cart/update-customer + shipping zones / carrier plugin).
 */
export type Destination = { country: string; region: string; postal: string };
export type Method = "standard" | "expedited";

export const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "OTHER", name: "Other country" },
];

export const US_STATES = "AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY".split(" ");
export const CA_PROVINCES = "AB BC MB NB NL NS NT NU ON PE QC SK YT".split(" ");

export const METHODS: Record<Method, { label: string; eta: string }> = {
  standard: { label: "Standard", eta: "Est. 5–8 business days" },
  expedited: { label: "Expedited", eta: "Est. 2–4 business days" },
};

export type Estimate =
  | { ok: true; cost: number; label: string; eta: string }
  | { ok: false; error: string; field?: keyof Destination };

export function validateDestination(d: Destination): Estimate | null {
  if (!d.country) return { ok: false, error: "Please choose a country.", field: "country" };
  if (d.country === "OTHER")
    return { ok: false, error: "We can’t estimate shipping to this destination in the demo. Please contact us for international orders.", field: "country" };
  if (!d.region) return { ok: false, error: d.country === "US" ? "Please choose a state." : "Please choose a province.", field: "region" };
  if (d.country === "US" && !/^\d{5}(-\d{4})?$/.test(d.postal.trim()))
    return { ok: false, error: "Enter a valid 5-digit ZIP code.", field: "postal" };
  if (d.country === "CA" && !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(d.postal.trim()))
    return { ok: false, error: "Enter a valid postal code (e.g., K1A 0B1).", field: "postal" };
  return null;
}

export function estimateShipping(d: Destination, method: Method, subtotal: number, itemCount: number): Estimate {
  const invalid = validateDestination(d);
  if (invalid) return invalid;
  let base = d.country === "US" ? 6.95 : 16.95;
  if (d.country === "US" && (d.region === "AK" || d.region === "HI")) base += 6;
  base += Math.max(0, itemCount - 1) * 1.25;
  if (method === "expedited") base = base * 1.8 + 4;
  if (method === "standard" && d.country === "US" && subtotal >= 75) base = 0;
  return { ok: true, cost: Math.round(base * 100) / 100, label: METHODS[method].label, eta: METHODS[method].eta };
}

export const DEMO_RULES_NOTE =
  "Demo rules: US standard $6.95 + $1.25 per extra item (AK/HI +$6), free US standard over $75; Canada from $16.95; expedited ≈1.8× + $4. Real rates will come from WooCommerce shipping zones.";
