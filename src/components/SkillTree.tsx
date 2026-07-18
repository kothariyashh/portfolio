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
  primary?: boolean;
  leafW?: number;
};

const ROOT = { x: 450, y: 152 };
const FOUNDATION_Y = 34;
const BRANCH_Y = 306;
const LEAF_Y = 440;
const LEAF_GAP = 44;

const foundations = [
  { emoji: "🐍", label: "Python", x: 225 },
  { emoji: "📐", label: "Mathematics", x: 375 },
  { emoji: "📊", label: "Statistics", x: 525 },
  { emoji: "💾", label: "Data", x: 675 },
];

const branches: Branch[] = [
  {
    emoji: "🤖",
    label: "GenAI & Agents",
    color: "#a29bfe",
    x: 140,
    target: "#projects",
    primary: true,
    leafW: 224,
    leaves: [
      "LangGraph Multi-Agent Orchestration",
      "LangChain · LlamaIndex Pipelines",
      "RAG + Reranking (OpenSearch kNN)",
      "Langfuse · RAGAS LLM Evals",
      "Guardrails & SSE Streaming",
    ],
  },
  {
    emoji: "👁️",
    label: "Computer Vision",
    color: "#00cec9",
    x: 400,
    target: "#projects",
    leaves: ["YOLOv8 · SAM Segmentation", "OCR & Document AI", "3D Reconstruction"],
  },
  {
    emoji: "🔄",
    label: "Data Engineering",
    color: "#fd79a8",
    x: 615,
    target: "#skills",
    leaves: ["ETL · Airflow · Kafka", "Vector Databases · FAISS", "Event-Driven Systems"],
  },
  {
    emoji: "🚀",
    label: "Production",
    color: "#ffa502",
    x: 800,
    target: "#engineering",
    leaves: ["AWS · GCP · Docker · CI/CD", "Circuit Breakers & Fallbacks"],
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
          sub="Foundations feed the root. The root compounds into four branches, with GenAI as the center of gravity: LangGraph orchestration, RAGAS-evaluated RAG and Langfuse-traced LLMs running in production."
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
              viewBox="0 0 900 680"
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

              {/* ── roots: foundations flowing into the core ── */}
              <text
                x="60"
                y={FOUNDATION_Y + 6}
                fontSize="10"
                fill="var(--dim)"
                fontFamily="var(--font-jetbrains)"
                letterSpacing="2"
              >
                ROOTS
              </text>
              {foundations.map((f, fi) => (
                <motion.g
                  key={f.label}
                  initial={{ opacity: 0, y: -12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + fi * 0.12, duration: 0.5 }}
                >
                  <path
                    d={curve(f.x, FOUNDATION_Y + 18, ROOT.x, ROOT.y - 34)}
                    fill="none"
                    stroke="url(#treeGrad)"
                    strokeWidth="1.4"
                    strokeOpacity="0.4"
                    strokeDasharray="4 8"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.4s" repeatCount="indefinite" />
                  </path>
                  <rect
                    x={f.x - 62}
                    y={FOUNDATION_Y - 16}
                    width="124"
                    height="32"
                    rx="16"
                    fill="var(--chip-bg)"
                    stroke="var(--chip-border)"
                    strokeWidth="1"
                  />
                  <text x={f.x} y={FOUNDATION_Y + 5} textAnchor="middle" fontSize="12" fill="var(--body)" fontFamily="var(--font-inter)">
                    {f.emoji} {f.label}
                  </text>
                </motion.g>
              ))}

              {/* ── branch paths + flowing pulses ── */}
              {branches.map((b, bi) => (
                <g
                  key={b.label}
                  style={{ opacity: dimmed(bi) ? 0.18 : 1, transition: "opacity 0.35s ease" }}
                >
                  <motion.path
                    d={curve(ROOT.x, ROOT.y + 32, b.x, BRANCH_Y - 26)}
                    fill="none"
                    stroke={b.color}
                    strokeWidth={focus === bi ? 3 : 2}
                    strokeOpacity={focus === bi ? 0.95 : 0.55}
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.3 + bi * 0.15, ease: "easeInOut" }}
                    style={{ transition: "stroke-width 0.3s, stroke-opacity 0.3s" }}
                  />
                  {inView && (
                    <>
                      <circle r="3.5" fill={b.color}>
                        <animateMotion
                          dur={`${2.4 + bi * 0.4}s`}
                          repeatCount="indefinite"
                          path={curve(ROOT.x, ROOT.y + 32, b.x, BRANCH_Y - 26)}
                        />
                      </circle>
                      {focus === bi && (
                        <circle r="2.4" fill="#fff" opacity="0.9">
                          <animateMotion
                            dur="1.2s"
                            repeatCount="indefinite"
                            path={curve(ROOT.x, ROOT.y + 32, b.x, BRANCH_Y - 26)}
                          />
                        </circle>
                      )}
                    </>
                  )}
                  {b.leaves.map((leaf, li) => (
                    <motion.path
                      key={leaf}
                      d={curve(b.x, BRANCH_Y + 28, b.x, LEAF_Y + li * LEAF_GAP - 14)}
                      fill="none"
                      stroke={b.color}
                      strokeWidth="1.4"
                      strokeOpacity={focus === bi ? 0.7 : 0.35}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 0.6, delay: 1 + bi * 0.15 + li * 0.12 }}
                    />
                  ))}
                </g>
              ))}

              {/* ── root core with sonar echoes ── */}
              {inView &&
                [0, 1].map((echo) => (
                  <motion.rect
                    key={echo}
                    x={ROOT.x - 172}
                    y={ROOT.y - 34}
                    width="344"
                    height="66"
                    rx="20"
                    fill="none"
                    stroke="url(#treeGrad)"
                    strokeWidth="1.5"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.25 }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: echo * 1.2, ease: "easeOut" }}
                    style={{ transformOrigin: `${ROOT.x}px ${ROOT.y}px` }}
                  />
                ))}
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                style={{ transformOrigin: `${ROOT.x}px ${ROOT.y}px` }}
              >
                <motion.rect
                  x={ROOT.x - 172}
                  y={ROOT.y - 34}
                  width="344"
                  height="66"
                  rx="20"
                  fill="url(#treeGrad)"
                  animate={
                    inView
                      ? {
                          filter: [
                            "drop-shadow(0 0 8px rgba(108,92,231,0.45))",
                            "drop-shadow(0 0 22px rgba(0,206,201,0.65))",
                            "drop-shadow(0 0 8px rgba(108,92,231,0.45))",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <circle cx={ROOT.x - 138} cy={ROOT.y} r="19" fill="rgba(255,255,255,0.18)" />
                <text x={ROOT.x - 138} y={ROOT.y + 7} textAnchor="middle" fontSize="20">
                  🧠
                </text>
                <text x={ROOT.x + 16} y={ROOT.y - 3} textAnchor="middle" fontSize="17" fontWeight="700" fill="#fff" fontFamily="var(--font-sora)">
                  Yash Kothari
                </text>
                <text x={ROOT.x + 16} y={ROOT.y + 19} textAnchor="middle" fontSize="11.5" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-jetbrains)">
                  Data Scientist & AI Engineer
                </text>
              </motion.g>

              {/* ── branch nodes: icon medallions, hover focus, click to explore ── */}
              {branches.map((b, bi) => (
                <motion.g
                  key={`node-${b.label}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: focus === bi ? 1.08 : 1, opacity: dimmed(bi) ? 0.25 : 1 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 15 }}
                  style={{ transformOrigin: `${b.x}px ${BRANCH_Y}px`, cursor: "pointer" }}
                  onMouseEnter={() => setFocus(bi)}
                  onClick={() => document.querySelector(b.target)?.scrollIntoView({ behavior: "smooth" })}
                >
                  <rect
                    x={b.x - (b.primary ? 106 : 96)}
                    y={BRANCH_Y - (b.primary ? 30 : 26)}
                    width={b.primary ? 212 : 192}
                    height={b.primary ? 62 : 54}
                    rx="16"
                    fill="var(--bg)"
                    stroke={b.color}
                    strokeWidth={focus === bi ? 2.6 : b.primary ? 2.2 : 1.6}
                    style={{
                      filter:
                        focus === bi
                          ? `drop-shadow(0 0 12px ${b.color})`
                          : b.primary
                            ? `drop-shadow(0 0 7px ${b.color}88)`
                            : "none",
                      transition: "filter 0.3s, stroke-width 0.3s",
                    }}
                  />
                  {b.primary && (
                    <>
                      <rect x={b.x - 44} y={BRANCH_Y - 44} width="88" height="19" rx="9.5" fill={b.color} />
                      <text x={b.x} y={BRANCH_Y - 31} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#14142a" fontFamily="var(--font-jetbrains)" letterSpacing="1">
                        ★ CORE FOCUS
                      </text>
                    </>
                  )}
                  <circle cx={b.x - (b.primary ? 76 : 68)} cy={BRANCH_Y + 1} r="16" fill={`${b.color}26`} stroke={b.color} strokeWidth="1.2" />
                  <text x={b.x - (b.primary ? 76 : 68)} y={BRANCH_Y + 7} textAnchor="middle" fontSize="15">
                    {b.emoji}
                  </text>
                  <text x={b.x + 14} y={BRANCH_Y - 1} textAnchor="middle" fontSize="13.5" fill={b.color} fontFamily="var(--font-sora)" fontWeight="700">
                    {b.label}
                  </text>
                  <text x={b.x + 14} y={BRANCH_Y + 17} textAnchor="middle" fontSize="9.5" fill="var(--dim)" fontFamily="var(--font-jetbrains)">
                    {focus === bi ? "click to explore →" : `${b.leaves.length} specialties`}
                  </text>
                </motion.g>
              ))}

              {/* ── leaves ── */}
              {branches.map((b, bi) =>
                b.leaves.map((leaf, li) => (
                  <motion.g
                    key={leaf}
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: dimmed(bi) ? 0.15 : 1, y: [0, -3, 0] } : {}}
                    transition={{
                      opacity: { duration: 0.35 },
                      y: { delay: 1.7, duration: 3.2 + li * 0.4, repeat: Infinity, ease: "easeInOut" },
                    }}
                    onMouseEnter={() => setFocus(bi)}
                  >
                    <rect
                      x={b.x - (b.leafW ?? 176) / 2}
                      y={LEAF_Y + li * LEAF_GAP - 14}
                      width={b.leafW ?? 176}
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
                    <text x={b.x} y={LEAF_Y + li * LEAF_GAP + 5} textAnchor="middle" fontSize="10.5" fill="var(--body)" fontFamily="var(--font-inter)">
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
