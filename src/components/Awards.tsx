import { awards } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";
import Tilt from "@/components/effects/Tilt";

export default function Awards() {
  return (
    <section id="awards" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="06 · Recognition" title="Awards &" highlight="Honors" />
        <div className="grid gap-6 md:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.12}>
              <Tilt max={8}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-7 transition-all hover:border-accent hover:shadow-2xl hover:shadow-accent/15">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-chipline bg-chipbg text-2xl">
                    {a.icon}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-display text-base font-bold">{a.title}</h3>
                    <p className="text-sm text-dim">{a.description}</p>
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
