"use client";

import { GraduationCap } from "lucide-react";

import { Section } from "@/components/layout/section";
import { education } from "@/content/site";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ShinyText from "@/components/reactbits/ShinyText";

export function Education() {
  return (
    <Section
      id="education"
      index="07"
      eyebrow="Education"
      title="Academic background"
      innerClassName="mt-10 sm:mt-12"
    >
      <div className="shell">
        <AnimatedContent distance={30} duration={0.8} threshold={0.2}>
          <div className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface/70 p-6 backdrop-blur sm:p-9">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/55 to-transparent"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-hairline bg-surface-2 text-brand">
                  <GraduationCap className="size-5" aria-hidden="true" />
                </span>

                <div>
                  <h3 className="font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug">
                    {education.degree}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
                    {education.institution}
                  </p>
                  <p className="mt-4 max-w-xl text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {education.note}
                  </p>
                </div>
              </div>

              <div className="shrink-0 lg:text-right">
                <p className="eyebrow">Graduating</p>
                <div className="mt-2">
                  <ShinyText
                    text={education.expected}
                    className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
                    color="#6f7684"
                    shineColor="#c8ff4d"
                    speed={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </Section>
  );
}
