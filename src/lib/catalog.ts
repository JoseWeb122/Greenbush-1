import raw from "@/data/products.json";

/** Maps 1:1 to WooCommerce Store API product fields (id, slug, name, prices, categories, images). */
export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  regularPrice: number;
  onSale: boolean;
  brand: string; // WooCommerce product_cat (maker / collection)
  type: string; // Derived product type used for discovery filters
  images: string[];
  short: string;
  description: string;
  inStock: boolean;
  sourceUrl: string;
};

export const products: Product[] = raw as Product[];

export const isPurchasable = (p: Product) => p.inStock && p.price > 0;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const TYPES: { name: string; slug: string; blurb: string }[] = [
  { name: "Books & Paper", slug: "books-paper", blurb: "Storybooks, journals, and colorable keepsakes." },
  { name: "Bath & Soap", slug: "bath-soap", blurb: "Small-batch soaps, steamers, and bath rituals." },
  { name: "Skin & Body Care", slug: "skin-body", blurb: "Whipped butters, lip balms, and lotions." },
  { name: "Home Fragrance", slug: "home-fragrance", blurb: "Soy candles, diffusers, and linen sprays." },
  { name: "Essential Oils & Wellness", slug: "oils-wellness", blurb: "Blends, roll-ons, and body oils." },
  { name: "Hair Care", slug: "hair-care", blurb: "Plastic-free shampoo and conditioner bars." },
  { name: "Home & Gifts", slug: "home-gifts", blurb: "Mugs, keepsakes, and reusable wraps." },
  { name: "Gift Sets", slug: "gift-sets", blurb: "Thoughtfully bundled gift bags." },
];

export const typeSlug = (name: string) => TYPES.find((t) => t.name === name)?.slug ?? "";
export const typeFromSlug = (slug: string) => TYPES.find((t) => t.slug === slug)?.name;

export const BRANDS = Array.from(new Set(products.map((p) => p.brand))).sort();

export const typeImage = (name: string) =>
  products.find((p) => p.type === name && p.images[0] && p.price > 0)?.images[0] ?? "/images/hero.jpg";

/** Highlight a curated set first for the "Featured" sort. */
export const FEATURED_SLUGS = [
  "seven-sisters-the-lantern-of-humanity",
  "carries-prairie-hand-poured-soy-candle",
  "carries-prairie-soap-bar",
  "room-and-linen-spray",
  "body-butter-grass-citrus-moss-lemongrass",
  "car-diffuser",
  "pioneer-polly",
  "tea-is-lifes-delight-white-mug-featuring-pioneer-polly",
];

export function searchProducts(q: string, list: Product[] = products) {
  const s = q.trim().toLowerCase();
  if (!s) return list;
  const terms = s.split(/\s+/);
  return list.filter((p) => {
    const hay = `${p.name} ${p.brand} ${p.type} ${p.short}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export function firstParagraph(p: Product, max = 140) {
  const text = p.short.replace(/^Order:.*\n+/, "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max).replace(/\s\S*$/, "") + "…" : text;
}

export function related(p: Product, n = 4) {
  return products
    .filter((x) => x.slug !== p.slug && (x.brand === p.brand || x.type === p.type) && x.price > 0)
    .slice(0, n);
}
