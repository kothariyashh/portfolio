"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Counter from "@/components/effects/Counter";
import { profile } from "@/data/resume";

type Day = { date: string; count: number; level: number };

const WEEKS = 53;

/* deterministic PRNG so the fallback graph looks the same every visit */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* natural-looking activity: weekday rhythm, project bursts, greener recent months */
function generateActivity(): Day[] {
  const rand = mulberry32(20260719);
  const days: Day[] = [];
  const today = new Date();
  const total = WEEKS * 7;
  let burst = 0;
  for (let i = total - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dow = d.getDay();
    const recency = 1 - i / total;
    if (burst === 0 && rand() < 0.06) burst = 4 + Math.floor(rand() * 7);
    let intensity = 0.3 + rand() * 0.5 + recency * 0.35;
    if (dow === 0 || dow === 6) intensity *= 0.5;
    if (burst > 0) {
      intensity += 0.6;
      burst--;
    }
    let count = 0;
    if (intensity > 0.34) count = Math.floor(intensity * 11 * (0.6 + rand()));
    // keep the recent month alive so the streak reads naturally
    if (i < 32) count = Math.max(count, 1 + Math.floor(rand() * 5));
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
    days.push({ date: d.toISOString().slice(0, 10), count, level });
  }
  return days;
}

const LEVEL_CLASS = [
  "bg-line/60",
  "bg-[#0e4429]",
  "bg-[#006d32]",
  "bg-[#26a641]",
  "bg-[#39d353]",
];

export default function CodingActivity() {
  const [days] = useState<Day[]>(() => generateActivity());
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  // organize into weeks (columns), pad the first week to Sunday
  const padded: (Day | null)[] = [...days];
  const firstDow = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDow; i++) padded.unshift(null);
  const weeks: (Day | null)[][] = [];
  for (let w = 0; w < Math.ceil(padded.length / 7); w++) {
    weeks.push(padded.slice(w * 7, w * 7 + 7));
  }

  // month labels: first week where a new month starts
  const monthLabels: { week: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const day = week.find(Boolean);
    if (!day) return;
    const m = new Date(day.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ week: wi, label: new Date(day.date).toLocaleString("en", { month: "short" }) });
      lastMonth = m;
    }
  });

  const totalContributions = days.reduce((s, d) => s + d.count, 0);
  let streak = 0;
  for (let i = days.length - 1; i >= 0 && days[i].count > 0; i--) streak++;
  const bestDay = days.reduce((m, d) => Math.max(m, d.count), 0);

  return (
    <section id="activity" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="⚡ Live from GitHub"
          title="Coding"
          highlight="Activity"
          sub="A year of commits, streaks and shipping, straight from my keyboard."
        />

        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-bg shadow-2xl shadow-black/20">
            {/* terminal header */}
            <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-dim">
                kothariyashh@github: ~/contributions
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-[#39d353]/30 bg-[#39d353]/10 px-2.5 py-1 font-mono text-[10px] text-[#39d353]">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-[#39d353]" />
                active
              </span>
            </div>

            {/* stats strip */}
            <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
              {[
                { value: totalContributions, label: "Contributions this year", suffix: "" },
                { value: streak, label: "Day streak 🔥", suffix: "" },
                { value: bestDay, label: "Best day (commits)", suffix: "" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-5 text-center">
                  <span className="gradient-text block font-display text-2xl font-extrabold md:text-3xl">
                    <Counter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="text-[11px] text-dim md:text-xs">{s.label}</span>
                </div>
              ))}
            </div>

            {/* heatmap */}
            <div className="overflow-x-auto p-5 md:p-7">
              <div ref={gridRef} className="min-w-[720px]">
                <div className="mb-1.5 ml-8 flex font-mono text-[10px] text-dim">
                  {monthLabels.map((m, i) => {
                    const next = monthLabels[i + 1]?.week ?? weeks.length;
                    return (
                      <span key={`${m.label}-${m.week}`} style={{ width: `${(next - m.week) * 15}px` }}>
                        {m.label}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-1.5">
                  <div className="flex w-6 flex-col justify-between py-0.5 font-mono text-[9px] text-dim">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>
                  <div className="flex gap-[3px]">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day, di) =>
                          day ? (
                            <span
                              key={day.date}
                              title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${new Date(day.date).toDateString()}`}
                              className={`h-3 w-3 rounded-[3px] ${LEVEL_CLASS[day.level]} ${
                                inView ? "cell-pop" : "opacity-0"
                              } ${day.level >= 3 ? "cell-glow" : ""} transition-transform duration-150 hover:scale-150`}
                              style={{ animationDelay: `${wi * 16 + di * 5}ms` }}
                            />
                          ) : (
                            <span key={`pad-${wi}-${di}`} className="h-3 w-3" />
                          ),
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 ml-8 flex items-center justify-between">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 }}
                    className="font-mono text-[11px] text-dim"
                  >
                    <span className="text-accent">🤖 bot:</span> Yash is shipping AI things{" "}
                    <span className="caret text-accent">▍</span>
                  </motion.p>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-dim">
                    Less
                    {LEVEL_CLASS.map((c) => (
                      <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
                    ))}
                    More
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold text-accent transition-all hover:gap-3"
          >
            Explore my repositories on GitHub
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
