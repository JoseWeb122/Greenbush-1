import type { ReactNode } from "react";

export default function PageHero({ eyebrow, title, children, image }: { eyebrow: string; title: string; children?: ReactNode; image?: string }) {
  if (image)
    return (
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-evergreen/85 to-evergreen/30" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 text-ivory md:px-10 lg:py-36">
          <p className="eyebrow text-sage">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
          {children && <p className="mt-6 max-w-xl text-lg text-cream/85">{children}</p>}
        </div>
      </section>
    );
  return (
    <section className="mx-auto max-w-[1440px] px-5 pt-10 pb-10 md:px-10 lg:pt-16">
      <p className="eyebrow text-terracotta">{eyebrow}</p>
      <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] text-evergreen md:text-6xl">{title}</h1>
      {children && <p className="mt-5 max-w-2xl text-lg text-charcoal/75">{children}</p>}
    </section>
  );
}
