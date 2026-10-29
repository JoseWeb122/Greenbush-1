import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { DEMO_RULES_NOTE } from "@/lib/shipping";

const POLICIES: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy Policy", body: ["This page is a placeholder in the redesign prototype. The final Privacy Policy will be carried over verbatim from the live Greenbush Twins website once approved by the owner.", "In this prototype, forms (newsletter, contact, checkout) are validated in your browser only. No personal information is stored or transmitted. Your bag is saved in your browser’s local storage so it persists between visits."] },
  terms: { title: "Terms & Conditions", body: ["This page is a placeholder in the redesign prototype. The final Terms & Conditions will be carried over from the live website once verified with the owner."] },
  shipping: { title: "Shipping Policy", body: ["This page is a placeholder in the redesign prototype. Verified shipping terms will be added from the live store before launch.", "The shipping estimator in this prototype uses illustrative rules only — not Greenbush Twins’ actual rates. " + DEMO_RULES_NOTE, "In production, rates will be calculated by the store’s configured WooCommerce shipping zones or carrier integration."] },
  returns: { title: "Returns & Refunds Policy", body: ["This page is a placeholder in the redesign prototype. The verified Returns & Refunds Policy will be carried over from the live website.", "Some products are handmade in small batches; individual makers’ notes on natural variation are preserved in each product’s details."] },
};

export function generateStaticParams() { return Object.keys(POLICIES).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = POLICIES[(await params).slug];
  return { title: p?.title ?? "Policy", robots: { index: false } };
}

export default async function Policy({ params }: { params: Promise<{ slug: string }> }) {
  const p = POLICIES[(await params).slug];
  if (!p) notFound();
  return (
    <>
      <PageHero eyebrow="Policies" title={p.title} />
      <div className="mx-auto max-w-[760px] space-y-5 px-5 pb-24 text-lg leading-relaxed text-charcoal/80">
        <p className="bg-terracotta/10 px-4 py-3 text-sm">Prototype placeholder — content to be verified with the owner.</p>
        {p.body.map((b, i) => <p key={i}>{b}</p>)}
        <p><Link href="/contact" className="underline underline-offset-4">Contact us</Link> with any questions.</p>
      </div>
    </>
  );
}
