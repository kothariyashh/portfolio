import { experience } from "@/data/resume";
import Reveal from "@/components/effects/Reveal";
import SectionHead from "@/components/SectionHead";
import Chip from "@/components/Chip";

export default function Experience() {
  return (
    <section id="experience" className="bg-bg-alt py-28 transition-colors duration-500">
      <div className="mx-auto w-[92%] max-w-[1160px]">
        <SectionHead tag="02 · Where I've Worked" title="Professional" highlight="Experience" />

        <div className="relative mx-auto max-w-[860px]">
          <div
            className="absolute top-0 bottom-0 left-[9px] w-0.5 bg-gradient-to-b from-primary to-accent opacity-35 md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {experience.map((job, i) => (
            <Reveal
              key={job.company}
              className={`relative w-full pb-12 pl-11 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-11 md:text-left" : "md:left-1/2 md:pl-11"
              }`}
            >
              <span
                className={`grad-bg absolute top-2 left-0.5 z-10 h-[15px] w-[15px] rounded-full shadow-[0_0_0_5px_var(--bg-alt),0_0_18px_#6c5ce7] ${
                  i % 2 === 0 ? "md:-right-2 md:left-auto" : "md:-left-2"
                }`}
                aria-hidden
              />
              <div className="rounded-2xl border border-line bg-surface p-7 transition-all hover:border-primary hover:shadow-2xl hover:shadow-primary/20">
                <span className="mb-3 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
                  {job.period}
                </span>
                <h3 className="font-display text-xl font-bold">{job.role}</h3>
                <p className="mb-3 text-sm font-semibold text-primary-2">
                  {job.company} · {job.location}
                </p>
                <p className="mb-4 text-sm text-dim">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <Chip key={t} label={t} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
