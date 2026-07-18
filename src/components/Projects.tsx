"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, projectFilters } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Chip from "@/components/Chip";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter));

  // the Yash.AI chatbot drives this filter too
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
            {visible.map((p) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={p.flagship ? "sm:col-span-2 lg:col-span-3" : ""}
              >
                {p.flagship ? (
                  <div className="bento-ring h-full rounded-3xl p-[2px] shadow-2xl shadow-primary/25">
                    <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-[calc(1.5rem-2px)] bg-bg p-8 backdrop-blur-2xl md:flex-row md:items-center">
                      <span className="bento-shine" />
                      <div className="flex shrink-0 flex-col items-start gap-4 md:w-56">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-chipline bg-chipbg text-3xl">
                          {p.emoji}
                        </span>
                        <span className="badge-glow grad-bg rounded-full px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                          Flagship Project
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2.5 font-display text-2xl font-bold">{p.title}</h3>
                        <p className="mb-4 text-sm text-dim">{p.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <Chip key={t} label={t} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Tilt max={7} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                      <span className="grad-bg absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100" />
                      <div className="mb-4 flex items-center justify-between">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl">
                          {p.emoji}
                        </span>
                      </div>
                      <h3 className="mb-2.5 font-display text-lg font-bold">{p.title}</h3>
                      <p className="mb-4 flex-1 text-sm text-dim">{p.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <Chip key={t} label={t} />
                        ))}
                      </div>
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
