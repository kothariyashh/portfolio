"use client";

import { motion } from "framer-motion";
import { skillBars, skillGroups } from "@/data/resume";
import Reveal from "@/components/effects/Reveal";
import SectionHead from "@/components/SectionHead";
import Chip from "@/components/Chip";
import Tilt from "@/components/effects/Tilt";

export default function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="03 · What I Work With" title="Technical" highlight="Skills" />

        <Reveal className="mx-auto mb-16 flex w-full max-w-[780px] flex-col gap-6">
          {skillBars.map((s, i) => (
            <div key={s.label}>
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span>{s.label}</span>
                <span className="font-mono text-xs text-accent">{s.level}%</span>
              </div>
              <div className="h-[9px] overflow-hidden rounded-full border border-line bg-surface">
                <motion.div
                  className="grad-bg bar-shine relative h-full overflow-hidden rounded-full shadow-[0_0_14px_rgba(108,92,231,0.6)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.3, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </Reveal>

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => {
            const feature = g.title === "GenAI & LLMs";
            const wide = g.title === "Data & Cloud";
            const span = feature
              ? "sm:col-span-2 lg:row-span-2"
              : wide
                ? "sm:col-span-2"
                : "";

            const inner = (
              <div
                className={`group relative flex h-full flex-col overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 ${
                  feature
                    ? "justify-center rounded-[calc(1.5rem-2px)] bg-bg p-8 backdrop-blur-2xl"
                    : "rounded-3xl border border-line bg-surface hover:border-accent"
                }`}
              >
                <span className="bento-shine" />
                <div className="mb-3.5 flex items-center gap-3">
                  <span
                    className={`grid shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      feature ? "h-16 w-16 text-4xl" : "h-11 w-11 text-xl"
                    }`}
                  >
                    {g.icon}
                  </span>
                  <h3 className={`font-display font-bold ${feature ? "text-2xl" : "text-base"}`}>
                    {g.title}
                  </h3>
                </div>
                {feature && (
                  <p className="mb-4 text-sm text-dim">
                    My daily toolkit: agentic systems, retrieval and prompt-optimized LLM apps
                    shipped to production.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <Chip key={item} label={item} />
                  ))}
                </div>
              </div>
            );

            return (
              <Reveal key={g.title} delay={i * 0.07} className={span}>
                {feature ? (
                  <div className="bento-ring h-full rounded-3xl p-[2px] shadow-2xl shadow-primary/30">
                    {inner}
                  </div>
                ) : (
                  <Tilt max={8} className="h-full">
                    {inner}
                  </Tilt>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
