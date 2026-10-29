import Link from "next/link";
import { eventStatus, formatDate, type Story } from "@/data/content";
import { products, searchProducts } from "@/lib/catalog";

export function storyImage(s: Story) {
  if (s.image) return s.image;
  const p = s.shopQuery ? products.find((x) => x.brand.toLowerCase() === s.shopQuery!.toLowerCase()) ?? searchProducts(s.shopQuery)[0] : undefined;
  return p?.images[0] ?? "/images/community.jpg";
}

export function storyHref(s: Story) {
  return s.kind === "Artist" ? `/artists/${s.slug}` : s.kind === "Event" ? `/stories/${s.slug}` : `/community/${s.slug}`;
}

export default function StoryCard({ s, large = false }: { s: Story; large?: boolean }) {
  const status = eventStatus(s);
  return (
    <article className="group">
      <Link href={storyHref(s)} className="block">
        <div className={`relative overflow-hidden bg-cream ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={storyImage(s)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <span className="absolute top-3 left-3 bg-ivory/90 px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase">{s.kind}</span>
          {status && (
            <span className={`absolute top-3 right-3 px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase ${status === "past" ? "bg-charcoal text-white" : "bg-terracotta text-white"}`}>
              {status === "past" ? "Past event" : "Upcoming"}
            </span>
          )}
        </div>
        <div className="pt-5">
          {s.date && <p className="eyebrow text-terracotta">{formatDate(s.date)}{s.endDate ? ` – ${formatDate(s.endDate)}` : ""}{s.location ? ` · ${s.location}` : ""}</p>}
          <h3 className={`mt-2 leading-tight group-hover:text-forest ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}>{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.excerpt}</p>
          <span className="mt-3 inline-block text-xs font-semibold tracking-[0.14em] uppercase underline underline-offset-4">{s.kind === "Event" ? "View event" : "Read more"}</span>
        </div>
      </Link>
    </article>
  );
}
