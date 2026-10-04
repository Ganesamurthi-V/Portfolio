"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { projects, statusLabel, type Project } from "@/content/projects";
import { Reveal } from "@/components/ui/reveal";

/**
 * Sticky card stack.
 *
 * Purely CSS `position: sticky` with increasing offsets and z-index. The
 * previous version scrubbed scale, opacity and `filter: blur()` per card from
 * a ScrollTrigger — animating blur on elements this large forced a full repaint
 * on every scroll frame, which was the single worst cost on the page.
 */
export function ProjectStack() {
  return (
    <div className="shell">
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            // Stacking only from lg up: on narrower screens a card is taller
            // than the viewport, so a pinned card's lower half never scrolls in.
            className="mb-6 last:mb-0 lg:sticky"
            style={{ top: `calc(6rem + ${index * 0.7}rem)`, zIndex: index + 1 }}
          >
            <Reveal>
              <ProjectCard project={project} />
            </Reveal>
          </div>
        ))}
      </div>

      <div className="hidden h-[8vh] lg:block" aria-hidden="true" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group/card relative overflow-hidden border border-hairline bg-surface shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]">
      <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
        {/* copy */}
        <div className="flex flex-col">
          <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-silver-400">
              {project.index}
            </span>
            <span className="h-px w-8 bg-hairline" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <span className="ml-auto flex items-center gap-2 border border-hairline px-2.5 py-1">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  project.status === "live" ? "bg-foreground" : "bg-muted-foreground",
                )}
                aria-hidden="true"
              />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                {statusLabel[project.status]}
              </span>
            </span>
          </header>

          <h3 className="mt-5 font-display text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm text-silver-300 sm:text-base">{project.tagline}</p>

          <p className="mt-4 max-w-xl text-[0.875rem] leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
            <Link
              href={`/work/${project.slug}`}
              className="group/cta inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              Case study
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border border-hairline px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-200 hover:border-foreground/40 hover:text-foreground"
              >
                Live site
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} repository`}
                className="inline-flex items-center border border-hairline px-4 py-2.5 text-muted-foreground transition-colors duration-200 hover:border-foreground/40 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* media — CSS crossfade replaces the 144-node pixel transition grid */}
        <div className="lg:self-center">
          <div className="relative aspect-[16/10] overflow-hidden border border-hairline bg-surface-2">
            <img
              src={project.image}
              alt={project.imageAlt}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-300 group-hover/card:opacity-0"
            />

            <div className="absolute inset-0 flex flex-col justify-between gap-3 bg-surface-2 p-5 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
              <div>
                <p className="eyebrow">Key features</p>
                <ul className="mt-2.5 space-y-1.5">
                  {project.features.slice(0, 4).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[0.8125rem] leading-snug text-foreground"
                    >
                      <span
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-silver-400"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-silver-400">
                {project.year} · {project.features.length} features
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
