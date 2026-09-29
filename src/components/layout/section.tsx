import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "@/components/ui/reveal";

interface SectionProps {
  id: string;
  index?: string;
  eyebrow?: string;
  title?: string;
  lead?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * Shared section shell: hairline rule, eyebrow with index, revealed heading
 * and an optional lead paragraph.
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
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead || action);

  return (
    <section id={id} className={cn("relative scroll-mt-24 py-14 sm:py-18 lg:py-24", className)}>
      {hasHeader && (
        <div className="shell">
          <div className="rule mb-8" aria-hidden="true" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {(eyebrow || index) && (
                <Reveal className="flex items-center gap-3">
                  {index && (
                    <span className="font-mono text-[0.6875rem] tracking-[0.24em] text-silver-400">
                      {index}
                    </span>
                  )}
                  {index && eyebrow && <span className="h-px w-8 bg-hairline" aria-hidden="true" />}
                  {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                </Reveal>
              )}

              {title && (
                <h2 className="mt-4">
                  <RevealText
                    text={title}
                    stagger={16}
                    className="font-display text-[clamp(2rem,1.2rem+3.4vw,3.75rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground"
                  />
                </h2>
              )}

              {lead && (
                <Reveal delay={80}>
                  <p className="mt-4 max-w-2xl text-balance-tight text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {lead}
                  </p>
                </Reveal>
              )}
            </div>

            {action && (
              <Reveal delay={120} className="shrink-0">
                {action}
              </Reveal>
            )}
          </div>
        </div>
      )}

      <div className={cn(hasHeader && "mt-10 sm:mt-12", innerClassName)}>{children}</div>
    </section>
  );
}
