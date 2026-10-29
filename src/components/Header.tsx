"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { TYPES } from "@/lib/catalog";
import SearchOverlay from "./SearchOverlay";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop", mega: true },
  { href: "/our-story", label: "Our Story" },
  { href: "/community", label: "Community" },
  { href: "/artists", label: "Artists & Creators" },
  { href: "/stories", label: "Stories & Events" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const { count, setDrawerOpen } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [mega, setMega] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobile(false);
    setMega(false);
  }, [pathname]);
  useEffect(() => {
    if (!count) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const active = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  return (
    <>
      {new Date() <= new Date("2026-09-13T23:59:59") ? (<div className="bg-evergreen px-4 py-2 text-center text-[0.72rem] tracking-[0.14em] text-cream uppercase">
        Join Sidney Robyn Greenbush at the Little House Cast Reunion · Nashville, Sept 11–13, 2026 ·{" "}
        <Link href="/stories/little-house-cast-reunion-nashville" className="underline underline-offset-4 hover:text-white">
          Details
        </Link>
      </div>) : (<div className="bg-evergreen px-4 py-2 text-center text-[0.72rem] tracking-[0.14em] text-cream uppercase">A mindful living community &amp; maker network · <Link href="/shop" className="underline underline-offset-4">Shop small makers</Link></div>)}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-ivory/95 shadow-[0_1px_0_rgba(0,0,0,.06)] backdrop-blur" : "bg-ivory"}`}
        onMouseLeave={() => setMega(false)}
      >
        <div className={`mx-auto flex max-w-[1440px] items-center gap-4 px-5 transition-all md:px-10 ${scrolled ? "h-16" : "h-20"}`}>
          <button className="-ml-2 p-2 lg:hidden" aria-label="Open menu" onClick={() => setMobile(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <Logo />
          <nav aria-label="Main" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7 text-[0.8rem] font-semibold tracking-[0.08em]">
              {NAV.map((n) => (
                <li key={n.href} onMouseEnter={() => setMega(!!n.mega)}>
                  <span className="flex items-center gap-1">
                    <Link href={n.href} className={`relative py-2 transition-colors hover:text-forest ${active(n.href) ? "text-forest after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-terracotta" : ""}`}>
                      {n.label}
                    </Link>
                    {n.mega && (
                      <button aria-label="Toggle shop categories" aria-expanded={mega} onClick={() => setMega((m) => !m)} className="p-1">
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mega ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-6">
            <button aria-label="Search products" className="p-2.5 hover:text-forest" onClick={() => setSearch(true)}>
              <Search className="h-5 w-5" />
            </button>
            <button aria-label={`Open shopping bag, ${count} items`} className="relative p-2.5 hover:text-forest" onClick={() => setDrawerOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className={`absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white ${bump ? "pop" : ""}`}>
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Shop mega menu */}
        <div className={`absolute inset-x-0 top-full hidden border-t border-black/5 bg-ivory shadow-xl transition-all duration-300 lg:block ${mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_1fr_1.2fr] gap-10 px-10 py-10">
            <div className="col-span-2">
              <p className="eyebrow mb-5 text-terracotta">Shop by category</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                {TYPES.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/shop?category=${t.slug}`} className="group block">
                      <span className="font-display text-xl group-hover:text-forest">{t.name}</span>
                      <span className="block text-sm text-charcoal/60">{t.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/shop/seven-sisters-the-lantern-of-humanity" className="group relative block overflow-hidden bg-evergreen p-8 text-ivory">
              <p className="eyebrow text-sage">By Sidney Greenbush</p>
              <p className="font-display mt-3 text-3xl leading-tight">Seven Sisters: The Lantern of Humanity</p>
              <p className="mt-3 text-sm text-cream/80">Autographed limited-edition hardcover, ages 2–9.</p>
              <span className="mt-6 inline-block text-xs font-semibold tracking-[0.14em] uppercase underline underline-offset-4">Discover the book</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobile ? "" : "pointer-events-none"}`} aria-hidden={!mobile}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobile ? "opacity-100" : "opacity-0"}`} onClick={() => setMobile(false)} />
        <nav aria-label="Mobile" className={`absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-ivory p-6 transition-transform duration-300 ${mobile ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button aria-label="Close menu" className="p-2" onClick={() => setMobile(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} tabIndex={mobile ? 0 : -1} className={`font-display block py-2.5 text-2xl ${active(n.href) ? "text-forest" : ""}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8 mb-3 text-terracotta">Shop categories</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {TYPES.map((t) => (
              <li key={t.slug}>
                <Link tabIndex={mobile ? 0 : -1} href={`/shop?category=${t.slug}`} className="block py-1.5 hover:text-forest">{t.name}</Link>
              </li>
            ))}
          </ul>
          <button tabIndex={mobile ? 0 : -1} className="btn btn-primary mt-8" onClick={() => { setMobile(false); setSearch(true); }}>
            <Search className="h-4 w-4" /> Search products
          </button>
        </nav>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
