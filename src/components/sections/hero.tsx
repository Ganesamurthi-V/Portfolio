"use client";

import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/content/site";

/** List of currently open projects, so the status badge reads correctly. */
const focus: string[] = [
  "Multi-tenant SaaS",
  "Backend systems",
  "REST API design",
  "Postgres schemas",
  "Production deploys",
];
import { scrollToId } from "@/lib/scroll";
import { Reveal, RevealText } from "@/components/ui/reveal";

const secondaryLinks = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: site.links.email, Icon: Mail, external: false },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-24 sm:pt-28">
      {/* Blueprint backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-lines opacity-70" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-hairline lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="shell relative flex flex-1 flex-col">
        {/* Meta row */}
        <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2.5 border border-hairline bg-surface/60 py-1.5 pl-2.5 pr-4">
            <span className="size-1.5 rounded-full bg-foreground" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              Open to 2026 roles
            </span>
          </span>
          <span className="register-mark" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground">
            {site.name}
          </span>
        </Reveal>

        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h1 className="flex flex-col">
              <span className="sr-only">
                {site.name} — {site.role}
              </span>
              <RevealText
                text="Full-Stack"
                stagger={26}
                className="font-display text-[clamp(2.75rem,1rem+8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground"
              />
              <RevealText
                text="Developer"
                stagger={26}
                delay={180}
                className="font-display text-[clamp(2.75rem,1rem+8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-muted-foreground/45"
              />
            </h1>

            <Reveal delay={420}>
              <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                {site.statement}
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToId("work")}
                  className="group inline-flex items-center gap-2.5 bg-foreground px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-background transition-opacity duration-200 hover:opacity-90"
                >
                  View Projects
                  <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <a
                  href={site.resume}
                  download
                  className="group inline-flex items-center gap-2.5 border border-hairline px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-foreground transition-colors duration-200 hover:border-foreground/45"
                >
                  <Download className="size-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
                  Resume
                </a>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <ul className="mt-7 flex items-center gap-5">
                {secondaryLinks.map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer noopener" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      <span className="link-underline">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Pixel field — static CSS texture, no canvas */}
          <Reveal delay={300} className="relative hidden h-full min-h-[22rem] lg:block">
            <div className="blueprint absolute inset-0 bg-[#070707]">
              <div className="pixel-field absolute inset-0" aria-hidden="true" />
              <span className="absolute left-3 top-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                FIG. 01
              </span>
              <span className="absolute bottom-3 right-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                1-BIT / DITHER
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Baseline strip */}
      <Reveal delay={700} className="relative border-t border-hairline">
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => scrollToId("work")}
            className="group flex items-center gap-3 text-left"
          >
            <span className="grid size-8 place-items-center border border-hairline text-foreground transition-colors group-hover:border-foreground/45">
              <ArrowDown className="size-3.5" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
              Scroll to selected work
            </span>
          </button>

          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            {focus.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-silver-600" aria-hidden="true">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
