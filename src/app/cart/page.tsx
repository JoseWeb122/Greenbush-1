import type { Metadata } from "next";
import CartPage from "@/components/CartPage";

export const metadata: Metadata = { title: "Your Bag", description: "Review your bag and estimate shipping." };

export default function Page() {
  return <CartPage />;
}
