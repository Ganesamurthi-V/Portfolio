"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll reveal built on one shared IntersectionObserver plus a CSS
 * transition. Replaces the GSAP ScrollTrigger wrappers, which each attached a
 * trigger that recalculated on every scroll frame — roughly sixty of them on
 * the home page.
 *
 * Elements are observed once and unobserved as soon as they appear, so there
 * is no ongoing scroll work at all.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  if (typeof IntersectionObserver === "undefined") return null;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  return observer;
}

interface RevealProps {
  children: ReactNode;
  /** Delay in ms, for staggering siblings. */
  delay?: number;
  as?: ElementType;
  className?: string;
}

export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }

    // Already in view on mount (above the fold): show immediately so nothing
    // sits invisible waiting for a scroll that may never happen.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }

    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Component>
  );
}

interface RevealTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Per-character stagger in ms. */
  stagger?: number;
  delay?: number;
}

/**
 * Character-staggered heading. Characters are grouped into non-breaking word
 * spans so the heading still wraps between words, and the whole thing is one
 * CSS transition per character with an inline delay — no animation library.
 */
export function RevealText({
  text,
  as: Tag = "span",
  className,
  stagger = 22,
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = getObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
      return;
    }

    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const words = text.split(" ");
  let index = 0;

  const Component = Tag as any;

  return (
    <Component ref={ref} className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <span
                key={charIndex}
                className="reveal-char"
                style={{ "--char-delay": `${delay + index++ * stagger}ms` } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
            {wordIndex < words.length - 1 && (
              <span
                className="reveal-char"
                style={{ "--char-delay": `${delay + index++ * stagger}ms` } as React.CSSProperties}
              >
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </span>
    </Component>
  );
}
