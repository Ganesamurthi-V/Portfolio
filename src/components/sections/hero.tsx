"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/content/site";
import { scrollToId } from "@/lib/lenis-store";
import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";
import SplitText from "@/components/reactbits/SplitText";
import RotatingText from "@/components/reactbits/RotatingText";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import FadeContent from "@/components/reactbits/FadeContent";
import Magnet from "@/components/reactbits/Magnet";

const PixelDither = dynamic(() => import("@/components/visuals/pixel-dither"), {
  ssr: false,
});

const secondaryLinks = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: site.links.email, Icon: Mail, external: false },
];

export function Hero() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();
  const showPixels = !isCompact && !reduceMotion;

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-24 sm:pt-28">
      {/* ---------------------------------------------------------- *
       * Blueprint backdrop
       * ---------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 grid-lines opacity-70" />
        {/* structural vertical rule, as on a drawing sheet */}
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-hairline lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="shell relative flex flex-1 flex-col">
        {/* Top meta row */}
        <FadeContent duration={600} threshold={0} className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2.5 border border-hairline bg-surface/60 py-1.5 pl-2.5 pr-4 backdrop-blur">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-white/40 animate-pulse-ring" />
              <span className="size-1.5 rounded-full bg-white" />
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              Open to 2026 roles
            </span>
          </span>

          <span className="register-mark" />

          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground">
            {site.name}
          </span>
        </FadeContent>

        {/* ---------------------------------------------------------- *
         * Headline + pixel field
         * ---------------------------------------------------------- */}
        <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <h1 className="flex flex-col">
              <span className="sr-only">
                {site.name} — {site.role}
              </span>
              <SplitText
                tag="span"
                text="Full-Stack"
                textAlign="left"
                className="font-display block text-[clamp(2.75rem,1rem+8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-foreground"
                splitType="chars"
                delay={30}
                duration={1.05}
                ease="power4.out"
                from={{ opacity: 0, yPercent: 110 }}
                to={{ opacity: 1, yPercent: 0 }}
                threshold={0.05}
                rootMargin="0px"
              />
              <SplitText
                tag="span"
                text="Developer"
                textAlign="left"
                className="font-display block text-[clamp(2.75rem,1rem+8vw,7rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-muted-foreground/45"
                splitType="chars"
                delay={26}
                duration={1.05}
                ease="power4.out"
                from={{ opacity: 0, yPercent: 110 }}
                to={{ opacity: 1, yPercent: 0 }}
                threshold={0.05}
                rootMargin="0px"
              />
            </h1>

            <AnimatedContent distance={28} duration={0.85} delay={0.3} threshold={0.05}>
              <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
                {site.statement}
              </p>
            </AnimatedContent>

            {/* Actions */}
            <AnimatedContent distance={28} duration={0.85} delay={0.45} threshold={0.05}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnet padding={80} magnetStrength={8}>
                  <button
                    type="button"
                    onClick={() => scrollToId("work")}
                    className="group inline-flex items-center gap-2.5 bg-foreground px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-background transition-transform duration-300 hover:scale-[1.02]"
                  >
                    View Projects
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </Magnet>

                <Magnet padding={80} magnetStrength={8}>
                  <a
                    href={site.resume}
                    download
                    className="group inline-flex items-center gap-2.5 border border-hairline px-6 py-3.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-foreground/45"
                  >
                    <Download className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    Resume
                  </a>
                </Magnet>
              </div>
            </AnimatedContent>

            {/* Secondary links */}
            <AnimatedContent distance={24} duration={0.8} delay={0.55} threshold={0.05}>
              <ul className="mt-7 flex items-center gap-5">
                {secondaryLinks.map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer noopener" : undefined}
                      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                      <span className="link-underline">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedContent>
          </div>

          {/* Pixel field panel */}
          <FadeContent
            duration={1200}
            delay={200}
            threshold={0}
            className="relative hidden h-full min-h-[22rem] lg:block"
          >
            {/* `blueprint` draws corner ticks outside the box, so the clipping
                happens on an inner layer rather than on the framed element. */}
            <div className="blueprint absolute inset-0 bg-[#070707]">
              <div className="absolute inset-0 overflow-hidden">
                {showPixels ? (
                  <PixelDither cell={5} intensity={1.3} speed={1} followMouse />
                ) : (
                  <div className="pixel-grid absolute inset-0 opacity-50" />
                )}
              </div>

              {/* corner registration labels */}
              <span className="absolute left-3 top-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                FIG. 01
              </span>
              <span className="absolute bottom-3 right-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                1-BIT / DITHER
              </span>
            </div>
          </FadeContent>
        </div>
      </div>

      {/* ---------------------------------------------------------- *
       * Baseline strip
       * ---------------------------------------------------------- */}
      <FadeContent duration={900} delay={650} threshold={0} className="relative border-t border-hairline">
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => scrollToId("work")}
            className="group flex items-center gap-3 text-left"
            aria-label="Scroll to selected work"
          >
            <span className="grid size-8 place-items-center border border-hairline text-foreground transition-colors group-hover:border-foreground/45">
              <ArrowDown className="size-3.5 animate-bounce [animation-duration:2s]" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
              Scroll to selected work
            </span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              Currently
            </span>
            <span className="register-mark hidden sm:block" />
            <div className="flex items-center font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-foreground">
              <RotatingText
                texts={[
                  "Multi-tenant SaaS",
                  "Backend systems",
                  "REST API design",
                  "Postgres schemas",
                  "Production deploys",
                ]}
                rotationInterval={2400}
                staggerDuration={0.012}
                staggerFrom="first"
                splitBy="characters"
                mainClassName="text-foreground"
                transition={{ type: "spring", damping: 26, stiffness: 320 }}
              />
            </div>
          </div>
        </div>
      </FadeContent>
    </section>
  );
}
