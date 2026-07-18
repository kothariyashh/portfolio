"use client";

import { useEffect, useRef } from "react";

export default function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, [data-cursor]");
      ring.classList.toggle("cursor-hover", Boolean(interactive));
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-fx pointer-events-none fixed top-0 left-0 z-[1002] h-[7px] w-[7px] rounded-full bg-accent"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="cursor-fx pointer-events-none fixed top-0 left-0 z-[1002] h-[38px] w-[38px] rounded-full border-[1.5px] border-primary opacity-70 transition-[width,height,border-color] duration-200 [&.cursor-hover]:h-[62px] [&.cursor-hover]:w-[62px] [&.cursor-hover]:border-accent"
        aria-hidden
      />
    </>
  );
}
