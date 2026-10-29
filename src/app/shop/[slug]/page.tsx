import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { firstParagraph, formatPrice, getProduct, products, related, typeSlug } from "@/lib/catalog";
import ProductGallery from "@/components/ProductGallery";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return { title: "Product not found" };
  return { title: p.name, description: firstParagraph(p, 155), openGraph: { images: p.images.slice(0, 1) } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const rel = related(p);
  const details = (p.description || "").trim();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.images, description: firstParagraph(p, 300), brand: { "@type": "Brand", name: p.brand },
    ...(p.price > 0 && { offers: { "@type": "Offer", priceCurrency: "USD", price: p.price.toFixed(2), availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" } }),
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-6 pb-24 md:px-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-charcoal/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-forest">Home</Link></li><ChevronRight className="h-3 w-3" />
          <li><Link href="/shop" className="hover:text-forest">Shop</Link></li><ChevronRight className="h-3 w-3" />
          <li><Link href={`/shop?category=${typeSlug(p.type)}`} className="hover:text-forest">{p.type}</Link></li><ChevronRight className="h-3 w-3" />
          <li aria-current="page" className="text-charcoal">{p.name}</li>
        </ol>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ProductGallery images={p.images} name={p.name} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Link href={`/shop?brand=${encodeURIComponent(p.brand)}`} className="eyebrow text-terracotta hover:underline">{p.brand}</Link>
          <h1 className="mt-3 text-4xl leading-tight text-evergreen md:text-5xl">{p.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-forest">
            {p.price > 0 ? formatPrice(p.price) : "Price currently unavailable"}
            {p.onSale && <s className="ml-3 text-lg font-normal text-charcoal/50">{formatPrice(p.regularPrice)}</s>}
          </p>
          <div className="mt-6 space-y-3 leading-relaxed whitespace-pre-line text-charcoal/80">{p.short}</div>
          <div className="mt-8"><AddToCart p={p} /></div>
          <div className="mt-10 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {details && (
              <details className="group py-4" open>
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">Product details <span className="transition group-open:rotate-45">+</span></summary>
                <div className="mt-3 max-h-80 overflow-y-auto text-sm leading-relaxed whitespace-pre-line text-charcoal/75">{details}</div>
              </details>
            )}
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">Shipping &amp; delivery <span className="transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">Estimate shipping for your address in your <Link href="/cart" className="underline">bag</Link>. In this prototype, estimates use illustrative demo rules; live rates will come from the store’s WooCommerce shipping zones. See our <Link href="/policies/shipping" className="underline">Shipping Policy</Link>.</p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">Returns <span className="transition group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/75">Please review our <Link href="/policies/returns" className="underline">Returns &amp; Refunds Policy</Link> or <Link href="/contact" className="underline">contact us</Link> with any questions about your order.</p>
            </details>
          </div>
        </div>
      </div>
      {rel.length > 0 && (
        <section className="mt-24">
          <h2 className="mb-10 text-4xl">You May Also Love</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-6">{rel.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
