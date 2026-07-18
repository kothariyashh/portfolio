"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";

const cards = [
  { icon: "✉️", title: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "📱", title: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  {
    icon: "💼",
    title: "LinkedIn",
    value: "linkedin.com/in/kothari-yash",
    href: profile.linkedin,
  },
  { icon: "🐙", title: "GitHub", value: "github.com/kothariyashh", href: profile.github },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Name": form.name,
          "Email": form.email,
          "Subject": form.subject,
          "Message": form.message,
          "Sent From": typeof window !== "undefined" ? window.location.origin : "portfolio",
          "Visitor Local Time": new Date().toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }),
          _subject: `📬 New portfolio message from ${form.name} · ${form.subject}`,
          _replyto: form.email,
          _template: "box",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      // delivery service unreachable: fall back to the visitor's mail client
      setStatus("error");
      const body = encodeURIComponent(
        `Hi Yash,\n\n${form.message}\n\nRegards,\n${form.name} (${form.email})`,
      );
      const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    }
  }

  const inputClass =
    "w-full rounded-xl border-[1.5px] border-line bg-bg px-4 py-3.5 text-sm outline-none transition-all placeholder:text-dim focus:border-primary focus:shadow-[0_0_0_4px_rgba(108,92,231,0.15)]";

  return (
    <section id="contact" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="08 · Let's Talk"
          title="Connect With"
          highlight="AI"
          sub="Have an AI product to build, a workflow to automate, or a role to fill? My inbox is always open."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            {cards.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-6 py-5 transition-all hover:translate-x-2 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
              >
                <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg text-xl">
                  {c.icon}
                </span>
                <div>
                  <strong className="block font-display text-sm font-bold">{c.title}</strong>
                  <small className="text-sm break-all text-dim">{c.value}</small>
                </div>
              </a>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-line bg-surface p-8 backdrop-blur-md"
            >
              <p className="mb-6 flex items-center gap-2 rounded-xl border border-accent/25 bg-accent/5 px-4 py-2.5 font-mono text-xs text-accent">
                <span className="status-dot h-2 w-2 rounded-full bg-emerald-500" />
                {"> new_session --with yash · response streams in real time ⚡"}
              </p>
              <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  required
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <input
                required
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={`${inputClass} mb-5`}
              />
              <textarea
                required
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} mb-6 resize-y`}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="grad-bg group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-display font-semibold text-white shadow-xl shadow-primary/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/50 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent ✓" : "Send Message"}
                {status !== "sending" && status !== "sent" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                )}
              </button>
              {status === "sent" && (
                <p className="mt-4 text-center text-sm text-accent">
                  Thanks for reaching out! Your message landed in my inbox and I&apos;ll reply soon.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
