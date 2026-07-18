import { engineering } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";
import Chip from "@/components/Chip";

export default function Engineering() {
  return (
    <section id="engineering" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead
          tag="04 · How I Engineer"
          title="Engineering"
          highlight="DNA"
          sub="Models are half the story — I build the production systems around them: fast, concurrent, resilient and observable."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {engineering.map((e, i) => (
            <Reveal key={e.title} delay={(i % 3) * 0.1}>
              <Tilt max={8}>
                <div className="group h-full rounded-2xl border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-2xl hover:shadow-primary/25">
                  <div className="mb-4 flex items-center gap-3.5">
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {e.icon}
                    </span>
                    <h3 className="font-display text-lg font-bold">{e.title}</h3>
                  </div>
                  <p className="mb-5 text-sm text-dim">{e.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <Chip key={t} label={t} />
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
