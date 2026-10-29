import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/data/content";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Greenbush Twins & Company — questions, orders, collaborations, and stories." };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s Grow Together">
        We’re more than curators — we’re collaborators in creativity. Whether you have a question about an order, want to share your story, or are an artist who’d like to collaborate, we’d love to hear from you.
      </PageHero>
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 pb-24 md:px-10 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside className="space-y-8 bg-cream/60 p-8 lg:self-start">
          <div><p className="eyebrow mb-2 text-terracotta">Main office</p><address className="not-italic">{SITE.address}</address></div>
          <div><p className="eyebrow mb-2 text-terracotta">Email</p><a href={`mailto:${SITE.email}`} className="break-all underline underline-offset-4">{SITE.email}</a></div>
          <div>
            <p className="eyebrow mb-2 text-terracotta">Follow us</p>
            <ul className="space-y-1.5">{SITE.socials.map((s) => <li key={s.name}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-forest">{s.name} ↗</a></li>)}</ul>
          </div>
        </aside>
      </div>
    </>
  );
}
