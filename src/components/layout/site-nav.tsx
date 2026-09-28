"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { idFromHref, scrollToId } from "@/lib/lenis-store";
import Magnet from "@/components/reactbits/Magnet";

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  /* --------------------------------------------------------------- *
   * Condense the bar once the hero is out of the way
   * --------------------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* --------------------------------------------------------------- *
   * Track which section owns the viewport
   * --------------------------------------------------------------- */
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
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isHome]);

  /* --------------------------------------------------------------- *
   * Mobile sheet: staggered reveal + scroll lock
   * --------------------------------------------------------------- */
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    document.body.style.overflow = "hidden";

    let ctx: gsap.Context | undefined;
    if (panel) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          panel,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" },
        );
        gsap.fromTo(
          "[data-nav-item]",
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            delay: 0.15,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          "[data-nav-meta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: "power2.out" },
        );
      }, panel);
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      ctx?.revert();
    };
  }, [open]);

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
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500",
          scrolled
            ? "border-b border-hairline bg-background/72 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5",
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={(event) => handleAnchor(event, "/#top")}
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-lg border border-hairline bg-surface font-mono text-xs font-semibold tracking-tight text-brand">
              {site.initials}
              <span className="absolute inset-0 -translate-x-full bg-brand/12 transition-transform duration-500 group-hover:translate-x-0" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-sm font-semibold tracking-tight">
                {site.name}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                {site.role}
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = isHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={(event) => handleAnchor(event, item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "cursor-target group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "size-1 rounded-full transition-all duration-500",
                          isActive ? "bg-brand" : "bg-transparent",
                        )}
                        aria-hidden="true"
                      />
                      <span className="nav-swap">
                        <span>{item.label}</span>
                        <span aria-hidden="true">{item.label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Magnet padding={70} magnetStrength={6} wrapperClassName="hidden sm:block">
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-target flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
              >
                <GithubIcon className="size-4" />
                <span className="hidden md:inline">GitHub</span>
              </a>
            </Magnet>

            <Magnet padding={70} magnetStrength={6}>
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-target group flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.03]"
              >
                <FileText className="size-4" aria-hidden="true" />
                Resume
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnet>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="ml-1 grid size-10 place-items-center rounded-full border border-hairline text-foreground transition-colors hover:border-brand/40 lg:hidden"
            >
              <span className="flex w-4 flex-col gap-[5px]" aria-hidden="true">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden"
          style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        >
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden="true" />

          <div className="shell relative flex items-center justify-between py-5">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border border-hairline text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell relative flex flex-1 flex-col justify-center">
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden">
                  <Link
                    data-nav-item
                    href={item.href}
                    onClick={(event) => handleAnchor(event, item.href)}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(2.25rem,12vw,3.5rem)] font-semibold leading-[1.04] tracking-tight">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-nav-meta className="shell relative space-y-4 pb-10">
            <div className="rule" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <a
                className="link-underline"
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
              </a>
              <a
                className="link-underline"
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn
              </a>
              <a className="link-underline" href={site.links.email}>
                Email
              </a>
              <a
                className="link-underline"
                href={site.resume}
                target="_blank"
                rel="noreferrer noopener"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
