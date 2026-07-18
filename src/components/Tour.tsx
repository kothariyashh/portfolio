"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = { target: string; title: string; text: string };

const STEPS: Step[] = [
  {
    target: "#home",
    title: "Welcome! 👋",
    text: "This is Yash Kothari's AI portfolio. Let me show you around in a few quick steps.",
  },
  {
    target: "#about",
    title: "About Yash",
    text: "4+ years as a Data Scientist & AI Engineer, with live stats: projects delivered, fields automated and model accuracy.",
  },
  {
    target: "#experience",
    title: "Career Timeline",
    text: "His journey from data analyst intern to building production GenAI systems at Bacancy Technology.",
  },
  {
    target: "#skills",
    title: "Skill Map",
    text: "Animated proficiency bars plus a bento grid of his stack: GenAI, vision, data engineering and streaming.",
  },
  {
    target: "#engineering",
    title: "Engineering DNA",
    text: "How he builds for production: latency, concurrency, resilience, deployment, observability and security.",
  },
  {
    target: "#projects",
    title: "Featured Projects",
    text: "Six real AI platforms. Use the filters to browse by GenAI, Document AI, Computer Vision or Automation.",
  },
  {
    target: "#why-me",
    title: "The Business Case",
    text: "Business challenges he turned into outcomes, and why he's the right AI hire.",
  },
  {
    target: "#contact",
    title: "Get In Touch",
    text: "Message him right here (it lands in his inbox), or grab his email, phone and socials. That's the tour!",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

export default function Tour() {
  const [step, setStep] = useState(-1);
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const start = () => {
      setRect(null);
      setStep(0);
    };
    window.addEventListener("yk:starttour", start);
    return () => window.removeEventListener("yk:starttour", start);
  }, []);

  const close = useCallback(() => {
    setStep(-1);
    setRect(null);
  }, []);

  useEffect(() => {
    if (step < 0) return;
    const el = document.querySelector(STEPS[step].target);
    if (!el) return;
    setRect(null);
    el.scrollIntoView({ behavior: "smooth", block: step === 0 ? "start" : "center" });
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      const pad = 8;
      setRect({
        top: Math.max(r.top - pad, 8),
        left: Math.max(r.left - pad, 8),
        width: Math.min(r.width + pad * 2, window.innerWidth - 16),
        height: Math.min(r.height + pad * 2, window.innerHeight - 16),
      });
    }, 750);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [step, close]);

  if (step < 0) return null;
  const s = STEPS[step];

  return (
    <div className="fixed inset-0 z-[970]" role="dialog" aria-label="Site walkthrough">
      {/* spotlight ring: the huge box-shadow dims everything around the target */}
      <AnimatePresence>
        {rect && (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed rounded-3xl border-2 border-accent shadow-[0_0_0_9999px_rgba(5,5,15,0.6),0_0_40px_rgba(0,206,201,0.5)] transition-all duration-500"
            style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          />
        )}
      </AnimatePresence>

      {/* step card */}
      <motion.div
        key={`card-${step}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.4 }}
        className="fixed bottom-6 left-1/2 w-[min(440px,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl border border-line bg-bg p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] text-accent">
            Step {step + 1} of {STEPS.length}
          </span>
          <button
            onClick={close}
            aria-label="End tour"
            className="cursor-pointer text-dim transition-colors hover:text-body"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h3 className="mb-1.5 font-display text-lg font-bold">{s.title}</h3>
        <p className="mb-4 text-sm text-dim">{s.text}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "grad-bg w-5" : "w-1.5 bg-line"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep((v) => v - 1)}
                className="cursor-pointer rounded-xl border border-line px-4 py-2 font-display text-xs font-semibold text-dim transition-colors hover:text-body"
              >
                Back
              </button>
            )}
            <button
              onClick={() => (step === STEPS.length - 1 ? close() : setStep((v) => v + 1))}
              className="grad-bg cursor-pointer rounded-xl px-5 py-2 font-display text-xs font-semibold text-white shadow-lg shadow-primary/40 transition-transform hover:-translate-y-0.5"
            >
              {step === STEPS.length - 1 ? "Finish ✓" : "Next →"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
