import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Greenbush Twins & Company — home" className={`group flex flex-col leading-none ${light ? "text-ivory" : "text-evergreen"}`}>
      <span className="font-display text-[1.55rem] tracking-tight">Greenbush Twins</span>
      <span className={`mt-1 text-[0.58rem] font-semibold tracking-[0.42em] uppercase ${light ? "text-sage" : "text-terracotta"}`}>&amp; Company</span>
    </Link>
  );
}
