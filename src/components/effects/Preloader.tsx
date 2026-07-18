"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STREAM_TOKENS = [
  "$",
  "yash.ai",
  "--boot",
  "▸",
  "loading",
  "weights…",
  "▸",
  "vector",
  "store",
  "ready",
  "▸",
  "streaming",
  "response",
  "⚡",
];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    if (tokenCount < STREAM_TOKENS.length) {
      const t = setTimeout(() => setTokenCount((c) => c + 1), 90);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 420);
    return () => clearTimeout(t);
  }, [tokenCount]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-9 bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden
        >
          {/* neural core: spinning gradient ring + orbiting synapses */}
          <div className="relative h-28 w-28">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 10%, #6c5ce7 45%, #00cec9 70%, transparent 90%)",
                WebkitMask: "radial-gradient(circle, transparent 58%, black 62%)",
                mask: "radial-gradient(circle, transparent 58%, black 62%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 rounded-full"
              style={{
                background:
                  "conic-gradient(from 180deg, transparent 15%, #00cec9 50%, #a29bfe 75%, transparent 85%)",
                WebkitMask: "radial-gradient(circle, transparent 52%, black 57%)",
                mask: "radial-gradient(circle, transparent 52%, black 57%)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="grad-bg absolute inset-[38%] rounded-full"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 30px rgba(108,92,231,0.8)" }}
            />
          </div>

          {/* streaming LLM response line */}
          <div className="flex min-h-6 max-w-[90vw] flex-wrap items-center justify-center gap-x-2 font-mono text-sm text-dim">
            {STREAM_TOKENS.slice(0, tokenCount).map((token, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={
                  token === "yash.ai"
                    ? "gradient-text font-semibold"
                    : token === "⚡" || token === "▸"
                      ? "text-accent"
                      : undefined
                }
              >
                {token}
              </motion.span>
            ))}
            <motion.span
              className="inline-block h-4 w-[7px] bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
