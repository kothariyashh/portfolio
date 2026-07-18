"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = {
  target: string;
  emoji: string;
  title: string;
  text: string;
  highlights: string[];
  tip: string;
};

const STEPS: Step[] = [
  {
    target: "#home",
    emoji: "👋",
    title: "Welcome to Yash's AI Portfolio",
    text: "A quick guided tour of everything on this site and where to find it.",
    highlights: [
      "⚡ Live neural-network background that reacts to your mouse",
      "⌨️ The typewriter shows what Yash builds",
      "📄 Grab his resume with the Resume button",
    ],
    tip: "Use ← → arrow keys to move through the tour, Esc to exit.",
  },
  {
    target: "#about",
    emoji: "🧑‍💻",
    title: "About & Live Stats",
    text: "Who Yash is, plus his numbers counting up live.",
    highlights: [
      "📊 4+ years experience, 15+ AI projects delivered",
      "🎯 80+ data fields automated, 96% best model accuracy",
      "🎓 B.E. from Marwadi University, based in Ahmedabad",
    ],
    tip: "Hover the stat cards, they tilt in 3D.",
  },
  {
    target: "#activity",
    emoji: "🟩",
    title: "Live Coding Activity",
    text: "A GitHub-style contribution heatmap, rendered live with a wave animation.",
    highlights: [
      "📅 A full year of commits with month-by-month labels",
      "🔥 Current streak and best-day counters",
      "✨ Hover any cell to see that day's contributions",
    ],
    tip: "The glowing cells are his heaviest shipping days.",
  },
  {
    target: "#experience",
    emoji: "💼",
    title: "Career Timeline",
    text: "His path from intern to production GenAI engineer.",
    highlights: [
      "🏢 Data Scientist @ Bacancy Technology (current)",
      "🧭 AI Implementation Strategist @ VanceIQ",
      "🔬 Face recognition at 96% accuracy as an intern",
    ],
    tip: "Each card lists the exact tech used in that role.",
  },
  {
    target: "#skills",
    emoji: "🛠️",
    title: "Skill Map",
    text: "Proficiency bars plus a bento grid of his full stack.",
    highlights: [
      "🤖 GenAI: OpenAI, Gemini, LangChain, LangGraph, RAG",
      "🔄 Data engineering: ETL, Airflow, Kafka, automation",
      "📡 Real-time: SSE token streaming, live AI responses",
    ],
    tip: "The glowing tile with the rotating border is his core focus.",
  },
  {
    target: "#engineering",
    emoji: "⚙️",
    title: "Engineering DNA",
    text: "The production engineering that surrounds his models.",
    highlights: [
      "⚡ Latency budgets, TTL caching, vector store caching",
      "🛡️ Circuit breakers, retries, regional fallbacks",
      "🚀 Docker, AWS ECS, GCP, GitHub Actions CI/CD",
    ],
    tip: "Hover a row, a gradient rail lights up on the left.",
  },
  {
    target: "#projects",
    emoji: "🚀",
    title: "Featured Projects",
    text: "Six real AI platforms, filterable by domain.",
    highlights: [
      "⭐ Flagship: multi-agent AI assistant with SSE streaming",
      "💰 GPT-4o system extracting 80+ financial fields",
      "🗂️ Filter by GenAI, Document AI, Vision or Automation",
    ],
    tip: "You can also ask the chatbot: 'show me his GenAI projects'.",
  },
  {
    target: "#why-me",
    emoji: "📈",
    title: "The Business Case",
    text: "Business problems he turned into shipped outcomes.",
    highlights: [
      "🧾 Manual back-office work automated away",
      "⏱️ 2× awarded for delivery under pressure",
      "🔍 Citation-grounded AI you can actually trust",
    ],
    tip: "Every strikethrough is a real problem he solved.",
  },
  {
    target: "#contact",
    emoji: "📬",
    title: "Get In Touch",
    text: "Everything you need to reach Yash, in one place.",
    highlights: [
      "✉️ The form delivers straight to his email inbox",
      "📱 Phone, LinkedIn and GitHub one click away",
      "🤖 Or keep chatting with Kothari.AI any time",
    ],
    tip: "That's the tour! The chat launcher stays in the bottom-left corner.",
  },
];

type Rect = { top: number; left: number; width: number; height: number };

export default function Tour() {
  const [step, setStep] = useState(-1);
  const [rect, setRect] = useState<Rect | null>(null);
  const [auto, setAuto] = useState(false);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

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
    setAuto(false);
  }, []);

  // auto-play, paced by how much there is to read on each step
  useEffect(() => {
    if (!auto || step < 0) return;
    const s = STEPS[step];
    const readingMs = 2600 + (s.text.length + s.highlights.join(" ").length) * 22;
    autoTimer.current = setTimeout(() => {
      setStep((v) => {
        if (v >= STEPS.length - 1) {
          setAuto(false);
          return v;
        }
        return v + 1;
      });
    }, readingMs);
    return () => {
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, [auto, step]);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setStep((v) => Math.min(v + 1, STEPS.length - 1));
      if (e.key === "ArrowLeft") setStep((v) => Math.max(v - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [step, close]);

  if (step < 0) return null;
  const s = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

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
            className="pointer-events-none fixed rounded-3xl border-2 border-accent shadow-[0_0_0_9999px_rgba(5,5,15,0.65),0_0_40px_rgba(0,206,201,0.5)] transition-all duration-500"
            style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
          />
        )}
      </AnimatePresence>

      {/* step card */}
      <motion.div
        key={`card-${step}`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.35 }}
        className="bento-ring fixed bottom-6 left-1/2 w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl p-[2px] shadow-2xl shadow-black/60"
      >
        <div className="overflow-hidden rounded-[calc(1.5rem-2px)] bg-bg backdrop-blur-2xl">
          {/* animated progress */}
          <div className="h-1 w-full bg-surface">
            <motion.div
              className="grad-bg h-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <motion.span
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl"
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                {s.emoji}
              </motion.span>
              <div className="flex-1">
                <span className="font-mono text-[10px] tracking-wider text-accent uppercase">
                  Step {step + 1} of {STEPS.length}
                </span>
                <h3 className="font-display text-lg leading-tight font-bold">{s.title}</h3>
              </div>
              <button
                onClick={() => setAuto((a) => !a)}
                title={auto ? "Pause autoplay" : "Autoplay the tour"}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-lg border transition-colors ${
                  auto ? "grad-bg border-transparent text-white" : "border-line text-dim hover:text-body"
                }`}
                aria-label={auto ? "Pause autoplay" : "Start autoplay"}
              >
                {auto ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z"/></svg>
                )}
              </button>
              <button
                onClick={close}
                aria-label="End tour"
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-line text-dim transition-colors hover:text-body"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="mb-3 text-sm text-dim">{s.text}</p>

            <ul className="mb-3 space-y-1.5">
              {s.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[12.5px] text-body"
                >
                  {h}
                </motion.li>
              ))}
            </ul>

            <p className="mb-4 text-[11.5px] text-dim italic">💡 {s.tip}</p>

            <div className="flex items-center justify-between">
              <div className="flex gap-1.5">
                {STEPS.map((st, i) => (
                  <button
                    key={st.target}
                    onClick={() => setStep(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                      i === step ? "grad-bg w-5" : "w-1.5 bg-line hover:bg-dim"
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
                    ← Back
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}
