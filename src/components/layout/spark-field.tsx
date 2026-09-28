"use client";

import type { ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import ClickSpark from "@/components/reactbits/ClickSpark";

/**
 * Click feedback, scoped to a single bounded region so the spark canvas never
 * has to cover the full document height.
 */
export function SparkField({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <ClickSpark
      sparkColor="#e4e4e7"
      sparkSize={9}
      sparkRadius={20}
      sparkCount={9}
      duration={420}
      easing="ease-out"
      extraScale={1.1}
    >
      {children}
    </ClickSpark>
  );
}
