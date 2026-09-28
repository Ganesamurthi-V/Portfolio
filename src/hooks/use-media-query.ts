"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook built on `useSyncExternalStore`, so the match is
 * read from `matchMedia` rather than mirrored into state. Returns `false` on
 * the server and during hydration, then settles to the real value.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on pointer-coarse or narrow viewports — used to drop heavy WebGL work. */
export function useIsCompact() {
  return useMediaQuery("(max-width: 767px), (pointer: coarse)");
}
