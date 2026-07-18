"use client";

import { useEffect } from "react";

/**
 * Mouse-follow spotlight on every `.bg-surface` card, via event delegation:
 * writes --mx/--my custom properties consumed by the ::after overlay in globals.css.
 */
export default function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.(".bg-surface");
      if (!(target instanceof HTMLElement)) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
