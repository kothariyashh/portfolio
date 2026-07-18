"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";

type Branch = {
  emoji: string;
  label: string;
  color: string;
  x: number;
  target: string;
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
    target: "#projects",
    leaves: ["LangGraph Multi-Agents", "Citation-Grounded RAG", "SSE Token Streaming"],
  },
  {
    emoji: "👁️",
    label: "Computer Vision",
    color: "#00cec9",
    x: 340,
    target: "#projects",
    leaves: ["YOLOv8 Detection", "OCR Pipelines", "3D Reconstruction"],
  },
  {
    emoji: "🔄",
    label: "Data Engineering",
    color: "#fd79a8",
    x: 560,
    target: "#skills",
    leaves: ["ETL · Airflow · Kafka", "Vector Databases", "Event-Driven Systems"],
  },
  {
    emoji: "🚀",
    label: "Production",
    color: "#ffa502",
    x: 780,
    target: "#engineering",
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
  const [focus, setFocus] = useState<number | null>(null);

  const dimmed = (bi: number) => focus !== null && focus !== bi;

  return (
    <section id="tree" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="🕸️ How It All Connects"
          title="Knowledge"
          highlight="Graph"
          sub="One root, four branches. Hover a node to trace the connections, click it to explore that part of my work."
        />

        <Reveal>
          <div
            ref={ref}
            className="relative overflow-x-auto rounded-3xl border border-line bg-surface p-4 backdrop-blur-md md:p-8"
          >
            {/* dotted grid backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:26px_26px]"
            />
            <svg
              viewBox="0 0 900 520"
              className="relative mx-auto block min-w-[760px]"
              role="img"
              aria-label="AI knowledge graph of Yash Kothari"
              onMouseLeave={() => setFocus(null)}
            >
              <defs>
                <linearGradient id="treeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6c5ce7" />
                  <stop offset="100%" stopColor="#00cec9" />
                </linearGradient>
              </defs>

              {/* branch paths + flowing pulses */}
              {branches.map((b, bi) => (
                <g
                  key={b.label}
                  style={{ opacity: dimmed(bi) ? 0.18 : 1, transition: "opacity 0.35s ease" }}
                >
                  <motion.path
                    d={curve(ROOT.x, ROOT.y + 30, b.x, BRANCH_Y - 24)}
                    fill="none"
                    stroke={b.color}
                    strokeWidth={focus === bi ? 3 : 2}
                    strokeOpacity={focus === bi ? 0.95 : 0.55}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.2 + bi * 0.15, ease: "easeInOut" }}
                    style={{ transition: "stroke-width 0.3s, stroke-opacity 0.3s" }}
                  />
                  {inView && (
                    <>
                      <circle r="3.5" fill={b.color}>
                        <animateMotion
                          dur={`${2.4 + bi * 0.4}s`}
                          repeatCount="indefinite"
                          path={curve(ROOT.x, ROOT.y + 30, b.x, BRANCH_Y - 24)}
                        />
                      </circle>
                      {focus === bi && (
                        <circle r="2.4" fill="#fff" opacity="0.9">
                          <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path={curve(ROOT.x, ROOT.y + 30, b.x, BRANCH_Y - 24)}
                          />
                        </circle>
                      )}
                    </>
                  )}
                  {b.leaves.map((leaf, li) => (
                    <motion.path
                      key={leaf}
                      d={curve(b.x, BRANCH_Y + 26, b.x, LEAF_Y + li * LEAF_GAP - 14)}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.4"
                      strokeOpacity={focus === bi ? 0.7 : 0.35}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.9 + bi * 0.15 + li * 0.12 }}
                    />
                  ))}
                </g>
              ))}

              {/* root node with breathing glow */}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                style={{ transformOrigin: "450px 64px" }}
              >
                <motion.rect
                  x={ROOT.x - 170}
                  y={ROOT.y - 32}
                  width="340"
                  height="62"
                  rx="18"
                  fill="url(#treeGrad)"
                  animate={inView ? { filter: [
                    "drop-shadow(0 0 8px rgba(108,92,231,0.45))",
                    "drop-shadow(0 0 22px rgba(0,206,201,0.65))",
                    "drop-shadow(0 0 8px rgba(108,92,231,0.45))",
                  ] } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <text x={ROOT.x} y={ROOT.y - 4} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="var(--font-sora)">
                  🧠 Yash Kothari
                </text>
                <text x={ROOT.x} y={ROOT.y + 18} textAnchor="middle" fontSize="11.5" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-jetbrains)">
                  Data Scientist & AI Engineer
                </text>
              </motion.g>

              {/* branch nodes: hover to focus, click to explore */}
              {branches.map((b, bi) => (
                <motion.g
                  key={`node-${b.label}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: focus === bi ? 1.08 : 1, opacity: dimmed(bi) ? 0.25 : 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 15, delay: inView ? 0 : 0.75 + bi * 0.15 }}
                  style={{ transformOrigin: `${b.x}px ${BRANCH_Y}px`, cursor: "pointer" }}
                  onMouseEnter={() => setFocus(bi)}
                  onClick={() => document.querySelector(b.target)?.scrollIntoView({ behavior: "smooth" })}
                >
                  <rect
                    x={b.x - 92}
                    y={BRANCH_Y - 24}
                    width="184"
                    height="50"
                    rx="14"
                    fill="var(--bg)"
                    stroke={b.color}
                    strokeWidth={focus === bi ? 2.4 : 1.6}
                    style={{
                      filter: focus === bi ? `drop-shadow(0 0 12px ${b.color})` : "none",
                      transition: "filter 0.3s, stroke-width 0.3s",
                    }}
                  />
                  <text x={b.x} y={BRANCH_Y - 2} textAnchor="middle" fontSize="14" fill={b.color} fontFamily="var(--font-sora)" fontWeight="700">
                    {b.emoji} {b.label}
                  </text>
                  <text x={b.x} y={BRANCH_Y + 16} textAnchor="middle" fontSize="9.5" fill="var(--dim)" fontFamily="var(--font-jetbrains)">
                    {focus === bi ? "click to explore →" : `${b.leaves.length} specialties`}
                  </text>
                </motion.g>
              ))}

              {/* leaves */}
              {branches.map((b, bi) =>
                b.leaves.map((leaf, li) => (
                  <motion.g
                    key={leaf}
                    initial={{ opacity: 0, y: 14 }}
                    animate={
                      inView
                        ? { opacity: dimmed(bi) ? 0.15 : 1, y: [0, -3, 0] }
                        : {}
                    }
                    transition={{
                      opacity: { duration: 0.35 },
                      y: { delay: 1.6, duration: 3.2 + li * 0.4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    onMouseEnter={() => setFocus(bi)}
                  >
                    <rect
                      x={b.x - 88}
                      y={LEAF_Y + li * LEAF_GAP - 14}
                      width="176"
                      height="30"
                      rx="15"
                      fill="var(--chip-bg)"
                      stroke={b.color}
                      strokeOpacity={focus === bi ? 0.9 : 0.45}
                      strokeWidth="1"
                      style={{
                        filter: focus === bi ? `drop-shadow(0 0 6px ${b.color}66)` : "none",
                        transition: "filter 0.3s",
                      }}
                    />
                    <text x={b.x} y={LEAF_Y + li * LEAF_GAP + 5} textAnchor="middle" fontSize="11" fill="var(--body)" fontFamily="var(--font-inter)">
                      {leaf}
                    </text>
                  </motion.g>
                )),
              )}
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
