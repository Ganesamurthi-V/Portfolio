"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, TriangleAlert } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { statusLabel, type Project } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { CaseStudyBlock } from "@/components/work/case-study-block";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import SplitText from "@/components/reactbits/SplitText";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import FadeContent from "@/components/reactbits/FadeContent";
import CountUp from "@/components/reactbits/CountUp";
import TiltedCard from "@/components/reactbits/TiltedCard";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

interface Props {
  project: Project;
  next: Project;
}

export function CaseStudy({ project, next }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const study = project.caseStudy;

  return (
    <article>
      {/* ---------------------------------------------------------- *
       * Header
       * ---------------------------------------------------------- */}
      <header className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(200,255,77,0.11),transparent_70%)]" />
          <div className="absolute inset-0 grid-lines radial-fade opacity-45" />
        </div>

        <div className="shell">
          <FadeContent duration={600}>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              All work
            </Link>
          </FadeContent>

          <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-brand">
              {project.index}
            </span>
            <span className="h-px w-10 bg-hairline" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.year}
            </span>
            <span className="flex items-center gap-2 rounded-full border border-hairline px-3 py-1">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  project.status === "in-development" ? "bg-brand" : "bg-muted-foreground",
                )}
                aria-hidden="true"
              />
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                {statusLabel[project.status]}
              </span>
            </span>
          </div>

          <h1 className="mt-6">
            <span className="sr-only">
              {project.name} — {project.tagline}
            </span>
            <SplitText
              tag="span"
              text={project.name}
              textAlign="left"
              className="font-display block text-[clamp(2.75rem,1.4rem+7.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              splitType="chars"
              delay={30}
              duration={1}
              ease="power4.out"
              from={{ opacity: 0, yPercent: 105 }}
              to={{ opacity: 1, yPercent: 0 }}
              threshold={0.05}
              rootMargin="0px"
            />
          </h1>

          <AnimatedContent distance={26} duration={0.8} delay={0.2} threshold={0.05}>
            <p className="mt-4 text-[clamp(1.125rem,1rem+0.8vw,1.75rem)] text-brand/90">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-lg">
              {project.summary}
            </p>
          </AnimatedContent>

          {/* Meta row */}
          <AnimatedContent distance={26} duration={0.8} delay={0.3} threshold={0.05}>
            <div className="mt-11 flex flex-col gap-8 border-t border-hairline pt-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
              <div className="grid flex-1 gap-8 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-none text-foreground">
                      {metric.prefix}
                      <CountUp to={metric.value} duration={1.6} />
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
                    className="cursor-target inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
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
                    className="cursor-target inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
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
                    className="cursor-target inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
                  >
                    Live site
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </AnimatedContent>

          {/* Tech */}
          <AnimatedContent distance={22} duration={0.7} delay={0.38} threshold={0.05}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-hairline bg-surface/70 px-3.5 py-1.5 font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </AnimatedContent>
        </div>
      </header>

      {/* ---------------------------------------------------------- *
       * Hero shot
       * ---------------------------------------------------------- */}
      <div className="shell">
        <AnimatedContent distance={40} duration={1} threshold={0.1}>
          <div className="overflow-hidden rounded-3xl border border-hairline bg-surface-2">
            <img
              src={project.image}
              alt={project.imageAlt}
              width={1600}
              height={1000}
              className="block h-auto w-full"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </AnimatedContent>
      </div>

      {/* ---------------------------------------------------------- *
       * Body
       * ---------------------------------------------------------- */}
      <div className="shell mt-20">
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
            className="!bg-surface/50"
          />
        </CaseStudyBlock>

        <CaseStudyBlock
          index="05"
          title={study.implementation.title}
          body={study.implementation.body}
          bullets={study.implementation.bullets}
        />

        {/* Challenges */}
        <section className="scroll-mt-28 border-t border-hairline py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
            <AnimatedContent distance={20} duration={0.7} threshold={0.2}>
              <div className="flex items-center gap-3 lg:sticky lg:top-28 lg:flex-col lg:items-start lg:gap-2">
                <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-brand">06</span>
                <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">
                  Challenges
                </h2>
              </div>
            </AnimatedContent>

            <div className="grid max-w-3xl gap-4">
              {study.challenges.map((challenge, index) => (
                <AnimatedContent
                  key={challenge.title}
                  distance={28}
                  duration={0.8}
                  delay={index * 0.05}
                  threshold={0.12}
                >
                  <SpotlightCard
                    className="h-full !rounded-2xl !border-hairline !bg-surface/70 !p-6 sm:!p-7"
                    spotlightColor="rgba(200, 255, 77, 0.08)"
                  >
                    <h3 className="flex items-start gap-3 font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                      <TriangleAlert
                        className="mt-0.5 size-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      {challenge.title}
                    </h3>
                    <p className="mt-3.5 pl-7 text-[0.9375rem] leading-[1.7] text-muted-foreground">
                      {challenge.body}
                    </p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        <CaseStudyBlock index="07" title={study.result.title} body={study.result.body} />

        <CaseStudyBlock index="08" title={study.lessons.title} body={study.lessons.body} />

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="border-t border-hairline py-14 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
              <AnimatedContent distance={20} duration={0.7} threshold={0.2}>
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-brand">09</span>
                  <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">
                    Screens
                  </h2>
                </div>
              </AnimatedContent>

              <div className="grid gap-8 sm:grid-cols-2">
                {project.gallery.map((shot, index) => (
                  <AnimatedContent
                    key={shot.src}
                    distance={30}
                    duration={0.85}
                    delay={index * 0.06}
                    threshold={0.12}
                  >
                    <figure>
                      {shot.portrait || reduceMotion ? (
                        <div
                          className={cn(
                            "grid place-items-center overflow-hidden rounded-2xl border border-hairline bg-surface-2",
                            shot.portrait ? "h-60 p-4" : "h-60",
                          )}
                        >
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            loading="lazy"
                            decoding="async"
                            className={cn(
                              shot.portrait
                                ? "h-full w-auto rounded-lg object-contain"
                                : "h-full w-full object-cover object-left-top",
                            )}
                          />
                        </div>
                      ) : (
                        <TiltedCard
                          imageSrc={shot.src}
                          altText={shot.alt}
                          captionText={shot.caption}
                          containerHeight="15rem"
                          containerWidth="100%"
                          imageHeight="15rem"
                          imageWidth="100%"
                          rotateAmplitude={9}
                          scaleOnHover={1.04}
                          showMobileWarning={false}
                          showTooltip
                        />
                      )}
                      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ---------------------------------------------------------- *
       * Next project
       * ---------------------------------------------------------- */}
      <section className="mt-10 border-t border-hairline">
        <Link href={`/work/${next.slug}`} className="group block">
          <div className="shell flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between sm:py-20">
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-4 font-display text-[clamp(2rem,1.2rem+4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] transition-colors duration-500 group-hover:text-brand">
                {next.name}
              </p>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">{next.tagline}</p>
            </div>

            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-hairline text-foreground transition-all duration-500 group-hover:border-brand/50 group-hover:bg-brand group-hover:text-brand-foreground">
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
