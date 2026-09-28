"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";

const INTERACTIVE = "a, button, [role='tab'], input, textarea, label, [data-cursor]";

/**
 * Minimal two-part cursor: a dot that tracks the pointer almost exactly, and a
 * ring that trails behind and expands over anything interactive.
 *
 * Only mounted for fine pointers that have not asked for reduced motion —
 * replacing the system cursor on touch or assistive setups helps nobody.
 */
export function CursorLayer() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const disabled = isCompact || reduceMotion;

  useEffect(() => {
    if (disabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const moveRingX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    let shown = false;

    const onMove = (event: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }
      moveDotX(event.clientX);
      moveDotY(event.clientY);
      moveRingX(event.clientX);
      moveRingY(event.clientY);
    };

    const setHovering = (hovering: boolean) => {
      gsap.to(ring, {
        scale: hovering ? 1.9 : 1,
        borderColor: hovering ? "var(--brand)" : "rgba(238,240,242,0.5)",
        backgroundColor: hovering ? "rgba(255,255,255,0.1)" : "transparent",
        duration: 0.32,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: hovering ? 0 : 1,
        duration: 0.32,
        ease: "power3.out",
      });
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest?.(INTERACTIVE)) setHovering(true);
    };

    const onOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest?.(INTERACTIVE)) return;
      const next = event.relatedTarget as Element | null;
      if (next?.closest?.(INTERACTIVE)) return;
      setHovering(false);
    };

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.18, ease: "power3.out" });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });

    const onLeaveWindow = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, true);
    window.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver, true);
      window.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeaveWindow);
      gsap.killTweensOf([dot, ring]);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-9 rounded-full border opacity-0 will-change-transform"
        style={{ borderColor: "rgba(238,240,242,0.5)" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-brand opacity-0 will-change-transform"
      />
    </div>
  );
}
