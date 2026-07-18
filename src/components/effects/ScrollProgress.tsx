"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="grad-bg fixed top-0 left-0 z-[1001] h-[3px] w-full origin-left shadow-[0_0_12px_#6c5ce7]"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
