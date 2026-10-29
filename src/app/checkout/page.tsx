import type { Metadata } from "next";
import CheckoutPreview from "@/components/CheckoutPreview";

export const metadata: Metadata = { title: "Checkout Preview", description: "Demo checkout preview for the Greenbush Twins storefront redesign.", robots: { index: false } };

export default function Page() {
  return <CheckoutPreview />;
}
