"use client";

import dynamic from "next/dynamic";

import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";

const TargetCursor = dynamic(() => import("@/components/reactbits/TargetCursor"), {
  ssr: false,
});

/**
 * Corner-locking cursor that snaps onto any `.cursor-target` element.
 * Only mounted for fine pointers that have not asked for reduced motion —
 * replacing the system cursor on touch or assistive setups helps nobody.
 */
export function CursorLayer() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  if (isCompact || reduceMotion) return null;

  return (
    <TargetCursor
      targetSelector=".cursor-target"
      spinDuration={5}
      hideDefaultCursor
      cursorColor="#eef0f2"
      cursorColorOnTarget="#c8ff4d"
    />
  );
}
