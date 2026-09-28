"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline read-progress indicator pinned under the navigation bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-gradient-to-r from-brand/0 via-brand to-brand/40"
    />
  );
}
