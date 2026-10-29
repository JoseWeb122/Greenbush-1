"use client";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type F = { name: string; email: string; subject: string; message: string };
const SUBJECTS = ["Order question", "Share your story", "Artist collaboration", "Events & appearances", "Something else"];

export default function ContactForm() {
  const [f, setF] = useState<F>({ name: "", email: "", subject: "", message: "" });
  const [e, setE] = useState<Partial<F>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const set = (k: keyof F, v: string) => { setF({ ...f, [k]: v }); setE({ ...e, [k]: undefined }); };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const er: Partial<F> = {};
    if (!f.name.trim()) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) er.email = "Please enter a valid email address.";
    if (!f.subject) er.subject = "Please choose a subject.";
    if (f.message.trim().length < 10) er.message = "Please write a message of at least 10 characters.";
    setE(er);
    if (Object.keys(er).length) { document.getElementById(`cf-${Object.keys(er)[0]}`)?.focus(); return; }
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  if (state === "done")
    return (
      <div role="status" className="fadein border border-charcoal/10 bg-white p-10">
        <CheckCircle2 className="h-10 w-10 text-forest" />
        <h2 className="mt-4 text-3xl">Thank you, {f.name.split(" ")[0]}.</h2>
        <p className="mt-3 text-charcoal/75">Demo only: your message passed validation, but it was <strong>not sent</strong>. In production, this form will connect to the site’s email service. For now, please write to us directly by email.</p>
        <button onClick={() => { setF({ name: "", email: "", subject: "", message: "" }); setState("idle"); }} className="btn btn-outline mt-6">Send another message</button>
      </div>
    );

  const err = (k: keyof F) => e[k] && <p id={`cf-${k}-e`} className="err">{e[k]}</p>;
  return (
    <form noValidate onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="cf-name" className="label">Name <span className="text-terracotta">*</span></label>
        <input id="cf-name" className="field" value={f.name} onChange={(x) => set("name", x.target.value)} aria-invalid={!!e.name} aria-describedby="cf-name-e" autoComplete="name" />{err("name")}
      </div>
      <div>
        <label htmlFor="cf-email" className="label">Email <span className="text-terracotta">*</span></label>
        <input id="cf-email" type="email" className="field" value={f.email} onChange={(x) => set("email", x.target.value)} aria-invalid={!!e.email} aria-describedby="cf-email-e" autoComplete="email" />{err("email")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-subject" className="label">Subject <span className="text-terracotta">*</span></label>
        <select id="cf-subject" className="field" value={f.subject} onChange={(x) => set("subject", x.target.value)} aria-invalid={!!e.subject} aria-describedby="cf-subject-e">
          <option value="">Choose a subject…</option>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>{err("subject")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className="label">Message <span className="text-terracotta">*</span></label>
        <textarea id="cf-message" rows={6} className="field" value={f.message} onChange={(x) => set("message", x.target.value)} aria-invalid={!!e.message} aria-describedby="cf-message-e" />{err("message")}
      </div>
      <div className="sm:col-span-2">
        <button className="btn btn-primary" disabled={state === "loading"}>{state === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Send message"}</button>
        <p className="mt-3 text-xs text-charcoal/60">Demo form — submissions are validated in your browser and not delivered.</p>
      </div>
    </form>
  );
}
