import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { SITE, VALUES } from "@/data/content";
import { getProduct } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Our Story",
  description: "From Little House to big hearts — the story, mission, and values behind Greenbush Twins & Company.",
};

const PRINCIPLES = [
  { t: "Authenticity", d: "We lead with authenticity — creating spaces and products that reflect real stories, genuine intentions, and transparent craftsmanship." },
  { t: "Learning", d: "Curiosity fuels growth. We learn from one another, from our shared experiences, and from the creative voices that shape our community." },
  { t: "Trust", d: "Every relationship begins with trust — from the brands we recommend to the people we collaborate with." },
];

export default function OurStory() {
  const book = getProduct("seven-sisters-the-lantern-of-humanity")!;
  return (
    <>
      <PageHero eyebrow="Our story" title="From Little House to Big Hearts" image="/images/story.jpg">
        Creativity is about connection, not just products.
      </PageHero>

      <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:py-28">
        <Reveal><h2 className="text-4xl leading-tight text-evergreen md:text-5xl">Creativity Is About Connection, Not Just Products</h2></Reveal>
        <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-charcoal/80">
          <p>At Greenbush Twins &amp; Company, we believe creativity goes beyond design — it’s a way to connect, inspire, and build understanding. Every idea, product, and collaboration is rooted in the belief that imagination can bring people together across generations and backgrounds.</p>
          <p>{SITE.mission}</p>
          <p>Many fans first met Sidney and Lindsay Greenbush as Carrie Ingalls on <em>Little House on the Prairie</em>. That legacy of warmth, family, and the beauty of slowing down continues through the community, the makers we champion, and Sidney’s new storybook series.</p>
        </Reveal>
      </section>

      <section className="grain bg-cream/60 py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <p className="eyebrow text-terracotta">Our values</p>
          <h2 className="mt-3 mb-12 text-4xl md:text-5xl">A New Revolution, a New Perspective</h2>
          <div className="grid gap-px bg-charcoal/10 md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.t} delay={i * 100} className="h-full bg-ivory p-8">
                <p className="font-display text-5xl text-sage">0{i + 1}</p>
                <h3 className="mt-4 text-2xl">{p.t}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/75">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:py-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/community.jpg" alt="Hands crafting candles and soap at a workshop table" loading="lazy" className="aspect-[4/5] w-full rounded-tl-[140px] object-cover" />
        <div>
          <p className="eyebrow text-terracotta">Why join the Greenbush Twins family</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Building a Community That Cares</h2>
          <ul className="mt-8 space-y-6">
            {VALUES.map((v) => (
              <li key={v.title} className="border-l-2 border-sage pl-5">
                <h3 className="font-sans text-base font-bold">{v.title}</h3>
                <p className="mt-1 text-charcoal/75">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-evergreen py-20 text-ivory">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-5 md:grid-cols-[auto_1fr] md:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.images[0]} alt={book.name} loading="lazy" className="h-56 w-56 object-cover" />
          <div>
            <p className="eyebrow text-sage">From the shop</p>
            <h2 className="mt-3 text-4xl">Bring the story home</h2>
            <p className="mt-3 max-w-xl text-cream/80">Explore Sidney’s storybook, the Carrie’s Prairie collection, and small-batch goods from independent makers.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-light">Explore the shop</Link>
              <Link href="/community" className="btn btn-outline">Join the community</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
