import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-serif-face" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans-face" });

export const metadata: Metadata = {
  title: { default: "Greenbush Twins & Company — Mindful Living, Makers & Stories", template: "%s | Greenbush Twins" },
  description:
    "Thoughtfully curated, eco-minded goods from independent makers, Seven Sisters: The Lantern of Humanity by Sidney Greenbush, and a community built on meaningful connection.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3">
            Skip to content
          </a>
          <Header />
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer />
          <CartDrawer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
