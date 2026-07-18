"use client";

import { motion } from "framer-motion";
import { whyHireMe } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";
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

          <div className="grid gap-5 sm:grid-cols-2">
            {whyHireMe.challenges.map((c, i) => (
              <Reveal key={c.problem} delay={(i % 2) * 0.1}>
                <Tilt max={8}>
                  <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-2xl hover:shadow-accent/20">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
                        {c.icon}
                      </span>
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] text-accent">
                        {c.metric}
                      </span>
                    </div>
                    <h3 className="mb-2 font-display text-[15px] font-bold">
                      <span className="text-dim line-through decoration-pink/60 decoration-2">
                        {c.problem}
                      </span>
                    </h3>
                    <p className="text-[13px] leading-relaxed text-dim">{c.solution}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
