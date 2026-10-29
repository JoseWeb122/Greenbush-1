import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { STORIES, eventStatus, formatDate, type Story } from "@/data/content";
import { products, searchProducts } from "@/lib/catalog";
import StoryCard, { storyImage } from "./StoryCard";
import ProductCard from "./ProductCard";
import ShareButtons from "./ShareButtons";

export default function StoryDetail({ s, section, sectionHref }: { s: Story; section: string; sectionHref: string }) {
  const status = eventStatus(s);
  const shop = s.shopQuery
    ? (products.filter((p) => p.brand.toLowerCase() === s.shopQuery!.toLowerCase()).length ? products.filter((p) => p.brand.toLowerCase() === s.shopQuery!.toLowerCase()) : searchProducts(s.shopQuery)).filter((p) => p.price > 0).slice(0, 4)
    : [];
  const more = STORIES.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <article className="pb-24">
      <div className="mx-auto max-w-[900px] px-5 pt-8 md:px-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-xs text-charcoal/60">
          <Link href="/" className="hover:text-forest">Home</Link><ChevronRight className="h-3 w-3" />
          <Link href={sectionHref} className="hover:text-forest">{section}</Link>
        </nav>
        <p className="eyebrow text-terracotta">{s.kind}{status && ` · ${status === "past" ? "Past event" : "Upcoming event"}`}</p>
        <h1 className="mt-4 text-5xl leading-[1.05] text-evergreen md:text-6xl">{s.title}</h1>
        {s.date && <p className="mt-4 font-semibold text-forest">{formatDate(s.date)}{s.endDate && ` – ${formatDate(s.endDate)}`}{s.location && ` · ${s.location}`}</p>}
        <p className="mt-5 text-xl leading-relaxed text-charcoal/75">{s.excerpt}</p>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] px-5 md:px-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={storyImage(s)} alt="" className="aspect-[16/8] w-full bg-cream object-cover" />
      </div>
      <div className="mx-auto mt-12 max-w-[720px] space-y-5 px-5 text-lg leading-relaxed text-charcoal/85">
        {s.body.map((b, i) => <p key={i}>{b}</p>)}
        <div className="flex flex-wrap items-center gap-4 border-t border-charcoal/10 pt-6">
          <ShareButtons title={s.title} />
          <Link href="/our-story" className="text-sm underline underline-offset-4">Our story</Link>
          <Link href="/shop" className="text-sm underline underline-offset-4">Visit the shop</Link>
        </div>
      </div>
      {shop.length > 0 && (
        <section className="mx-auto mt-20 max-w-[1440px] px-5 md:px-10">
          <h2 className="mb-8 text-4xl">Shop the Collection</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6">{shop.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
        </section>
      )}
      <section className="mx-auto mt-20 max-w-[1440px] px-5 md:px-10">
        <h2 className="mb-8 text-4xl">More Stories</h2>
        <div className="grid gap-10 md:grid-cols-3">{more.map((m) => <StoryCard key={m.slug} s={m} />)}</div>
      </section>
    </article>
  );
}
