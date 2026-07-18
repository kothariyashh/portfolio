"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";

const NAME = "YASH KOTHARI";
const RADIUS = 56;
const CIRC = 2 * Math.PI * RADIUS;

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setPct((p) => {
        const next = Math.min(p + 4 + Math.round(Math.random() * 5), 100);
        if (next >= 100) clearInterval(t);
        return next;
      });
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (pct >= 100) {
      const t = setTimeout(() => setDone(true), 350);
      return () => clearTimeout(t);
    }
  }, [pct]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 bg-bg"
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: "easeInOut" } }}
          aria-hidden
        >
          {/* progress ring wrapping the neural logo */}
          <div className="relative grid h-36 w-36 place-items-center">
            <svg viewBox="0 0 128 128" className="absolute inset-0 -rotate-90">
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" />
                  <stop offset="100%" stopColor="#00cec9" />
                </linearGradient>
              </defs>
              <circle cx="64" cy="64" r={RADIUS} fill="none" stroke="var(--line)" strokeWidth="3" />
              <motion.circle
                cx="64"
                cy="64"
                r={RADIUS}
                fill="none"
                stroke="url(#ringGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
                transition={{ duration: 0.12, ease: "linear" }}
              />
            </svg>
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="h-16 w-16 rounded-2xl shadow-xl shadow-primary/40" gradientId="ykGradLoader" />
            </motion.div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[11px] text-accent">
              {pct}%
            </span>
          </div>

          {/* staggered name reveal */}
          <div className="flex gap-[3px] font-display text-xl font-bold tracking-[0.3em]">
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.045, duration: 0.35 }}
                className={ch === " " ? "w-2" : undefined}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="-mt-4 font-mono text-[10px] tracking-[0.4em] text-dim uppercase"
          >
            AI Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
