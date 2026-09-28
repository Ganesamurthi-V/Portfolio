"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { ProjectStack } from "@/components/sections/project-stack";
import { projects } from "@/content/projects";

const flagship = projects.find((project) => project.flagship) ?? projects[0];

export function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected Work"
      title="Real products, shipped end to end"
      lead="Four projects, each with a case study covering the problem, the architecture and the decisions that mattered."
      action={
        <Link
          href={`/work/${flagship.slug}`}
          className="group inline-flex items-center gap-2.5 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
        >
          Start with {flagship.name}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      }
    >
      <ProjectStack />
    </Section>
  );
}
