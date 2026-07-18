"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Magnetic from "@/components/effects/Magnetic";
import Logo from "@/components/Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#engineering", label: "Engineering" },
  { href: "#projects", label: "Projects" },
  { href: "#why-me", label: "Why Me" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-navbg shadow-lg shadow-black/10 backdrop-blur-xl"
          : ""
      }`}
    >
      <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <Logo className="h-9 w-9 rounded-xl shadow-lg shadow-primary/40 transition-transform duration-300 hover:rotate-6" />
          <span>
            Yash<span className="text-accent">.</span>Kothari
          </span>
        </a>

        <nav
          className={`fixed top-[64px] right-0 left-0 flex flex-col gap-1 border-b border-line bg-navbg p-5 backdrop-blur-2xl transition-transform duration-400 md:static md:translate-y-0 md:flex-row md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none ${
            open ? "translate-y-0" : "-translate-y-[130%] md:translate-y-0"
          }`}
          aria-label="Primary"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                active === l.href ? "text-body" : "text-dim hover:bg-surface hover:text-body"
              }`}
            >
              {l.label}
              {active === l.href && (
                <span className="grad-bg absolute right-3.5 bottom-1 left-3.5 h-0.5 rounded-full" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.2}>
            <button
              onClick={() => {
                const order = ["dark", "light", "glass"];
                const current = order.indexOf(resolvedTheme ?? "dark");
                setTheme(order[(current + 1) % order.length]);
              }}
              aria-label="Cycle color theme (dark / light / glass)"
              title={mounted ? `Theme: ${resolvedTheme} (click to switch)` : "Theme"}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
            >
              {!mounted || resolvedTheme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
                </svg>
              ) : resolvedTheme === "light" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" opacity="0.4" />
                  <circle cx="12" cy="12" r="5" />
                </svg>
              )}
            </button>
          </Magnetic>

          <Magnetic strength={0.2} className="hidden md:inline-block">
            <a
              href="#contact"
              className="grad-bg inline-flex items-center rounded-xl px-5 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-primary/40 transition-shadow hover:shadow-xl hover:shadow-primary/50"
            >
              Hire Me
            </a>
          </Magnetic>

          <button
            className="flex flex-col gap-[5px] p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 rounded bg-body transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-body transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 rounded bg-body transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
