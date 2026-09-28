"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ScrollFloat from "@/components/reactbits/ScrollFloat";

interface SectionProps {
  id: string;
  /** Two-digit marker rendered beside the eyebrow. */
  index?: string;
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Render the heading block without the shell padding wrapper. */
  bleed?: boolean;
}

/**
 * Shared section shell: hairline top rule, eyebrow with index, scroll-driven
 * heading and an optional lead paragraph.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  lead,
  action,
  children,
  className,
  innerClassName,
  bleed = false,
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead || action);

  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 py-24 sm:py-32 lg:py-40", className)}
    >
      {hasHeader && (
        <div className={cn(!bleed && "shell", bleed && "shell")}>
          <div className="rule mb-10" aria-hidden="true" />

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {(eyebrow || index) && (
                <AnimatedContent distance={24} duration={0.7} threshold={0.25}>
                  <div className="flex items-center gap-3">
                    {index && (
                      <span className="font-mono text-[0.6875rem] tracking-[0.24em] text-brand">
                        {index}
                      </span>
                    )}
                    {index && eyebrow && (
                      <span className="h-px w-8 bg-hairline" aria-hidden="true" />
                    )}
                    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                  </div>
                </AnimatedContent>
              )}

              {title && (
                <ScrollFloat
                  containerClassName="!my-4"
                  // `!leading` is required: ScrollFloat ships its own
                  // leading-[1.5] on the same element.
                  textClassName="font-display !text-[clamp(2rem,1.2rem+3.4vw,3.75rem)] font-semibold !leading-[1.06] tracking-[-0.035em] text-foreground"
                  scrollStart="center bottom+=28%"
                  scrollEnd="bottom bottom-=22%"
                  stagger={0.018}
                >
                  {title}
                </ScrollFloat>
              )}

              {lead && (
                <AnimatedContent distance={28} duration={0.8} delay={0.06} threshold={0.2}>
                  <p className="max-w-2xl text-balance-tight text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {lead}
                  </p>
                </AnimatedContent>
              )}
            </div>

            {action && (
              <AnimatedContent
                distance={24}
                duration={0.7}
                delay={0.1}
                threshold={0.2}
                className="shrink-0"
              >
                {action}
              </AnimatedContent>
            )}
          </div>
        </div>
      )}

      <div className={cn(hasHeader && "mt-14 sm:mt-16 lg:mt-20", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
