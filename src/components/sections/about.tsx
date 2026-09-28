"use client";

import { Section } from "@/components/layout/section";
import { about, site } from "@/content/site";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import CountUp from "@/components/reactbits/CountUp";
import GlareHover from "@/components/reactbits/GlareHover";

const facts = [
  { label: "Shipped projects", value: 4, suffix: "" },
  { label: "Production internship", value: 1, suffix: "" },
  { label: "Core stack languages", value: 3, suffix: "" },
];

export function About() {
  return (
    <Section
      id="about"
      index="05"
      eyebrow="About"
      title={about.heading}
      lead={about.body}
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <ScrollReveal
            baseOpacity={0.1}
            baseRotation={2.5}
            blurStrength={4}
            containerClassName="!my-0"
            textClassName="text-[clamp(1.1rem,0.95rem+0.9vw,1.6rem)] font-normal leading-[1.55] text-foreground/90"
          >
            {about.detail}
          </ScrollReveal>

          <AnimatedContent distance={30} duration={0.8} threshold={0.2} className="mt-12">
            <dl className="grid grid-cols-3 gap-6 border-t border-hairline pt-8">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dd className="font-display text-[clamp(2rem,1.4rem+1.6vw,3rem)] font-semibold leading-none text-brand">
                    <CountUp to={fact.value} duration={1.4} />
                    {fact.suffix}
                  </dd>
                  <dt className="mt-2 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                    {fact.label}
                  </dt>
                </div>
              ))}
            </dl>
          </AnimatedContent>
        </div>

        <AnimatedContent distance={40} duration={0.9} delay={0.1} threshold={0.15}>
          <GlareHover
            width="100%"
            height="100%"
            background="color-mix(in oklab, var(--surface) 82%, transparent)"
            borderColor="var(--hairline)"
            borderRadius="24px"
            glareColor="#c8ff4d"
            glareOpacity={0.14}
            glareAngle={-38}
            glareSize={220}
            transitionDuration={800}
            className="!block !place-items-stretch"
          >
            <div className="p-7 sm:p-9">
              <p className="eyebrow">Profile</p>

              <dl className="mt-6 space-y-5">
                {[
                  { term: "Role", detail: site.role },
                  { term: "Based in", detail: site.location },
                  { term: "Focus", detail: "SaaS products and business applications" },
                  { term: "Availability", detail: "Open to 2026 roles and internships" },
                ].map((row) => (
                  <div key={row.term} className="border-b border-hairline pb-5 last:border-0 last:pb-0">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {row.term}
                    </dt>
                    <dd className="mt-1.5 text-sm text-foreground sm:text-base">{row.detail}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-7 text-[0.8125rem] leading-relaxed text-muted-foreground">
                The portfolio is deliberately project-led. If you want the detail behind any
                of it, the case studies go down to schema decisions and the things that went
                wrong.
              </p>
            </div>
          </GlareHover>
        </AnimatedContent>
      </div>
    </Section>
  );
}
