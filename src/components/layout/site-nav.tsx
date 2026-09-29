"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, FileText, X } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/site";
import { idFromHref, scrollToId } from "@/lib/scroll";

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);

  /* Condense the bar once the hero is out of the way. */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
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
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
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
            "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300",
            scrolled
              ? "border-b border-hairline bg-background/90 py-3 backdrop-blur-sm"
              : "border-b border-transparent py-5",
          )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Link
            href="/"
            onClick={(event) => handleAnchor(event, "/#top")}
            className="flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="grid size-9 place-items-center border border-hairline bg-surface font-mono text-xs font-semibold text-silver-200">
              {site.initials}
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
                        "flex items-center gap-2 px-4 py-2 text-sm transition-colors duration-200",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
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
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden items-center gap-2 border border-hairline px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:border-foreground/40 hover:text-foreground sm:flex"
            >
              <GithubIcon className="size-4" />
              <span className="hidden md:inline">GitHub</span>
            </a>

            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              <FileText className="size-4" aria-hidden="true" />
              Resume
              <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-label="Open menu"
              className="ml-1 grid size-10 place-items-center border border-hairline text-foreground transition-colors hover:border-foreground/40 lg:hidden"
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

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden"
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
              className="grid size-10 place-items-center border border-hairline text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell relative flex flex-1 flex-col justify-center">
            <ul className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(event) => handleAnchor(event, item.href)}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-xs text-silver-400">
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

          <div className="shell relative space-y-4 pb-10">
            <div className="rule" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <a className="link-underline" href={site.links.github} target="_blank" rel="noreferrer noopener">
                GitHub
              </a>
              <a className="link-underline" href={site.links.linkedin} target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
              <a className="link-underline" href={site.links.email}>
                Email
              </a>
              <a className="link-underline" href={site.resume} target="_blank" rel="noreferrer noopener">
                Resume
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
