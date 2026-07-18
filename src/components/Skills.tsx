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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <Tilt max={8}>
                <div className="h-full rounded-2xl border border-line bg-surface p-7 transition-all hover:border-accent hover:shadow-2xl hover:shadow-accent/15">
                  <div className="mb-3.5 text-3xl">{g.icon}</div>
                  <h3 className="mb-4 font-display text-lg font-bold">{g.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
