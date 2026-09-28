"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";
import { projects, statusLabel, type Project } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import PixelTransition from "@/components/reactbits/PixelTransition";
import CountUp from "@/components/reactbits/CountUp";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven stack: each project card sticks at an increasing offset while
 * the next card slides over it, and the covered card recedes (scale + blur).
 * Built on ScrollTrigger rather than React Bits' ScrollStack so it shares the
 * single global Lenis instance instead of creating a second one.
 */
export function ProjectStack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      const slots = gsap.utils.toArray<HTMLElement>("[data-stack-slot]");

      slots.forEach((slot, index) => {
        const card = slot.querySelector<HTMLElement>("[data-stack-card]");
        const next = slots[index + 1];
        if (!card || !next) return;

        gsap.to(card, {
          scale: 0.9,
          yPercent: -3,
          filter: "blur(5px)",
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top+=140",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      // Entrance lift for each card the first time it reaches the viewport.
      slots.forEach((slot) => {
        const card = slot.querySelector<HTMLElement>("[data-stack-card]");
        if (!card) return;

        gsap.from(card, {
          y: 64,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: slot, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="shell">
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            data-stack-slot
            className="sticky mb-8 last:mb-0"
            style={{
              top: `calc(6.5rem + ${index * 0.85}rem)`,
              zIndex: index + 1,
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Tail space so the final card can settle before the next section. */}
      <div className="h-[18vh]" aria-hidden="true" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-stack-card
      className={cn(
        "group/card relative overflow-hidden rounded-[28px] border border-hairline bg-surface/92 backdrop-blur-xl",
        "shadow-[0_28px_80px_-40px_rgba(0,0,0,0.9)] will-change-transform",
      )}
    >
      {/* Flagship gets a brand wash so it reads as the lead project. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          project.flagship
            ? "bg-[radial-gradient(120%_90%_at_88%_0%,rgba(200,255,77,0.09),transparent_60%)]"
            : "bg-[radial-gradient(120%_90%_at_88%_0%,rgba(255,255,255,0.035),transparent_60%)]",
        )}
      />

      <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12 lg:p-11">
        {/* ------------------------------ copy ------------------------------ */}
        <div className="flex flex-col">
          <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-brand">
              {project.index}
            </span>
            <span className="h-px w-10 bg-hairline" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <span className="ml-auto flex items-center gap-2 rounded-full border border-hairline px-3 py-1">
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
          </header>

          <h3 className="mt-6 font-display text-[clamp(2rem,1.2rem+2.6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-brand/90 sm:text-lg">{project.tagline}</p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.summary}
          </p>

          {/* Tech */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-hairline bg-surface-2/70 px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Metrics */}
          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dd className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                  {metric.prefix}
                  <CountUp to={metric.value} duration={1.6} />
                  {metric.suffix ?? "+"}
                </dd>
                <dt className="mt-1 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/work/${project.slug}`}
              className="cursor-target group/cta inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Read case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-target inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
                Repository
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-target inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                Live site
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}

            {project.appUrl && (
              <a
                href={project.appUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-target inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                Open the app
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* ------------------------------ media ------------------------------ */}
        <div className="relative lg:self-center">
          <PixelTransition
            style={{ width: "100%" }}
            className="!rounded-2xl !border !border-hairline !bg-surface-2"
            aspectRatio="64%"
            gridSize={12}
            pixelColor="#c8ff4d"
            animationStepDuration={0.36}
            firstContent={
              <img
                src={project.image}
                alt={project.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-left-top"
              />
            }
            secondContent={
              <div className="absolute inset-0 flex flex-col justify-between gap-4 bg-surface-2 p-6">
                <div>
                  <p className="eyebrow">Key features</p>
                  <ul className="mt-3 space-y-1.5">
                    {project.features.slice(0, 5).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-[0.8125rem] leading-snug text-foreground"
                      >
                        <span
                          className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand">
                  {project.year} · {project.tech.length} technologies
                </p>
              </div>
            }
          />

          <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
            Hover the frame to reveal key features
          </p>
        </div>
      </div>
    </article>
  );
}
