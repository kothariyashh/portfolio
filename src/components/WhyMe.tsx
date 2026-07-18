"use client";

import { motion } from "framer-motion";
import { whyHireMe } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Magnetic from "@/components/effects/Magnetic";

export default function WhyMe() {
  return (
    <section id="why-me" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="07 · The Business Case"
          title="Why Hire"
          highlight="Me"
          sub="Challenges I've turned into outcomes, from a business perspective."
        />

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="lg:sticky lg:top-28">
            <p className="mb-7 text-lg text-dim">{whyHireMe.pitch}</p>
            <ul className="mb-9 flex flex-col gap-3.5">
              {whyHireMe.strengths.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                  className="flex items-start gap-3 text-sm"
                >
                  <span className="grad-bg mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span className="text-body">{s}</span>
                </motion.li>
              ))}
            </ul>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="grad-bg group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display font-semibold text-white shadow-xl shadow-primary/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/50"
              >
                Let&apos;s Build Your AI
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
          </Reveal>

          <div className="overflow-hidden rounded-3xl border border-line">
            {whyHireMe.challenges.map((c, i) => (
              <Reveal key={c.problem} delay={i * 0.07}>
                <div className="group relative flex flex-col gap-3 border-b border-line px-6 py-6 transition-colors duration-300 last:border-0 hover:bg-surface sm:flex-row sm:items-center sm:gap-5">
                  <span className="grad-bg absolute top-0 bottom-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                    {c.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="mb-1 font-display text-sm font-bold">
                      <span className="text-dim line-through decoration-pink/60 decoration-2">
                        {c.problem}
                      </span>
                      <span className="gradient-text ml-2 no-underline">→ solved</span>
                    </h3>
                    <p className="text-[13px] leading-relaxed text-dim">{c.solution}</p>
                  </div>
                  <span className="shrink-0 self-start rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] whitespace-nowrap text-accent sm:self-center">
                    {c.metric}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
