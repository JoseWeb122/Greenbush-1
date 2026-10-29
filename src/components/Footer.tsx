import Link from "next/link";
import { SITE } from "@/data/content";
import { TYPES } from "@/lib/catalog";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-evergreen text-cream">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
            A mindful living community and maker network bringing together families, creators, and conscious consumers — one product, one story, one connection at a time.
          </p>
          <div className="mt-6 max-w-sm"><NewsletterForm compact /></div>
        </div>
        <div>
          <p className="eyebrow mb-4 text-sage">Shop</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link className="hover:text-white" href="/shop">All products</Link></li>
            {TYPES.slice(0, 6).map((t) => (
              <li key={t.slug}><Link className="text-cream/75 hover:text-white" href={`/shop?category=${t.slug}`}>{t.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-sage">Explore</p>
          <ul className="space-y-2.5 text-sm text-cream/75">
            <li><Link className="hover:text-white" href="/our-story">Our Story</Link></li>
            <li><Link className="hover:text-white" href="/community">Community</Link></li>
            <li><Link className="hover:text-white" href="/artists">Artists &amp; Creators</Link></li>
            <li><Link className="hover:text-white" href="/stories">Stories &amp; Events</Link></li>
            <li><Link className="hover:text-white" href="/cart">Shipping estimator</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-sage">Contact</p>
          <address className="space-y-2.5 text-sm not-italic text-cream/75">
            <p>{SITE.address}</p>
            <p><a className="break-all hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </address>
          <ul className="mt-5 flex flex-wrap gap-4 text-sm">
            {SITE.socials.map((s) => (
              <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-white hover:underline">{s.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Greenbush Twins &amp; Company. Redesign prototype — demo storefront.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link href="/policies/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/policies/shipping" className="hover:text-white">Shipping Policy</Link></li>
            <li><Link href="/policies/returns" className="hover:text-white">Returns &amp; Refunds</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
