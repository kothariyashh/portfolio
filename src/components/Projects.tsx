"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectFilters } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";

const categoryLabel: Record<string, string> = {
  genai: "GenAI & Agents",
  docai: "Document AI",
  vision: "Computer Vision",
  automation: "Automation",
};

function TechList({ tags }: { tags: string[] }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-line pt-4">
      {tags.map((t, i) => (
        <span key={t} className="flex items-center gap-2.5 font-mono text-[11px] text-dim">
          {t}
          {i < tags.length - 1 && <span className="text-accent/60">·</span>}
        </span>
      ))}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  // the Kothari.AI chatbot drives this filter too
  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<string>).detail);
    window.addEventListener("yk:filter", onFilter);
    return () => window.removeEventListener("yk:filter", onFilter);
  }, []);

  return (
    <section id="projects" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="05 · What I've Built" title="Featured" highlight="Projects" />

        <Reveal className="mb-12 flex flex-wrap justify-center gap-3">
          {projectFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`cursor-pointer rounded-full px-5 py-2 font-display text-sm font-semibold transition-all ${
                filter === f.key
                  ? "grad-bg text-white shadow-lg shadow-primary/40"
                  : "border border-line bg-surface text-dim hover:-translate-y-0.5 hover:border-primary hover:text-body"
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, idx) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={p.flagship ? "sm:col-span-2 lg:col-span-3" : ""}
              >
                {p.flagship ? (
                  <div className="bento-ring h-full rounded-3xl p-[1.5px] shadow-2xl shadow-primary/20">
                    <div className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-bg p-8 backdrop-blur-2xl md:flex-row md:items-center md:gap-10">
                      <span className="bento-shine" />
                      <div className="flex shrink-0 items-center gap-5 md:w-52 md:flex-col md:items-start md:gap-4">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-chipline bg-chipbg text-3xl transition-transform duration-300 group-hover:scale-110">
                          {p.emoji}
                        </span>
                        <div>
                          <span className="badge-glow grad-bg mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                            ⭐ Flagship
                          </span>
                          <p className="font-mono text-[10px] tracking-widest text-accent uppercase">
                            {categoryLabel[p.categories[0]]}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="mb-2.5 font-display text-2xl font-bold">{p.title}</h3>
                        <p className="mb-5 text-sm text-dim">{p.description}</p>
                        <TechList tags={p.tags} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Tilt max={6} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20">
                      <span className="grad-bg absolute top-0 left-0 h-[2.5px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                      <div className="mb-5 flex items-start justify-between">
                        <span className="grid h-13 w-13 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                          {p.emoji}
                        </span>
                        <span className="font-mono text-[11px] text-dim/60">0{idx + 1}</span>
                      </div>
                      <p className="mb-1.5 font-mono text-[10px] tracking-widest text-accent uppercase">
                        {categoryLabel[p.categories[0]]}
                      </p>
                      <h3 className="mb-2.5 font-display text-lg leading-snug font-bold transition-colors group-hover:text-primary-2">
                        {p.title}
                      </h3>
                      <p className="mb-5 flex-1 text-[13px] leading-relaxed text-dim">
                        {p.description}
                      </p>
                      <TechList tags={p.tags} />
                    </div>
                  </Tilt>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
