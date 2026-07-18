import { profile } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-line py-9">
      <div className="mx-auto flex w-[92%] max-w-[1160px] flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-dim">
          © {new Date().getFullYear()} Yash Kothari · Designed & built with{" "}
          <span className="text-accent">♥</span> and a lot of Python energy
        </p>
        <div className="flex gap-6">
          {[
            { label: "GitHub", href: profile.github },
            { label: "LinkedIn", href: profile.linkedin },
            { label: "Email", href: `mailto:${profile.email}` },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="text-sm text-dim transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
