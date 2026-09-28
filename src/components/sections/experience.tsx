"use client";

import { Building2, Check } from "lucide-react";

import { Section } from "@/components/layout/section";
import { experience } from "@/content/engineering";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title="Where I have shipped"
      lead="One internship, taken end to end: from raw sensor data through model training to a deployed service other systems depended on."
    >
      <div className="shell">
        {experience.map((entry) => (
          <AnimatedContent
            key={`${entry.company}-${entry.period}`}
            distance={32}
            duration={0.85}
            threshold={0.15}
          >
            <SpotlightCard
              className="!rounded-none !border-hairline !bg-surface/80 !p-6 backdrop-blur sm:!p-8"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-brand">
                    {entry.period}
                  </p>
                  <h3 className="mt-2.5 font-display text-[clamp(1.35rem,1.05rem+1.2vw,2rem)] font-semibold leading-tight">
                    {entry.role}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="size-4 text-brand/70" aria-hidden="true" />
                    {entry.company}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-1.5">
                  {entry.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-hairline bg-surface-2/70 px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 max-w-2xl text-[0.875rem] leading-relaxed text-muted-foreground">
                {entry.summary}
              </p>

              <ul className="mt-6 grid gap-2.5 border-t border-hairline pt-5 sm:grid-cols-2">
                {entry.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="text-[0.8125rem] leading-relaxed text-foreground/90">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </Section>
  );
}
