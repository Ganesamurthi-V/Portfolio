"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { projects, statusLabel, type Project } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import PixelTransition from "@/components/reactbits/PixelTransition";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven stack: each project card sticks at an increasing offset while
 * the next slides over it, and the covered card recedes. Built on ScrollTrigger
 * rather than React Bits' ScrollStack so it shares the single global Lenis
 * instance instead of creating a second one.
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
        if (!card) return;

        const next = slots[index + 1];
        if (next) {
          gsap.to(card, {
            scale: 0.93,
            filter: "blur(4px)",
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: "top top+=120",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: slot, start: "top 90%", once: true },
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
            className="sticky mb-6 last:mb-0"
            style={{ top: `calc(6rem + ${index * 0.7}rem)`, zIndex: index + 1 }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Small tail so the last card settles before the next section. */}
      <div className="h-[8vh]" aria-hidden="true" />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-stack-card
      className="relative overflow-hidden rounded-none border border-hairline bg-surface/93 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl will-change-transform"
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0",
          project.flagship
            ? "bg-[radial-gradient(110%_85%_at_88%_0%,rgba(255,255,255,0.09),transparent_60%)]"
            : "bg-[radial-gradient(110%_85%_at_88%_0%,rgba(255,255,255,0.035),transparent_60%)]",
        )}
      />

      <div className="relative grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
        {/* ------------------------------ copy ------------------------------ */}
        <div className="flex flex-col">
          <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-brand">
              {project.index}
            </span>
            <span className="h-px w-8 bg-hairline" aria-hidden="true" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              {project.category}
            </span>
            <span className="ml-auto flex items-center gap-2 rounded-full border border-hairline px-2.5 py-1">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  project.status === "live" ? "bg-brand" : "bg-muted-foreground",
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
          <p className="mt-1.5 text-sm text-brand/90 sm:text-base">{project.tagline}</p>

          <p className="mt-4 max-w-xl text-[0.875rem] leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-hairline bg-surface-2/70 px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
            <Link
              href={`/work/${project.slug}`}
              className="group/cta inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              Case study
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
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
                className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        {/* ------------------------------ media ------------------------------ */}
        <div className="lg:self-center">
          <PixelTransition
            style={{ width: "100%" }}
            className="!rounded-none !border !border-hairline !bg-surface-2"
            aspectRatio="60%"
            gridSize={12}
            pixelColor="#e4e4e7"
            animationStepDuration={0.34}
            firstContent={
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-left-top"
              />
            }
            secondContent={
              <div className="absolute inset-0 flex flex-col justify-between gap-3 bg-surface-2 p-5">
                <div>
                  <p className="eyebrow">Key features</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {project.features.slice(0, 4).map((feature) => (
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
                  {project.year} · {project.features.length} features
                </p>
              </div>
            }
          />
        </div>
      </div>
    </article>
  );
}
