"use client";

import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { Section } from "@/components/layout/section";
import { about, currentlyBuilding, education, site } from "@/content/site";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

const profile = [
  { term: "Role", detail: site.role },
  { term: "Based in", detail: site.location },
  { term: "Focus", detail: "SaaS products and business applications" },
  { term: "Availability", detail: "Open to 2026 roles and internships" },
];

export function About() {
  return (
    <Section id="about" index="05" eyebrow="About" title={about.heading} lead={about.body}>
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <ScrollReveal
            baseOpacity={0.1}
            baseRotation={2}
            blurStrength={4}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.05rem,0.95rem+0.7vw,1.45rem)] !font-normal !leading-[1.55] text-foreground/90"
          >
            {about.detail}
          </ScrollReveal>

          {/* Currently building — folded in rather than given its own section */}
          <AnimatedContent distance={26} duration={0.8} threshold={0.15} className="mt-10">
            <div className="rounded-none border border-hairline bg-surface/70 p-5 backdrop-blur sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="relative grid size-2.5 place-items-center">
                  <span className="absolute size-2.5 rounded-full bg-brand/50 animate-pulse-ring" />
                  <span className="size-1.5 rounded-full bg-brand" />
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-brand">
                  Currently building
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {currentlyBuilding.project}
                </span>
                <Link
                  href="/work/gymflow"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="link-underline">Case study</span>
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {currentlyBuilding.summary}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {["Reports module", "WhatsApp sweeps", "Member rewards"].map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-hairline bg-surface-2/60 px-2.5 py-1 font-mono text-[0.625rem] text-foreground/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={32} duration={0.85} delay={0.08} threshold={0.15}>
          <div className="rounded-none border border-hairline bg-surface/70 p-6 backdrop-blur sm:p-7">
            <p className="eyebrow">Profile</p>

            <dl className="mt-5 space-y-4">
              {profile.map((row) => (
                <div
                  key={row.term}
                  className="border-b border-hairline pb-4 last:border-0 last:pb-0"
                >
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {row.term}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{row.detail}</dd>
                </div>
              ))}
            </dl>

            {/* Education — a supporting detail, not its own section */}
            <div className="mt-7 border-t border-hairline pt-6">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-surface-2 text-brand">
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-snug text-foreground">
                    {education.degree}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                    {education.institution}
                  </p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-brand">
                    {education.expected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </Section>
  );
}
