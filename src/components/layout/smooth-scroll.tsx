"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { setLenis } from "@/lib/lenis-store";

gsap.registerPlugin(ScrollTrigger);

/**
 * The single source of smooth scrolling for the whole site.
 *
 * Lenis drives the scroll position and GSAP's ticker drives Lenis, so every
 * ScrollTrigger on the page stays in sync with the interpolated position
 * instead of the raw one. Skipped entirely when the visitor prefers reduced
 * motion, in which case native scrolling takes over.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
      anchors: { offset: -88, duration: 1.2 },
      // Let genuinely scrollable panels (code blocks, overflow areas) scroll natively.
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent") ?? false,
    });

    setLenis(lenis);

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Layout settles after fonts load; stale trigger positions cause jumps.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
