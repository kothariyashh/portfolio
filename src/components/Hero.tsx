"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/resume";
import NeuralCanvas from "@/components/effects/NeuralCanvas";
import Typewriter from "@/components/effects/Typewriter";
import Magnetic from "@/components/effects/Magnetic";
import Tilt from "@/components/effects/Tilt";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20">
      <NeuralCanvas />
      <div className="mx-auto grid w-[92%] max-w-[1160px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm text-dim"
          >
            <span className="status-dot h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Data Scientist & AI Engineer · Available for opportunities
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-6 mb-3 font-display text-5xl font-extrabold tracking-tight md:text-6xl"
          >
            Hi, I&apos;m <span className="gradient-text">Yash Kothari</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="flex min-h-[2.4em] flex-wrap font-display text-xl font-semibold md:text-2xl"
          >
            <span className="text-dim">I build&nbsp;</span>
            <Typewriter words={profile.typewriterRoles} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-5 mb-8 max-w-xl text-dim"
          >
            Data Scientist with <strong className="font-semibold text-body">4+ years of experience</strong>{" "}
            specializing in <strong className="font-semibold text-body">Generative AI</strong>, advanced{" "}
            <strong className="font-semibold text-body">NLP</strong> and{" "}
            <strong className="font-semibold text-body">Computer Vision</strong>. I ship
            production-grade LLM chatbots with streaming responses, citation-grounded RAG,
            multi-agent systems, ETL & AI automation workflows, OCR and document-intelligence
            platforms.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-wrap gap-4"
          >
            <Magnetic strength={0.2}>
              <a
                href="#projects"
                className="grad-bg group inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 font-display font-semibold text-white shadow-xl shadow-primary/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/50"
              >
                View My Work
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="inline-flex items-center rounded-2xl border-[1.5px] border-line px-7 py-3.5 font-display font-semibold backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/20"
              >
                Get In Touch
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-9 flex gap-3"
          >
            {[
              {
                href: profile.github,
                label: "GitHub",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                ),
              },
              {
                href: profile.linkedin,
                label: "LinkedIn",
                icon: (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
                  </svg>
                ),
              },
              {
                href: `mailto:${profile.email}`,
                label: "Email",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 6L2 7" />
                  </svg>
                ),
              },
            ].map((s) => (
              <Magnetic key={s.label} strength={0.25}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-dim transition-all hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/25"
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <Tilt max={6} className="relative">
            <div className="grad-bg hero-glow absolute -inset-5 -z-10 rounded-[30px] blur-[60px]" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#101024] shadow-2xl shadow-black/50">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-2 font-mono text-xs text-[#8886a5]">yash_kothari.py</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-relaxed text-[#d5d2ee]">
                <code>
                  <span className="text-[#ff79c6]">class</span> <span className="text-[#8be9fd]">DataScientist</span>:{"\n"}
                  {"    "}<span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">__init__</span>(<span className="text-[#ffb86c]">self</span>):{"\n"}
                  {"        "}<span className="text-[#ffb86c]">self</span>.name = <span className="text-[#f1fa8c]">&quot;Yash Kothari&quot;</span>{"\n"}
                  {"        "}<span className="text-[#ffb86c]">self</span>.role = <span className="text-[#f1fa8c]">&quot;GenAI Engineer&quot;</span>{"\n"}
                  {"        "}<span className="text-[#ffb86c]">self</span>.experience = <span className="text-[#bd93f9]">4</span>  <span className="text-[#6272a4]"># years+</span>{"\n"}
                  {"        "}<span className="text-[#ffb86c]">self</span>.stack = [{"\n"}
                  {"            "}<span className="text-[#f1fa8c]">&quot;LLMs &amp; RAG&quot;</span>, <span className="text-[#f1fa8c]">&quot;LangGraph&quot;</span>,{"\n"}
                  {"            "}<span className="text-[#f1fa8c]">&quot;Computer Vision&quot;</span>, <span className="text-[#f1fa8c]">&quot;FastAPI&quot;</span>,{"\n"}
                  {"        "}]{"\n\n"}
                  {"    "}<span className="text-[#ff79c6]">def</span> <span className="text-[#50fa7b]">build</span>(<span className="text-[#ffb86c]">self</span>, idea):{"\n"}
                  {"        "}<span className="text-[#ff79c6]">return</span> <span className="text-[#8be9fd]">Production</span>(idea)  <span className="text-[#6272a4]"># 🚀</span>
                </code>
              </pre>
            </div>
            <div className="float-chip absolute -top-5 right-[6%] rounded-xl border border-line bg-surface px-4 py-2.5 font-display text-xs font-semibold shadow-xl backdrop-blur-md">
              🤖 Multi-Agent AI
            </div>
            <div className="float-chip absolute bottom-[24%] -left-4 rounded-xl border border-line bg-surface px-4 py-2.5 font-display text-xs font-semibold shadow-xl backdrop-blur-md [animation-delay:-1.6s] md:-left-8">
              🧠 RAG Pipelines
            </div>
            <div className="float-chip absolute right-[12%] -bottom-5 rounded-xl border border-line bg-surface px-4 py-2.5 font-display text-xs font-semibold shadow-xl backdrop-blur-md [animation-delay:-3.2s]">
              👁️ Computer Vision
            </div>
          </Tilt>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] tracking-[0.2em] text-dim uppercase md:flex"
      >
        <span className="flex h-9 w-6 justify-center rounded-2xl border-2 border-dim pt-1.5">
          <span className="mouse-wheel h-2 w-[3px] rounded bg-accent" />
        </span>
        scroll
      </a>
    </section>
  );
}
