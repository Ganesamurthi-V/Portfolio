"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, TriangleAlert } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { statusLabel, type Project } from "@/content/projects";
import { CaseStudyBlock } from "@/components/work/case-study-block";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";

interface Props {
  project: Project;
  next: Project;
}

export function CaseStudy({ project, next }: Props) {
  const study = project.caseStudy;

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden pt-28 pb-14 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-50" aria-hidden="true" />

        <div className="shell">
          <Reveal>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              All work
            </Link>
          </Reveal>

          <Reveal delay={60} className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-silver-400">
              {project.index}
            </span>
            <span className="h-px w-8 bg-hairline" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.year}
            </span>
            <span className="flex items-center gap-2 border border-hairline px-2.5 py-1">
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
          </Reveal>

          <h1 className="mt-6">
            <RevealText
              text={project.name}
              stagger={26}
              className="font-display text-[clamp(2.75rem,1.4rem+7.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
            />
          </h1>

          <Reveal delay={200}>
            <p className="mt-4 text-[clamp(1.125rem,1rem+0.8vw,1.75rem)] text-silver-300">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-lg">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 flex flex-col gap-8 border-t border-hairline pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <div className="grid flex-1 gap-8 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-none text-foreground">
                      {metric.prefix}
                      <Counter to={metric.value} />
                      {metric.suffix ?? "+"}
                    </p>
                    <p className="mt-2 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    <GithubIcon className="size-4" />
                    Repository
                  </a>
                )}
                {project.appUrl && (
                  <a
                    href={project.appUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                  >
                    Open the app
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Live site
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="border border-hairline bg-surface px-3.5 py-1.5 font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </header>

      {/* Hero shot */}
      <div className="shell">
        <Reveal>
          <div className="overflow-hidden border border-hairline bg-surface-2">
            <img
              src={project.image}
              alt={project.imageAlt}
              width={1600}
              height={1000}
              className="block h-auto w-full"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <div className="shell mt-16">
        <CaseStudyBlock
          index="01"
          title={study.problem.title}
          body={study.problem.body}
          bullets={study.problem.bullets}
          className="!border-t-0 !pt-0"
        />
        <CaseStudyBlock
          index="02"
          title={study.solution.title}
          body={study.solution.body}
          bullets={study.solution.bullets}
        />
        <CaseStudyBlock index="03" title={study.features.title} bullets={study.features.bullets} />

        <CaseStudyBlock index="04" title={study.architecture.title} body={study.architecture.body}>
          <ArchitectureDiagram
            nodes={study.architecture.nodes}
            edges={study.architecture.edges}
          />
        </CaseStudyBlock>

        <CaseStudyBlock
          index="05"
          title={study.implementation.title}
          body={study.implementation.body}
          bullets={study.implementation.bullets}
        />

        {/* Challenges */}
        <section className="border-t border-hairline py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <div className="flex items-center gap-3 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-2">
                <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-silver-400">06</span>
                <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">
                  Challenges
                </h2>
              </div>
            </Reveal>

            <div className="grid max-w-3xl gap-4">
              {study.challenges.map((challenge, index) => (
                <Reveal key={challenge.title} delay={index * 50}>
                  <div className="h-full border border-hairline bg-surface p-6 sm:p-7">
                    <h3 className="flex items-start gap-3 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-silver-400" aria-hidden="true" />
                      {challenge.title}
                    </h3>
                    <p className="mt-3.5 pl-7 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                      {challenge.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CaseStudyBlock index="07" title={study.result.title} body={study.result.body} />
        <CaseStudyBlock index="08" title={study.lessons.title} body={study.lessons.body} />

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="border-t border-hairline py-12 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
              <Reveal>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-silver-400">09</span>
                  <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">
                    Screens
                  </h2>
                </div>
              </Reveal>

              <div className="grid gap-8 sm:grid-cols-2">
                {project.gallery.map((shot, index) => (
                  <Reveal key={shot.src} delay={index * 50}>
                    <figure>
                      <div
                        className={cn(
                          "grid h-60 place-items-center overflow-hidden border border-hairline bg-surface-2",
                          shot.portrait && "p-4",
                        )}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          loading="lazy"
                          decoding="async"
                          className={cn(
                            shot.portrait
                              ? "h-full w-auto object-contain"
                              : "h-full w-full object-cover object-left-top",
                          )}
                        />
                      </div>
                      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Next project */}
      <section className="mt-10 border-t border-hairline">
        <Link 
          href={`/work/${next.slug}`} 
          className="group block"
          onClick={() => {
            window.scrollTo(0, 0);
            if ((window as any).__lenis) {
              (window as any).__lenis.scrollTo(0, { immediate: true });
            }
          }}
        >
          <div className="shell flex flex-col gap-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-4 font-display text-[clamp(2rem,1.2rem+4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] transition-colors duration-300 group-hover:text-silver-400">
                {next.name}
              </p>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">{next.tagline}</p>
            </div>

            <span className="grid size-14 shrink-0 place-items-center border border-hairline text-foreground transition-colors duration-300 group-hover:border-foreground/45 group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
