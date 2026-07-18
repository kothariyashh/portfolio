"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Chip from "@/components/Chip";
import Reveal from "@/components/effects/Reveal";

const fileNames = [
  "multi_agent_assistant.py",
  "design_anything_editor.py",
  "foot_3d_modelling.py",
  "face_reverse_search.py",
  "doctor_booking_bot.py",
  "financial_doc_extraction.py",
  "enterprise_idp_platform.py",
  "recruitment_automation.py",
  "shipping_label_ner.py",
  "handwritten_form_ai.py",
];

const categoryMeta: Record<string, { label: string; color: string }> = {
  genai: { label: "GenAI & Agents", color: "#a29bfe" },
  docai: { label: "Document AI", color: "#fd79a8" },
  vision: { label: "Computer Vision", color: "#00cec9" },
  automation: { label: "Automation", color: "#ffa502" },
};

const CYCLE_MS = 6500;

export default function Projects() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const hovering = useRef(false);

  // auto-cycle through projects until the visitor takes over
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      if (!hovering.current) setActive((a) => (a + 1) % projects.length);
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, [auto]);

  // the Kothari.AI chatbot can jump to a category
  useEffect(() => {
    const onFilter = (e: Event) => {
      const cat = (e as CustomEvent<string>).detail;
      const idx = projects.findIndex((p) => cat === "all" || p.categories.includes(cat));
      if (idx >= 0) {
        setActive(idx);
        setAuto(false);
      }
    };
    window.addEventListener("yk:filter", onFilter);
    return () => window.removeEventListener("yk:filter", onFilter);
  }, []);

  const p = projects[active];
  const meta = categoryMeta[p.categories[0]];

  return (
    <section id="projects" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="05 · What I've Built"
          title="Project"
          highlight="Explorer"
          sub="Ten production AI platforms across GenAI, vision, healthcare, finance and logistics. Pick a file, or let it cycle."
        />

        <Reveal>
          <div
            className="overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl shadow-black/25"
            onMouseEnter={() => (hovering.current = true)}
            onMouseLeave={() => (hovering.current = false)}
          >
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-dim">
                ~/yash/projects · {projects.length} files
              </span>
              <button
                onClick={() => setAuto((a) => !a)}
                className={`ml-auto flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors ${
                  auto
                    ? "border-accent/30 bg-accent/10 text-accent"
                    : "border-line text-dim hover:text-body"
                }`}
                title={auto ? "Auto-cycling · click to pause" : "Paused · click to resume"}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${auto ? "status-dot bg-accent" : "bg-dim"}`} />
                {auto ? "auto-cycle" : "paused"}
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* file sidebar */}
              <aside className="flex gap-1 overflow-x-auto border-b border-line bg-surface/50 p-3 lg:w-80 lg:flex-col lg:overflow-visible lg:border-r lg:border-b-0">
                <p className="mb-1 hidden px-3 pt-1 font-mono text-[10px] tracking-widest text-dim uppercase lg:block">
                  Explorer
                </p>
                {projects.map((proj, i) => {
                  const m = categoryMeta[proj.categories[0]];
                  const isActive = i === active;
                  return (
                    <button
                      key={proj.title}
                      onClick={() => {
                        setActive(i);
                        setAuto(false);
                      }}
                      className={`group relative flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left font-mono text-[12px] transition-all ${
                        isActive
                          ? "bg-chipbg text-body shadow-lg shadow-primary/10"
                          : "text-dim hover:bg-surface hover:text-body"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="file-rail"
                          className="grad-bg absolute top-1.5 bottom-1.5 left-0 hidden w-[3px] rounded-full lg:block"
                        />
                      )}
                      <span className="text-sm">{proj.emoji}</span>
                      <span className="whitespace-nowrap">{fileNames[i]}</span>
                      <span
                        className="ml-auto hidden h-2 w-2 shrink-0 rounded-full lg:block"
                        style={{ background: m.color, opacity: isActive ? 1 : 0.45 }}
                      />
                      {/* auto-cycle progress on the active file */}
                      {isActive && auto && (
                        <motion.span
                          key={`progress-${active}`}
                          className="absolute right-2 bottom-1 left-2 hidden h-[2px] origin-left rounded-full bg-accent/40 lg:block"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                        />
                      )}
                    </button>
                  );
                })}
              </aside>

              {/* detail pane */}
              <div className="relative min-h-[380px] flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col p-7 md:p-10"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl">
                        {p.emoji}
                      </span>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: meta.color }}>
                          {meta.label}
                        </p>
                        <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                      </div>
                      {p.flagship && (
                        <span className="badge-glow grad-bg ml-auto rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                          ⭐ Flagship
                        </span>
                      )}
                    </div>

                    {/* editor-style body with a comment gutter */}
                    <div className="mb-6 flex flex-1 gap-4 border-l-2 pl-4" style={{ borderColor: `${meta.color}55` }}>
                      <p className="text-sm leading-relaxed text-dim">
                        <span className="font-mono text-xs" style={{ color: meta.color }}>
                          {'""" '}
                        </span>
                        {p.description}
                        <span className="font-mono text-xs" style={{ color: meta.color }}>
                          {' """'}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-line pt-5">
                      <span className="mr-1 font-mono text-[10px] tracking-widest text-dim uppercase">
                        import
                      </span>
                      {p.tags.map((t) => (
                        <Chip key={t} label={t} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
