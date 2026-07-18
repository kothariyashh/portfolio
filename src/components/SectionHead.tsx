import Reveal from "@/components/effects/Reveal";

type SectionHeadProps = {
  tag: string;
  title: string;
  highlight: string;
  sub?: string;
};

export default function SectionHead({ tag, title, highlight, sub }: SectionHeadProps) {
  return (
    <Reveal className="mb-16 text-center">
      <span className="mb-4 inline-block rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs tracking-wider text-accent">
        {tag}
      </span>
      <h2 className="font-display text-4xl font-extrabold tracking-tight md:text-[2.7rem]">
        {title} <span className="gradient-text">{highlight}</span>
      </h2>
      {sub && <p className="mt-3.5 text-dim">{sub}</p>}
    </Reveal>
  );
}
