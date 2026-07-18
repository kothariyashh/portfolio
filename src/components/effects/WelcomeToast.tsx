"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function WelcomeToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("yk-toast-seen")) return;
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem("yk-toast-seen", "1");
    setShow(false);
  }

  function openChat() {
    dismiss();
    window.dispatchEvent(new Event("yk:openchat"));
  }

  function startTour() {
    dismiss();
    window.dispatchEvent(new Event("yk:starttour"));
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[955] w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-line bg-bg p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl"
          role="status"
        >
          <div className="flex items-start gap-3.5">
            <span className="grad-bg grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg">
              👋
            </span>
            <div className="flex-1">
              <p className="mb-1 font-display text-sm font-bold">New here? Let me show you around</p>
              <p className="mb-3 text-xs text-dim">
                Take a quick guided tour, or chat with Kothari.AI, my assistant that knows everything on
                this site.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={startTour}
                  className="grad-bg cursor-pointer rounded-lg px-3.5 py-1.5 font-display text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Start the tour
                </button>
                <button
                  onClick={openChat}
                  className="cursor-pointer rounded-lg border border-accent/40 px-3.5 py-1.5 font-display text-xs font-semibold text-accent transition-all hover:-translate-y-0.5 hover:border-accent"
                >
                  Chat with Kothari.AI
                </button>
              </div>
            </div>
            <button onClick={dismiss} aria-label="Dismiss" className="cursor-pointer text-dim transition-colors hover:text-body">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
