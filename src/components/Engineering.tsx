import { engineering } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Chip from "@/components/Chip";

export default function Engineering() {
  return (
    <section id="engineering" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="04 · How I Engineer"
          title="Engineering"
          highlight="DNA"
          sub="Models are half the story. I build the production systems around them: fast, concurrent, resilient and observable."
        />
        <div className="mx-auto max-w-[920px]">
          {engineering.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <div className="group relative flex flex-col gap-4 border-b border-line px-4 py-9 transition-colors duration-300 last:border-0 hover:bg-surface sm:flex-row sm:items-start sm:gap-7 sm:px-6">
                <span className="grad-bg absolute top-1/2 left-0 h-0 w-[3px] -translate-y-1/2 rounded-full transition-all duration-400 group-hover:h-[60%]" />
                <span className="gradient-text font-mono text-lg font-semibold sm:pt-1">
                  0{i + 1}
                </span>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {e.icon}
                </span>
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-xl font-bold transition-colors group-hover:text-primary-2">
                    {e.title}
                  </h3>
                  <p className="mb-4 max-w-[560px] text-sm text-dim">{e.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <Chip key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
