import { stats } from "@/data/resume";
import Reveal from "@/components/effects/Reveal";
import Counter from "@/components/effects/Counter";
import Tilt from "@/components/effects/Tilt";
import SectionHead from "@/components/SectionHead";

const points = [
  {
    icon: "🎓",
    title: "B.E. — Information & Communication Technology",
    sub: "Marwadi University, Rajkot · 2024",
  },
  { icon: "📍", title: "Ahmedabad, India", sub: "Open to remote & on-site roles" },
  { icon: "💼", title: "Data Scientist @ Bacancy Technology", sub: "Jan 2024 — Present" },
];

export default function About() {
  return (
    <section id="about" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="01 · Who I Am" title="About" highlight="Me" />
        <div className="grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="mb-4 text-dim">
              I&apos;m a <strong className="font-semibold text-body">Data Scientist / GenAI Engineer</strong>{" "}
              based in Ahmedabad, India, currently building production-grade Generative AI systems at{" "}
              <strong className="font-semibold text-body">Bacancy Technology</strong>. My work spans
              LLM-powered chatbots, retrieval-augmented generation, supervisor-routed multi-agent
              architectures, and multi-modal AI that blends text, vision and structured data.
            </p>
            <p className="mb-7 text-dim">
              I&apos;ve delivered end-to-end AI platforms — from data ingestion and model development to
              cloud deployment with observability, rate-limiting and resilient error handling — using{" "}
              <strong className="font-semibold text-body">
                Python, FastAPI, LangChain/LangGraph, TensorFlow, PyTorch and OpenCV
              </strong>{" "}
              across GCP and AWS. I keep sharpening my edge through deep study of mathematics, ML
              fundamentals and hands-on proof-of-concept builds.
            </p>
            <div className="flex flex-col gap-3.5">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition-all hover:translate-x-2 hover:border-primary"
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <strong className="block text-sm font-semibold">{p.title}</strong>
                    <small className="text-xs text-dim">{p.sub}</small>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <Tilt key={s.label} max={10}>
                  <div className="rounded-2xl border border-line bg-surface px-5 py-8 text-center transition-all hover:border-primary hover:shadow-xl hover:shadow-primary/20">
                    <span className="gradient-text block font-display text-4xl font-extrabold">
                      <Counter target={s.value} suffix={s.suffix} />
                    </span>
                    <span className="text-sm text-dim">{s.label}</span>
                  </div>
                </Tilt>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
