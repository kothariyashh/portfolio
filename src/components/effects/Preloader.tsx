"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1300);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-bg"
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          aria-hidden
        >
          <div className="relative">
            <motion.div
              className="grad-bg absolute -inset-6 rounded-[28px] blur-2xl"
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [0.7, 1.04, 1], opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Logo className="h-24 w-24" gradientId="ykGradLoader" />
            </motion.div>
          </div>
          <div className="h-[3px] w-40 overflow-hidden rounded-full border border-line bg-surface">
            <motion.span
              className="grad-bg block h-full w-2/5 rounded-full"
              animate={{ x: ["-100%", "350%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
