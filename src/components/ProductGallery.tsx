"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [box, setBox] = useState(false);
  const imgs = images.length ? images : ["/images/hero.jpg"];
  const next = (d: number) => setI((x) => (x + d + imgs.length) % imgs.length);

  useEffect(() => {
    if (!box) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBox(false);
      if (e.key === "ArrowRight") setI((x) => (x + 1) % imgs.length);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + imgs.length) % imgs.length);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [box, imgs.length]);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {imgs.length > 1 && (
        <div className="flex gap-3 md:flex-col" role="tablist" aria-label="Product images">
          {imgs.map((src, n) => (
            <button key={src} role="tab" aria-selected={i === n} aria-label={`Show image ${n + 1}`} onClick={() => setI(n)} className={`h-20 w-20 shrink-0 overflow-hidden border-2 transition ${i === n ? "border-forest" : "border-transparent opacity-70 hover:opacity-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1">
        <button onClick={() => setBox(true)} className="group relative block aspect-square w-full overflow-hidden bg-cream" aria-label="Open image zoom">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={imgs[i]} src={imgs[i]} alt={`${name} — image ${i + 1}`} className="fadein h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center bg-ivory/90"><ZoomIn className="h-5 w-5" /></span>
        </button>
      </div>
      {box && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-evergreen/95 p-4" role="dialog" aria-modal="true" aria-label="Image zoom">
          <button autoFocus onClick={() => setBox(false)} aria-label="Close zoom" className="absolute top-4 right-4 p-2 text-ivory"><X className="h-7 w-7" /></button>
          {imgs.length > 1 && <button onClick={() => next(-1)} aria-label="Previous image" className="absolute left-2 p-3 text-ivory"><ChevronLeft className="h-8 w-8" /></button>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgs[i]} alt={`${name} — enlarged`} className="max-h-[88vh] max-w-full object-contain" />
          {imgs.length > 1 && <button onClick={() => next(1)} aria-label="Next image" className="absolute right-2 p-3 text-ivory"><ChevronRight className="h-8 w-8" /></button>}
        </div>
      )}
    </div>
  );
}
