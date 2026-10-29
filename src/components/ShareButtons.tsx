"use client";
import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

export default function ShareButtons({ title }: { title: string }) {
  const [msg, setMsg] = useState("");
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) { await navigator.share({ title, url }); setMsg("Shared!"); }
      else { await navigator.clipboard.writeText(url); setMsg("Link copied"); }
    } catch { setMsg(""); }
    setTimeout(() => setMsg(""), 2000);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setMsg("Link copied"); } catch { setMsg("Copy failed"); }
    setTimeout(() => setMsg(""), 2000);
  };
  const fb = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "noopener");
  return (
    <div className="flex items-center gap-2">
      <button onClick={share} className="btn btn-outline min-h-10 px-4"><Share2 className="h-4 w-4" /> Share</button>
      <button onClick={copy} aria-label="Copy link" className="grid h-10 w-10 place-items-center border border-charcoal/20 hover:border-forest"><Link2 className="h-4 w-4" /></button>
      <button onClick={fb} className="h-10 border border-charcoal/20 px-3 text-xs font-semibold hover:border-forest">Facebook</button>
      <span aria-live="polite" className="flex items-center gap-1 text-xs text-forest">{msg && <><Check className="h-3.5 w-3.5" />{msg}</>}</span>
    </div>
  );
}
