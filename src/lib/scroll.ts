/** Vertical offset so anchor targets clear the fixed navigation bar. */
const NAV_OFFSET = 84;

/**
 * Native smooth scroll to an element id.
 *
 * Replaced Lenis: virtualised scrolling meant a permanent rAF loop plus a
 * scroll handler that refreshed every GSAP trigger on the page. `scroll-behavior`
 * is handled by the compositor and honours prefers-reduced-motion for free.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

/** Resolve an href such as "/#work" to its element id, when it has one. */
export function idFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  return hashIndex === -1 ? null : href.slice(hashIndex + 1);
}
