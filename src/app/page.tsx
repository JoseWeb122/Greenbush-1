import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import StoryCard from "@/components/StoryCard";
import NewsletterForm from "@/components/NewsletterForm";
import { FEATURED_SLUGS, TYPES, firstParagraph, formatPrice, getProduct, products, typeImage } from "@/lib/catalog";
import { SITE, STORIES, eventStatus } from "@/data/content";

export default function Home() {
  const featured = FEATURED_SLUGS.map(getProduct).filter((p) => p && p.price > 0).slice(0, 8);
  const book = getProduct("seven-sisters-the-lantern-of-humanity")!;
  const tiles = TYPES.slice(0, 5);
  const artists = STORIES.filter((s) => s.kind === "Artist" || s.kind === "Community").slice(0, 3);
  const events = [...STORIES.filter((s) => s.kind === "Event" && eventStatus(s) === "upcoming"), ...STORIES.filter((s) => s.kind === "Brand" || s.kind === "Community")].slice(0, 3);

  return (
    <>
      {/* A. Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 pt-6 pb-16 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-10 lg:pb-24">
          <div className="fadein order-2 lg:order-1">
            <p className="eyebrow text-terracotta">Meet Sidney Greenbush · Mindful living community</p>
            <h1 className="mt-5 text-[2.6rem] leading-[1.05] text-evergreen sm:text-6xl xl:text-7xl">
              Discover a More Thoughtful Way to Live, Create &amp; Connect.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">
              Explore thoughtfully curated products, inspiring stories, creative voices, and a community built around meaningful connections.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-primary">Explore the Collection <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/our-story" className="btn btn-outline">Discover Our Story</Link>
            </div>
            <p className="mt-10 text-sm text-charcoal/60">{products.filter((p) => p.price > 0).length} products from independent makers · Ships within the US &amp; Canada</p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-6 -right-6 hidden h-48 w-48 rounded-full bg-sage/40 blur-2xl lg:block" aria-hidden />
            <div className="relative aspect-[5/4] overflow-hidden rounded-t-[200px] sm:aspect-[4/3] lg:aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/hero.jpg" alt="Handmade soap, a soy candle, and an illustrated storybook on a farmhouse table in warm afternoon light" className="slowzoom h-full w-full object-cover" fetchPriority="high" />
            </div>
            <Link href={`/shop/${book.slug}`} className="absolute -bottom-6 left-4 flex max-w-[280px] items-center gap-4 bg-ivory p-3 pr-5 shadow-xl transition hover:-translate-y-1 sm:left-[-2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.images[0]} alt="" className="h-16 w-16 object-cover" />
              <span>
                <span className="eyebrow block text-[10px] text-terracotta">New by Sidney</span>
                <span className="font-display block leading-tight">Seven Sisters</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* B. Brand intro */}
      <section className="grain bg-cream/60 py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/community.jpg" alt="Artisan hands pouring a soy candle in a sunlit workshop" loading="lazy" className="aspect-[4/5] w-full rounded-br-[120px] object-cover" />
              <div className="absolute -bottom-8 -left-4 hidden bg-forest p-6 text-ivory md:block">
                <p className="font-display text-xl">“Every creation carries a piece of the person who made it.”</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-terracotta">From Little House to Big Hearts</p>
            <h2 className="mt-4 text-4xl leading-tight text-evergreen md:text-5xl">A Little More Meaning in the Everyday.</h2>
            <p className="mt-6 leading-relaxed text-charcoal/80">{SITE.mission}</p>
            <p className="mt-4 leading-relaxed text-charcoal/80">
              As part of our mission to grow a mindful living community, we continue to create spaces where intention, kindness, and shared purpose bring people together.
            </p>
            <Link href="/our-story" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.12em] uppercase text-forest hover:gap-3">Read our story <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* C. Shop the collection */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-terracotta">Our curated collection</p>
              <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">Sidney’s Picks for Care, Comfort &amp; Conscious Living</h2>
            </div>
            <Link href="/shop" className="btn btn-outline self-start md:self-auto">View all products</Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {featured.map((p) => <ProductCard key={p!.slug} p={p!} showBlurb />)}
          </div>
        </div>
      </section>

      {/* D. Shop by category */}
      <section className="bg-ivory pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal><p className="eyebrow text-terracotta">Shop by category</p><h2 className="mt-3 mb-10 text-4xl md:text-5xl">Find What You’re Looking For</h2></Reveal>
          <div className="grid gap-4 md:grid-cols-6 md:grid-rows-2 md:[height:640px]">
            {tiles.map((t, i) => (
              <Link
                key={t.slug}
                href={`/shop?category=${t.slug}`}
                className={`group relative block min-h-[220px] overflow-hidden bg-cream ${["md:col-span-3 md:row-span-2", "md:col-span-3", "md:col-span-1", "md:col-span-1", "md:col-span-1"][i]}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={typeImage(t.name)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-evergreen/85 via-evergreen/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-ivory md:p-7">
                  <h3 className={i < 2 ? "text-3xl md:text-4xl" : "text-xl"}>{t.name}</h3>
                  {i < 2 && <p className="mt-1 max-w-sm text-sm text-cream/85">{t.blurb}</p>}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">Explore <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {TYPES.slice(5).map((t) => <Link key={t.slug} href={`/shop?category=${t.slug}`} className="border border-charcoal/15 px-4 py-2 text-sm hover:border-forest hover:text-forest">{t.name}</Link>)}
          </div>
        </div>
      </section>

      {/* E. Featured product spotlight */}
      <section className="bg-evergreen py-20 text-ivory lg:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto max-w-md">
              <div className="absolute inset-0 translate-x-5 translate-y-5 border border-sage/50" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.images[0]} alt={`${book.name} — cover`} loading="lazy" className="relative aspect-square w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow text-sage">The first book in a new series by Sidney Greenbush</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Stories That Spark Imagination.</h2>
            <p className="font-display mt-5 text-2xl text-cream/90">{book.name}</p>
            <p className="mt-4 leading-relaxed text-cream/80">{firstParagraph(book, 420)}</p>
            <ul className="mt-5 space-y-1.5 text-sm text-cream/80">
              <li>· Recommended for children ages 2–9</li>
              <li>· Illustrated hardcover storybook</li>
              <li>· Limited edition, autographed by Sidney Greenbush</li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={`/shop/${book.slug}`} className="btn btn-light">Shop the book · {formatPrice(book.price)}</Link>
              <Link href="/community/seven-sisters-the-lantern-of-humanity" className="text-sm font-semibold tracking-[0.12em] uppercase underline underline-offset-4">Discover the story</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* F. Story */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/story.jpg" alt="Open prairie at golden hour with wildflowers and a weathered fence" loading="lazy" className="aspect-[16/11] w-full object-cover" />
          </Reveal>
          <Reveal delay={120} className="lg:pr-10">
            <p className="eyebrow text-terracotta">The Greenbush Twins story</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Rooted in Connection. Inspired by Possibility.</h2>
            <p className="mt-6 leading-relaxed text-charcoal/80">
              Many know Sidney and Lindsay Greenbush as Carrie Ingalls from <em>Little House on the Prairie</em>. Today, Greenbush Twins &amp; Company carries that legacy of warmth forward — bringing together families, creators, and conscious consumers who believe in living with purpose and supporting brands that do the same.
            </p>
            <Link href="/our-story" className="btn btn-primary mt-8">Read the full story</Link>
          </Reveal>
        </div>
      </section>

      {/* G. Community voices */}
      <section className="bg-cream/60 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow text-terracotta">Community &amp; creative voices</p>
              <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">Collaborate With Our Artisans</h2>
            </div>
            <Link href="/artists" className="btn btn-outline self-start md:self-auto">Meet the makers</Link>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            {artists.map((s, i) => <Reveal key={s.slug} delay={i * 100}><StoryCard s={s} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* H. Stories & events */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <Reveal className="mb-12 flex items-end justify-between gap-6">
            <div><p className="eyebrow text-terracotta">Stories, events &amp; updates</p><h2 className="mt-3 text-4xl md:text-5xl">What’s Happening</h2></div>
            <Link href="/stories" className="hidden text-sm font-semibold tracking-[0.12em] uppercase underline underline-offset-4 md:inline">All stories</Link>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {events[0] && <Reveal><StoryCard s={events[0]} large /></Reveal>}
            <div className="grid gap-10">
              {events.slice(1).map((s, i) => <Reveal key={s.slug} delay={(i + 1) * 100}><StoryCard s={s} /></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      {/* I. Newsletter */}
      <section className="bg-forest py-20 text-ivory">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow text-sage">Newsletter</p>
          <h2 className="mt-4 text-4xl md:text-5xl">A Thoughtful Note, Now and Then.</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/80">Discover new products, creative stories, and meaningful updates from Greenbush Twins.</p>
          <div className="mt-8 text-left"><NewsletterForm /></div>
        </div>
      </section>

      {/* J. Final CTA */}
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-evergreen/65" />
        <div className="relative mx-auto max-w-3xl px-5 py-28 text-center text-ivory lg:py-36">
          <h2 className="text-4xl leading-tight md:text-6xl">Find Something Meaningful to Bring Into Your World.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn btn-light">Explore the Shop</Link>
            <Link href="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const revalidate = 3600;
