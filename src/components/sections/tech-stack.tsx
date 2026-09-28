"use client";

import { Section } from "@/components/layout/section";
import { stackGroups, techMarquee } from "@/content/engineering";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import LogoLoop from "@/components/reactbits/LogoLoop";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const toLogos = (labels: string[]) =>
  labels.map((label) => ({
    node: (
      <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:text-brand">
        {label}
      </span>
    ),
    title: label,
    ariaLabel: label,
  }));

export function TechStack() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section
      id="stack"
      index="06"
      eyebrow="Technology Stack"
      title="The tools, grouped honestly"
      lead="Listed by layer rather than as a logo wall. Everything here has been used to build or operate something that ran."
      innerClassName="mt-14 sm:mt-16"
    >
      {/* Velocity-reactive band */}
      {!reduceMotion && (
        <div
          className="relative border-y border-hairline py-8 select-none"
          aria-hidden="true"
        >
          <ScrollVelocity
            texts={["TypeScript · Next.js · PostgreSQL ·", "Flask · Docker · Supabase ·"]}
            velocity={48}
            numCopies={8}
            damping={44}
            stiffness={360}
            className="font-display font-semibold tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]"
            scrollerClassName="!text-[clamp(2.25rem,7vw,5.5rem)] !leading-[1.06] !drop-shadow-none"
            parallaxClassName="py-1"
          />
        </div>
      )}

      {/* Marquee rows */}
      <div className="mt-14 space-y-4">
        <div className="relative h-14">
          <LogoLoop
            logos={toLogos(techMarquee.primary)}
            speed={44}
            direction="left"
            gap={56}
            logoHeight={20}
            fadeOut
            fadeOutColor="#07080a"
            pauseOnHover
            scaleOnHover
            ariaLabel="Primary technologies"
          />
        </div>
        <div className="relative h-14">
          <LogoLoop
            logos={toLogos(techMarquee.secondary)}
            speed={36}
            direction="right"
            gap={56}
            logoHeight={20}
            fadeOut
            fadeOutColor="#07080a"
            pauseOnHover
            scaleOnHover
            ariaLabel="Supporting technologies"
          />
        </div>
      </div>

      {/* Grouped detail */}
      <div className="shell mt-20">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, index) => (
            <AnimatedContent
              key={group.label}
              distance={28}
              duration={0.75}
              delay={index * 0.05}
              threshold={0.15}
              className="bg-surface/85"
            >
              <div className="h-full p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="eyebrow">{group.label}</p>
                  <span className="font-mono text-[0.625rem] text-brand/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {group.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-hairline bg-surface-2/60 px-2.5 py-1 font-mono text-[0.6875rem] text-foreground/75"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </Section>
  );
}
