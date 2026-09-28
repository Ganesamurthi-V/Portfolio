"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ProjectStack } from "@/components/sections/project-stack";
import { projects } from "@/content/projects";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const ScrollExpand = dynamic(() => import("@/components/reactbits/ScrollExpand"), {
  ssr: false,
});

const flagship = projects.find((project) => project.flagship) ?? projects[0];

export function SelectedWork() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected Work"
      title="Real products, shipped end to end"
      lead="Four projects that carry the weight of this portfolio. Each one has a case study covering the problem, the architecture, the decisions and what broke along the way."
      action={
        <Link
          href={`/work/${flagship.slug}`}
          className="cursor-target group inline-flex items-center gap-2.5 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
        >
          Start with {flagship.name}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      }
      innerClassName="mt-0"
    >
      {/* -------------------------------------------------------------- *
       * Flagship scroll-zoom reveal
       * -------------------------------------------------------------- */}
      {!reduceMotion && (
        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <ScrollExpand
            className="!h-auto"
            src={flagship.image}
            alt={flagship.imageAlt}
            mediaType="image"
            title={flagship.name}
            scrollHint="Keep scrolling"
            useWindowScroll
            startWidth={44}
            startHeight={56}
            startRadius={28}
            endRadius={0}
            mediaZoom={1.28}
            scrollDistance={1.1}
            holdDistance={0.3}
            overlayScrim={0.55}
          >
            <div className="max-w-2xl">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-brand">
                Flagship project · {flagship.category}
              </p>
              <p className="mt-4 font-display text-[clamp(1.5rem,1rem+2vw,2.75rem)] font-semibold leading-tight text-white">
                {flagship.tagline}
              </p>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                {flagship.summary}
              </p>
              <Link
                href={`/work/${flagship.slug}`}
                className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
              >
                Read the {flagship.name} case study
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </ScrollExpand>
        </div>
      )}

      {/* -------------------------------------------------------------- *
       * Stacked project cards
       * -------------------------------------------------------------- */}
      <AnimatedContent
        distance={0}
        duration={0.6}
        threshold={0.05}
        className="shell !px-0"
      >
        <div className="shell mt-24 flex items-end justify-between gap-6 sm:mt-28">
          <div>
            <p className="eyebrow">All projects</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Scroll through the stack — each card settles as the next one moves in.
            </p>
          </div>
          <p className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>
      </AnimatedContent>

      <div className="mt-10">
        <ProjectStack />
      </div>
    </Section>
  );
}
