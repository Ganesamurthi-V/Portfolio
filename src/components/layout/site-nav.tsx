"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { idFromHref, scrollToId } from "@/lib/scroll";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Floating navbar metrics, in px.
 * Following GymFlow's approach with precise constants for smooth animations.
 */
const NAV_TOP = 14;
const NAV_H = 72;
const NAV_H_SCROLLED = 60;
const NAV_MAX_W = 1200;
const NAV_MAX_W_SCROLLED = 1000;

/**
 * Scroll distance before the navbar collapses.
 * Using GymFlow's approach - past the hero area for natural feel.
 */
const COLLAPSE_AT = 80;

/**
 * Desktop breakpoint for mobile menu.
 */
const DESKTOP_AT = 1024;

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  // Refs for the moving highlight animation
  const highlightRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Derived mobile state (like GymFlow)
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_AT}px)`);
  const sheetOpen = open && !isDesktop;

  const highlightTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Function to move highlight on hover
  const moveHighlight = useCallback((element: HTMLElement) => {
    if (!highlightRef.current || !element) return;
    
    clearTimeout(highlightTimeout.current);
    const rect = element.getBoundingClientRect();
    const nav = element.closest('nav');
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    
    const left = rect.left - navRect.left;
    const top = rect.top - navRect.top;
    
    highlightRef.current.style.opacity = '1';
    highlightRef.current.style.width = `${rect.width}px`;
    highlightRef.current.style.height = `${rect.height}px`;
    highlightRef.current.style.transform = `translate(${left}px, ${top}px)`;
  }, []);

  // Function to reset highlight
  const resetHighlight = useCallback(() => {
    highlightTimeout.current = setTimeout(() => {
      if (!highlightRef.current) return;
      highlightRef.current.style.opacity = '0';
    }, 50);
  }, []);

  // Function to update active indicator position
  const updateActiveIndicator = useCallback(() => {
    if (!activeRef.current) return;
    
    if (!isHome) {
      activeRef.current.style.opacity = '0';
      return;
    }
    
    const activeLink = document.querySelector(`a[href="/#${active}"]`) as HTMLAnchorElement;
    if (!activeLink) {
      activeRef.current.style.opacity = '0';
      return;
    }
    
    const rect = activeLink.getBoundingClientRect();
    const nav = activeLink.closest('nav');
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    
    const left = rect.left - navRect.left;
    const top = rect.top - navRect.top;
    
    activeRef.current.style.opacity = '1';
    activeRef.current.style.width = `${rect.width}px`;
    activeRef.current.style.height = `${rect.height}px`;
    activeRef.current.style.transform = `translate(${left}px, ${top}px)`;
  }, [active, isHome]);

  // Update active indicator when active section changes
  useEffect(() => {
    updateActiveIndicator();
  }, [updateActiveIndicator]);

  // Update positions on resize and layout shifts (e.g., font loading)
  useEffect(() => {
    const handleResize = () => {
      updateActiveIndicator();
    };

    window.addEventListener('resize', handleResize);
    
    let observer: ResizeObserver | null = null;
    if (navRef.current) {
      observer = new ResizeObserver(() => {
        updateActiveIndicator();
      });
      observer.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer?.disconnect();
    };
  }, [updateActiveIndicator]);

  /* Scroll-based navbar collapse (GymFlow style) */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      // rAF-throttled and passive so the handler never blocks the scroll thread.
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > COLLAPSE_AT);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  /* Track which section owns the viewport. */
  useEffect(() => {
    if (!isHome) return;

    const targets = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isHome]);

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : '';
    if (sheetOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  }, [sheetOpen]);

  // Escape closes the mobile sheet
  useEffect(() => {
    if (!sheetOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen]);

  const handleAnchor = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const id = idFromHref(href);
      if (!id || !isHome) return;

      event.preventDefault();
      setOpen(false);
      scrollToId(id);
      window.history.replaceState(null, "", id === "top" ? "/" : `#${id}`);
    },
    [isHome],
  );
  return (
    <>
      {/* Two layers like GymFlow: transparent frame + animated island */}
      <header 
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50 px-3 md:px-5"
        style={{ paddingTop: NAV_TOP }}
      >
        <nav
          aria-label="Main"
          className="relative mx-auto flex items-center justify-between gap-3 px-3 sm:gap-6 sm:px-4 md:px-6 transition-all duration-500 ease-out"
          style={{
            height: scrolled ? NAV_H_SCROLLED : NAV_H,
            maxWidth: scrolled ? NAV_MAX_W_SCROLLED : NAV_MAX_W,
            borderRadius: 16,
            // GymFlow-style background with color-mix
            backgroundColor: scrolled
              ? 'color-mix(in srgb, var(--surface) 80%, transparent)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: scrolled ? '1px solid var(--hairline)' : '1px solid transparent',
            boxShadow: scrolled
              ? '0 10px 34px -12px color-mix(in srgb, rgb(var(--foreground)) 15%, transparent)'
              : 'none',
            // Own compositor layer for smooth animations
            transform: 'translateZ(0)',
          }}
        >
          {/* Moving highlight background */}
          <div 
            ref={highlightRef}
            className="absolute top-0 left-0 bg-surface/60 backdrop-blur-sm transition-all duration-300 ease-out rounded-full opacity-0 border border-hairline/40 pointer-events-none"
            style={{
              width: '0px',
              height: '0px',
              transform: 'translate(0px, 0px)',
              zIndex: 0
            }}
          />
          
          {/* Active indicator */}
          <div 
            ref={activeRef}
            className="absolute top-0 left-0 bg-surface/80 backdrop-blur-sm transition-all duration-500 ease-out rounded-full border border-foreground/10 pointer-events-none"
            style={{
              width: '0px',
              height: '0px',
              transform: 'translate(0px, 0px)',
              boxShadow: isHome && active !== 'top' ? '0 0 20px rgba(255, 255, 255, 0.05)' : 'none',
              zIndex: 0
            }}
          />

          {/* Logo */}
          <Link
            href="/"
            onClick={(event) => handleAnchor(event, "/#top")}
            className="flex shrink-0 items-center gap-3 relative z-10 px-2 py-1.5 rounded-full"
            aria-label={`${site.name} — home`}
            onMouseEnter={(e) => moveHighlight(e.currentTarget)}
            onMouseLeave={() => resetHighlight()}
          >
            <span 
              className="grid place-items-center border border-hairline bg-surface font-mono text-xs font-semibold text-silver-200 transition-all duration-500"
              style={{
                width: scrolled ? 32 : 36,
                height: scrolled ? 32 : 36,
              }}
            >
              {site.initials}
            </span>
            <span
              className={cn(
                "flex-col leading-tight transition-all duration-500",
                scrolled ? "hidden" : "flex",
              )}
              style={{
                opacity: scrolled ? 0 : 1,
                transform: scrolled ? 'translateX(-10px)' : 'translateX(0)',
              }}
            >
              <span className="font-display text-sm font-semibold tracking-tight whitespace-nowrap">
                {site.name}
              </span>
              <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap sm:block">
                {site.role}
              </span>
            </span>
          </Link>
          {/* Centered Navigation (GymFlow style) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex z-10">
            <div className="relative">
              <ul className="flex items-center gap-1 relative">
                {nav.map((item) => {
                  const isActive = isHome && active === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={(event) => handleAnchor(event, item.href)}
                        aria-current={isActive ? "true" : undefined}
                        className="relative flex items-center gap-2 px-3.5 py-2 text-[13.5px] font-medium transition-all duration-300 z-10 rounded-full text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
                        data-current={isActive}
                        onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                        onMouseLeave={() => resetHighlight()}
                      >
                        <span
                          className={cn(
                            "size-1 rounded-full transition-colors duration-200",
                            isActive ? "bg-foreground" : "bg-transparent",
                          )}
                          aria-hidden="true"
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Right cluster */}
          <div className="flex items-center gap-2 relative z-10">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "hidden items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground",
                !scrolled && "sm:flex",
              )}
              style={{
                opacity: scrolled ? 0 : 1,
                transform: scrolled ? 'scale(0.9)' : 'scale(1)',
              }}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              onMouseLeave={() => resetHighlight()}
            >
              <GithubIcon className="size-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>

            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="group hidden items-center gap-2 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:opacity-90 sm:flex"
              style={{
                fontSize: '13.5px',
                padding: scrolled ? '6px 14px' : '8px 16px',
              }}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              onMouseLeave={() => resetHighlight()}
            >
              <FileText className="size-4" aria-hidden="true" />
              <span 
                className="transition-all duration-300"
                style={{
                  opacity: scrolled ? 0 : 1,
                  width: scrolled ? 0 : 'auto',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                Resume
              </span>
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(!sheetOpen)}
              aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={sheetOpen}
              aria-controls="nav-mobile-sheet"
              className="grid shrink-0 place-items-center rounded-full border border-hairline bg-surface text-foreground transition-all duration-300 hover:border-foreground/40 lg:hidden"
              style={{
                width: scrolled ? 36 : 40,
                height: scrolled ? 36 : 40,
              }}
              onMouseEnter={(e) => moveHighlight(e.currentTarget)}
              onMouseLeave={() => resetHighlight()}
            >
              {sheetOpen ? (
                <X className="size-4" />
              ) : (
                <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true">
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-full bg-current" />
                  <span className="h-px w-2/3 bg-current" />
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile sheet with GymFlow-style positioning */}
      {sheetOpen && (
        <div
          id="nav-mobile-sheet"
          data-lenis-prevent
          className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-hairline bg-background px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:hidden animate-in slide-in-from-bottom duration-300"
          style={{ 
            top: NAV_TOP + (scrolled ? NAV_H_SCROLLED : NAV_H),
          }}
          onClick={(event) => {
            // Any link tap closes the sheet
            if ((event.target as Element).closest('a')) setOpen(false);
          }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(event) => handleAnchor(event, item.href)}
                    className="block border-b border-hairline py-4 text-[17px] font-medium text-foreground transition-all duration-300 hover:translate-x-2"
                    style={{ 
                      animationDelay: `${i * 100}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={site.resume}
                download
                className="flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-base font-medium transition-opacity hover:opacity-90"
              >
                <FileText className="size-4" />
                Download Resume
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2 border border-hairline text-foreground px-6 py-3 rounded-full text-base font-medium transition-colors hover:bg-surface/50"
              >
                <GithubIcon className="size-4" />
                View on GitHub
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}