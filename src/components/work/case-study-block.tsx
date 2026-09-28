"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

interface Props {
  index: string;
  title: string;
  body?: string;
  bullets?: string[];
  children?: ReactNode;
  className?: string;
}

/** One numbered block of a case study: heading, prose, optional bullet list. */
export function CaseStudyBlock({
  index,
  title,
  body,
  bullets,
  children,
  className,
}: Props) {
  return (
    <section className={cn("scroll-mt-28 border-t border-hairline py-14 sm:py-20", className)}>
      <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-16">
        <AnimatedContent distance={20} duration={0.7} threshold={0.2}>
          <div className="flex items-center gap-3 lg:sticky lg:top-28 lg:flex-col lg:items-start lg:gap-2">
            <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-brand">
              {index}
            </span>
            <h2 className="font-display text-lg font-semibold tracking-tight lg:text-xl">
              {title}
            </h2>
          </div>
        </AnimatedContent>

        <AnimatedContent distance={28} duration={0.85} delay={0.05} threshold={0.15}>
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
                      className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-brand"
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
        </AnimatedContent>
      </div>
    </section>
  );
}
