"use client";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const id = compact ? "nl-c" : "nl";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErr("Please enter a valid email address.");
    setErr("");
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  if (state === "done")
    return (
      <div role="status" className={`fadein ${compact ? "text-sm" : ""}`}>
        <p className={compact ? "font-semibold" : "font-display text-2xl"}>Thank you{name ? `, ${name}` : ""}!</p>
        <p className="mt-1 text-sm opacity-80">Demo only: your sign-up was validated, but no email was stored or sent. A mailing-list integration will be connected in production.</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={compact ? "flex gap-2" : "grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]"}>
        {!compact && (
          <div>
            <label htmlFor={`${id}-name`} className="sr-only">First name (optional)</label>
            <input id={`${id}-name`} value={name} onChange={(e) => setName(e.target.value)} placeholder="First name (optional)" className="field" autoComplete="given-name" />
          </div>
        )}
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
          <input id={`${id}-email`} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(""); }} placeholder="Email address" aria-invalid={!!err} aria-describedby={err ? `${id}-err` : undefined} className="field text-charcoal" autoComplete="email" />
        </div>
        <button className={`btn ${compact ? "btn-light px-4" : "btn-light"}`} disabled={state === "loading"}>
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </button>
      </div>
      {err && <p id={`${id}-err`} className="mt-2 text-sm text-[#f3b7a3]">{err}</p>}
      <p className="mt-3 text-xs opacity-70">We respect your inbox. See our <Link href="/policies/privacy" className="underline underline-offset-2">Privacy Policy</Link>.</p>
    </form>
  );
}
