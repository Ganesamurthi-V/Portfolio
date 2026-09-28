"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/projects";
import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const DotGrid = dynamic(() => import("@/components/reactbits/DotGrid"), { ssr: false });

export function Architecture() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const { architecture } = active.caseStudy;

  return (
    <div className="relative">
      {!isCompact && !reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
          aria-hidden="true"
        >
          <DotGrid
            dotSize={2}
            gap={34}
            baseColor="#1b1f27"
            activeColor="#c8ff4d"
            proximity={130}
            shockRadius={210}
            shockStrength={4}
            returnDuration={1.4}
          />
        </div>
      )}

      <Section
        id="architecture"
        index="03"
        eyebrow="Technical Architecture"
        title="How the systems fit together"
        lead="Same diagram language across every project: client, edge, services, then data and external dependencies. Pick a project to trace its request path."
      >
        <div className="shell">
          {/* Project switcher */}
          <AnimatedContent distance={24} duration={0.7} threshold={0.2}>
            <div
              role="tablist"
              aria-label="Project architecture"
              className="flex flex-wrap gap-2"
            >
              {projects.map((project) => {
                const selected = project.slug === activeSlug;
                return (
                  <button
                    key={project.slug}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => setActiveSlug(project.slug)}
                    className={cn(
                      "cursor-target rounded-full border px-4 py-2 text-sm transition-all duration-300",
                      selected
                        ? "border-brand/50 bg-brand/10 text-foreground"
                        : "border-hairline text-muted-foreground hover:border-brand/30 hover:text-foreground",
                    )}
                  >
                    <span className="font-mono text-[0.625rem] tracking-[0.16em] text-brand">
                      {project.index}
                    </span>
                    <span className="ml-2">{project.name}</span>
                  </button>
                );
              })}
            </div>
          </AnimatedContent>

          <p className="mt-7 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {architecture.body}
          </p>

          <div className="mt-8">
            <ArchitectureDiagram
              key={active.slug}
              nodes={architecture.nodes}
              edges={architecture.edges}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
