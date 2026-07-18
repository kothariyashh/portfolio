import { awards } from "@/data/resume";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/effects/Reveal";

export default function Awards() {
  return (
    <section id="awards" className="py-28">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="06 · Recognition" title="Awards &" highlight="Honors" />
        <div className="grid gap-12 text-center md:grid-cols-3">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.12}>
              <div className="group flex flex-col items-center">
                <div className="bento-ring mb-6 rounded-full p-[2.5px] shadow-xl shadow-primary/25 transition-transform duration-300 group-hover:scale-110">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-bg text-3xl">
                    {a.icon}
                  </div>
                </div>
                <h3 className="mb-2.5 font-display text-lg font-bold">{a.title}</h3>
                <p className="max-w-[300px] text-sm text-dim">{a.description}</p>
                <span className="grad-bg mt-5 h-[3px] w-10 rounded-full opacity-40 transition-all duration-300 group-hover:w-20 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
