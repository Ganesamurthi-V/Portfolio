"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { projects } from "@/content/projects";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import { Reveal } from "@/components/ui/reveal";

export function Architecture() {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);

  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const { architecture } = active.caseStudy;

  return (
    <Section
      id="architecture"
      index="03"
      eyebrow="Technical Architecture"
      title="How the systems fit together"
      lead="Same diagram language across every project: client, edge, services, then data and external dependencies. Pick a project to trace its request path."
    >
      <div className="shell">
        <Reveal>
          <div role="tablist" aria-label="Project architecture" className="flex flex-wrap gap-2">
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
                    "border px-4 py-2 text-sm transition-colors duration-200",
                    selected
                      ? "border-foreground/45 bg-surface-2 text-foreground"
                      : "border-hairline text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                  )}
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.16em] text-silver-400">
                    {project.index}
                  </span>
                  <span className="ml-2">{project.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

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
  );
}
