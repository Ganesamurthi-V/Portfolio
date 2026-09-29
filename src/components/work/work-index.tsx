import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects, statusLabel } from "@/content/projects";
import { Reveal, RevealText } from "@/components/ui/reveal";

export function WorkIndex() {
  return (
    <div className="relative pt-28 pb-20 sm:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] grid-lines opacity-50" aria-hidden="true" />

      <div className="shell">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Home
          </Link>
        </Reveal>

        <h1 className="mt-8">
          <RevealText
            text="Selected Work"
            stagger={24}
            className="font-display text-[clamp(2.75rem,1.4rem+7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          />
        </h1>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-lg">
            Every project here has a case study covering the problem, the architecture, the
            decisions that mattered and the things that broke on the way.
          </p>
        </Reveal>

        <div className="mt-14">
          <div className="rule mb-8" aria-hidden="true" />

          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal as="li" key={project.slug} delay={index * 60} className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex h-full flex-col border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-foreground/35 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-silver-400">
                      {project.index}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-silver-300">
                    {project.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>

                  <p className="mt-5 flex-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 border-t border-hairline pt-5 text-xs font-medium text-foreground">
                    Read case study
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
