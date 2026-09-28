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
import ShinyText from "@/components/reactbits/ShinyText";

const LightRays = dynamic(() => import("@/components/reactbits/LightRays"), {
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
  const showRays = !isCompact && !reduceMotion;

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 sm:pt-32"
    >
      {/* ---------------------------------------------------------- *
       * Backdrop
       * ---------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {showRays ? (
          <div className="absolute inset-0 opacity-70">
            <LightRays
              raysOrigin="top-center"
              raysColor="#c8ff4d"
              raysSpeed={0.8}
              lightSpread={1.1}
              rayLength={2.4}
              fadeDistance={1.5}
              saturation={0.85}
              followMouse
              mouseInfluence={0.08}
              noiseAmount={0.06}
              distortion={0.035}
            />
          </div>
        ) : (
          <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(200,255,77,0.14),transparent_70%)]" />
        )}

        <div className="absolute inset-0 grid-lines radial-fade opacity-55" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/85 to-transparent" />
      </div>

      {/* ---------------------------------------------------------- *
       * Content
       * ---------------------------------------------------------- */}
      <div className="shell relative flex flex-1 flex-col justify-center py-10">
        {/* Identity row */}
        <FadeContent duration={700} blur className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 py-1.5 pl-2.5 pr-4 backdrop-blur">
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 rounded-full bg-brand/60 animate-pulse-ring" />
              <span className="size-1.5 rounded-full bg-brand" />
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              Open to 2026 roles
            </span>
          </span>

          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground">
            {site.name}
          </span>
        </FadeContent>

        {/* Headline */}
        <h1 className="mt-7 flex flex-col">
          <span className="sr-only">
            {site.name} — {site.role}
          </span>
          <SplitText
            tag="span"
            text="Full-Stack"
            textAlign="left"
            className="font-display block text-[clamp(3rem,1rem+11.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-foreground"
            splitType="chars"
            delay={32}
            duration={1.1}
            ease="power4.out"
            from={{ opacity: 0, yPercent: 110, rotate: 4 }}
            to={{ opacity: 1, yPercent: 0, rotate: 0 }}
            threshold={0.05}
            rootMargin="0px"
          />
          <SplitText
            tag="span"
            text="Developer"
            textAlign="left"
            className="font-display block text-[clamp(3rem,1rem+11.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-brand"
            splitType="chars"
            delay={28}
            duration={1.1}
            ease="power4.out"
            from={{ opacity: 0, yPercent: 110, rotate: -4 }}
            to={{ opacity: 1, yPercent: 0, rotate: 0 }}
            threshold={0.05}
            rootMargin="0px"
          />
        </h1>

        {/* Focus rotator + statement */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:gap-16">
          <AnimatedContent distance={30} duration={0.9} delay={0.35} threshold={0.05}>
            <p className="max-w-xl text-balance-tight text-base leading-relaxed text-muted-foreground sm:text-lg">
              {site.statement}
            </p>
          </AnimatedContent>

          <AnimatedContent
            distance={30}
            duration={0.9}
            delay={0.45}
            threshold={0.05}
            className="lg:justify-self-end"
          >
            <div className="flex flex-col gap-2">
              <span className="eyebrow">Currently focused on</span>
              <div className="flex items-center gap-2 font-display text-lg font-medium sm:text-xl">
                <span className="text-brand">/</span>
                <RotatingText
                  texts={[
                    "Multi-tenant SaaS",
                    "Backend systems",
                    "REST API design",
                    "Postgres schemas",
                    "Production deploys",
                  ]}
                  rotationInterval={2400}
                  staggerDuration={0.015}
                  staggerFrom="first"
                  splitBy="characters"
                  mainClassName="text-foreground"
                  transition={{ type: "spring", damping: 26, stiffness: 320 }}
                />
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* Actions */}
        <AnimatedContent
          distance={30}
          duration={0.9}
          delay={0.55}
          threshold={0.05}
          className="mt-11"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <Magnet padding={90} magnetStrength={7}>
                <button
                  type="button"
                  onClick={() => scrollToId("work")}
                  className="cursor-target group inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.03]"
                >
                  View Projects
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Magnet>

              <Magnet padding={90} magnetStrength={7}>
                <a
                  href={site.resume}
                  download
                  className="cursor-target group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/50 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors duration-300 hover:border-brand/45"
                >
                  <Download className="size-4 text-brand transition-transform duration-300 group-hover:translate-y-0.5" />
                  Download Resume
                </a>
              </Magnet>
            </div>

            <span className="hidden h-8 w-px bg-hairline sm:block" aria-hidden="true" />

            <ul className="flex items-center gap-5">
              {secondaryLinks.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon
                      className="size-4 text-muted-foreground transition-colors group-hover:text-brand"
                      aria-hidden="true"
                    />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContent>
      </div>

      {/* ---------------------------------------------------------- *
       * Baseline strip
       * ---------------------------------------------------------- */}
      {/* threshold 0 so this fires on mount — it sits at the fold, and a
          scroll-gated reveal would leave it invisible until the user moves. */}
      <FadeContent
        duration={900}
        delay={700}
        threshold={0}
        className="relative border-t border-hairline"
      >
        <div className="shell flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => scrollToId("work")}
            className="group flex items-center gap-3 text-left"
            aria-label="Scroll to selected work"
          >
            <span className="grid size-8 place-items-center rounded-full border border-hairline text-brand transition-colors group-hover:border-brand/45">
              <ArrowDown className="size-3.5 animate-bounce [animation-duration:2s]" />
            </span>
            <ShinyText
              text="Scroll to selected work"
              className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]"
              color="#8d93a0"
              shineColor="#c8ff4d"
              speed={3.5}
            />
          </button>

          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
            {site.focus.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span className="text-brand/40" aria-hidden="true">·</span>}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeContent>
    </section>
  );
}
