import type Lenis from "lenis";

/** Vertical offset so anchor targets clear the fixed navigation bar. */
const NAV_OFFSET = 84;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth scroll to an element id using Lenis when available.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.2 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }
}

/** Resolve an href such as "/#work" to its element id, when it has one. */
export function idFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? null : href.slice(hashIndex + 1);
}

