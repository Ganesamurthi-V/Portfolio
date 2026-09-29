import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface Props {
  index: string;
  title: string;
  body?: string;
  bullets?: string[];
  children?: ReactNode;
  className?: string;
}

/** One numbered block of a case study: heading, prose, optional bullet list. */
export function CaseStudyBlock({ index, title, body, bullets, children, className }: Props) {
  return (
    <section className={cn("scroll-mt-24 border-t border-hairline py-12 sm:py-16", className)}>
      <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="flex items-center gap-3 lg:sticky lg:top-24 lg:flex-col lg:items-start lg:gap-2">
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-silver-400">
              {index}
            </span>
            <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">{title}</h2>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="max-w-3xl">
            {body && (
              <p className="text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-base">
                {body}
              </p>
            )}

            {bullets && bullets.length > 0 && (
              <ul className={cn("space-y-3", body && "mt-7")}>
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span
                      className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-silver-400"
                      aria-hidden="true"
                    />
                    <span className="text-[0.9375rem] leading-[1.7] text-foreground/85">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {children && <div className={cn(body || bullets ? "mt-10" : "")}>{children}</div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
