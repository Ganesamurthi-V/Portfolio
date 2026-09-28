import type Lenis from "lenis";

/**
 * Module-level handle on the single Lenis instance so any component can drive
 * programmatic scrolling without threading a ref through the tree.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

/** Vertical offset so targets clear the fixed navigation bar. */
export const SCROLL_OFFSET = -88;

/**
 * Scroll to an element id, using Lenis when available and falling back to the
 * native API when smooth scrolling is disabled (reduced motion, no JS yet).
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: SCROLL_OFFSET, duration: 1.2 });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
}

/** Resolve an href such as "/#work" to its element id, when it has one. */
export function idFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? null : href.slice(hashIndex + 1);
}
