"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";

type Branch = {
  emoji: string;
  label: string;
  color: string;
  x: number;
  leaves: string[];
};

const ROOT = { x: 450, y: 64 };
const BRANCH_Y = 218;
const LEAF_Y = 352;
const LEAF_GAP = 44;

const branches: Branch[] = [
  {
    emoji: "🤖",
    label: "GenAI & Agents",
    color: "#a29bfe",
    x: 120,
    leaves: ["LangGraph Multi-Agents", "Citation-Grounded RAG", "SSE Token Streaming"],
  },
  {
    emoji: "👁️",
    label: "Computer Vision",
    color: "#00cec9",
    x: 340,
    leaves: ["YOLOv8 Detection", "OCR Pipelines", "3D Reconstruction"],
  },
  {
    emoji: "🔄",
    label: "Data Engineering",
    color: "#fd79a8",
    x: 560,
    leaves: ["ETL · Airflow · Kafka", "Vector Databases", "Event-Driven Systems"],
  },
  {
    emoji: "🚀",
    label: "Production",
    color: "#ffa502",
    x: 780,
    leaves: ["AWS · GCP · Docker", "Observability", "CI/CD Pipelines"],
  },
];

function curve(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}

export default function SkillTree() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tree" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="🌳 One Tree, Whole Story"
          title="The Yash"
          highlight="Tree"
          sub="Everything I do grows from one root: turning data into intelligent, production-ready systems."
        />

        <Reveal>
          <div ref={ref} className="overflow-x-auto rounded-3xl border border-line bg-surface p-4 backdrop-blur-md md:p-8">
            <svg viewBox="0 0 900 520" className="mx-auto block min-w-[760px]" role="img" aria-label="Skill tree of Yash Kothari">
              {/* trunk + branch paths, drawn on scroll */}
              {branches.map((b, bi) => (
                <g key={b.label}>
                  <motion.path
                    d={curve(ROOT.x, ROOT.y + 30, b.x, BRANCH_Y - 24)}
                    fill="none"
                    stroke={b.color}
                    strokeWidth="2"
                    strokeOpacity="0.55"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.2 + bi * 0.15, ease: "easeInOut" }}
                  />
                  {/* data pulse flowing along the branch */}
                  {inView && (
                    <circle r="3.5" fill={b.color}>
                      <animateMotion
                        dur={`${2.4 + bi * 0.4}s`}
                        repeatCount="indefinite"
                        path={curve(ROOT.x, ROOT.y + 30, b.x, BRANCH_Y - 24)}
                      />
                    </circle>
                  )}
                  {/* branch → leaf connectors */}
                  {b.leaves.map((leaf, li) => (
                    <motion.path
                      key={leaf}
                      d={curve(b.x, BRANCH_Y + 26, b.x, LEAF_Y + li * LEAF_GAP - 14)}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.4"
                      strokeOpacity="0.35"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 + bi * 0.15 + li * 0.12 }}
                    />
                  ))}
                </g>
              ))}

              {/* root node */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                style={{ transformOrigin: "450px 64px" }}
              >
                <rect x={ROOT.x - 170} y={ROOT.y - 32} width="340" height="62" rx="18" fill="url(#treeGrad)" />
                <text x={ROOT.x} y={ROOT.y - 4} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="var(--font-sora)">
                  🧠 Yash Kothari
                </text>
                <text x={ROOT.x} y={ROOT.y + 18} textAnchor="middle" fontSize="11.5" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-jetbrains)">
                  Data Scientist & AI Engineer
                </text>
              </motion.g>

              {/* branch nodes */}
              {branches.map((b, bi) => (
                <motion.g
                  key={`node-${b.label}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.75 + bi * 0.15 }}
                  style={{ transformOrigin: `${b.x}px ${BRANCH_Y}px` }}
                >
                  <rect x={b.x - 92} y={BRANCH_Y - 24} width="184" height="50" rx="14" fill="var(--bg)" stroke={b.color} strokeWidth="1.6" />
                  <text x={b.x} y={BRANCH_Y - 2} textAnchor="middle" fontSize="14" fill={b.color} fontFamily="var(--font-sora)" fontWeight="700">
                    {b.emoji} {b.label}
                  </text>
                  <text x={b.x} y={BRANCH_Y + 16} textAnchor="middle" fontSize="9.5" fill="var(--dim)" fontFamily="var(--font-jetbrains)">
                    {b.leaves.length} specialties
                  </text>
                </motion.g>
              ))}

              {/* leaves */}
              {branches.map((b, bi) =>
                b.leaves.map((leaf, li) => (
                  <motion.g
                    key={leaf}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: [0, -3, 0] } : {}}
                    transition={{
                      opacity: { delay: 1.15 + bi * 0.15 + li * 0.12, duration: 0.4 },
                      y: { delay: 1.6, duration: 3.2 + li * 0.4, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <rect x={b.x - 88} y={LEAF_Y + li * LEAF_GAP - 14} width="176" height="30" rx="15" fill="var(--chip-bg)" stroke={b.color} strokeOpacity="0.45" strokeWidth="1" />
                    <text x={b.x} y={LEAF_Y + li * LEAF_GAP + 5} textAnchor="middle" fontSize="11" fill="var(--body)" fontFamily="var(--font-inter)">
                      {leaf}
                    </text>
                  </motion.g>
                )),
              )}

              <defs>
                <linearGradient id="treeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" />
                  <stop offset="100%" stopColor="#00cec9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
