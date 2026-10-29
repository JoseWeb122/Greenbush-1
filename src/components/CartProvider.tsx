"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, isPurchasable, type Product } from "@/lib/catalog";
import type { Destination, Method } from "@/lib/shipping";

export const MAX_QTY = 10;
type Line = { slug: string; qty: number };
type ShipState = { dest: Destination; method: Method; cost: number | null };

type Ctx = {
  lines: (Line & { product: Product })[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (o: boolean) => void;
  toast: string | null;
  shipping: ShipState;
  setShipping: (s: ShipState) => void;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "gbt-cart-v1";
const SKEY = "gbt-ship-v1";
const defaultShip: ShipState = { dest: { country: "US", region: "", postal: "" }, method: "standard", cost: null };

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [shipping, setShippingState] = useState<ShipState>(defaultShip);

  useEffect(() => {
    try {
      const c = JSON.parse(localStorage.getItem(KEY) || "[]");
      const s = JSON.parse(localStorage.getItem(SKEY) || "null");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (Array.isArray(c)) setRaw(c.filter((l: Line) => getProduct(l.slug)));
      if (s) setShippingState(s);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(raw));
  }, [raw, loaded]);

  const setShipping = useCallback((s: ShipState) => {
    setShippingState(s);
    localStorage.setItem(SKEY, JSON.stringify(s));
  }, []);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast(null), 2600);
  };

  const add = useCallback((slug: string, qty = 1) => {
    const p = getProduct(slug);
    if (!p || !isPurchasable(p)) return;
    setRaw((r) => {
      const ex = r.find((l) => l.slug === slug);
      if (ex) return r.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      return [...r, { slug, qty: Math.min(MAX_QTY, qty) }];
    });
    flash(`Added to your bag: ${p.name}`);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((r) => (qty <= 0 ? r.filter((l) => l.slug !== slug) : r.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))));
  }, []);
  const remove = useCallback((slug: string) => setRaw((r) => r.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setRaw([]), []);

  const lines = useMemo(() => raw.map((l) => ({ ...l, product: getProduct(l.slug)! })).filter((l) => l.product), [raw]);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = Math.round(lines.reduce((a, l) => a + l.qty * l.product.price, 0) * 100) / 100;

  return (
    <CartCtx.Provider value={{ lines, count, subtotal, add, setQty, remove, clear, drawerOpen, setDrawerOpen, toast, shipping, setShipping }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}
