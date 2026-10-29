import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop small-batch soaps, soy candles, body care, essential oils, and Seven Sisters: The Lantern of Humanity — curated by Greenbush Twins.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero eyebrow="The Greenbush Twins Shop" title="Thoughtfully Chosen, Made With Care">
        Discover products chosen for families who value care, comfort, and conscious living — from independent makers and trusted small brands.
      </PageHero>
      <Suspense fallback={<div className="h-96" />}>
        <ShopClient />
      </Suspense>
    </>
  );
}
