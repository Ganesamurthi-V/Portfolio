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
      lead="One internship, taken end to end: from raw sensor data through model training to a deployed service with an API other systems depended on."
    >
      <div className="shell">
        <ol className="relative border-l border-hairline pl-6 sm:pl-10">
          {experience.map((entry) => (
            <li key={`${entry.company}-${entry.period}`} className="relative">
              {/* Timeline node */}
              <span
                className="absolute -left-[calc(1.5rem+5px)] top-8 grid size-2.5 place-items-center sm:-left-[calc(2.5rem+5px)]"
                aria-hidden="true"
              >
                <span className="absolute size-2.5 rounded-full bg-brand/40 animate-pulse-ring" />
                <span className="size-2 rounded-full bg-brand" />
              </span>

              <AnimatedContent distance={36} duration={0.9} threshold={0.15}>
                <SpotlightCard
                  className="!rounded-3xl !border-hairline !bg-surface/80 !p-6 backdrop-blur sm:!p-9"
                  spotlightColor="rgba(200, 255, 77, 0.1)"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-brand">
                        {entry.period}
                      </p>
                      <h3 className="mt-3 font-display text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-tight">
                        {entry.role}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-2 text-base text-muted-foreground">
                        <Building2 className="size-4 text-brand/70" aria-hidden="true" />
                        {entry.company}
                      </p>
                    </div>

                    <ul className="flex flex-wrap gap-2">
                      {entry.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-hairline bg-surface-2/70 px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {entry.summary}
                  </p>

                  <div className="mt-7 border-t border-hairline pt-6">
                    <p className="eyebrow">Engineering contribution</p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5">
                          <Check
                            className="mt-0.5 size-3.5 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          <span className="text-[0.8125rem] leading-relaxed text-foreground/90">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
