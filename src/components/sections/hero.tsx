"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Download, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { AsciiSymbol } from "@/components/ui/ascii-symbol";

const DotField = dynamic(() => import("@/components/ui/dot-field").then(mod => mod.DotField), { ssr: false });

const secondaryLinks = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon, external: true },
  { label: "Email", href: site.links.email, Icon: Mail, external: false },
];

const focus = [
  "Multi-tenant SaaS",
  "Backend systems",
  "REST API design",
  "Postgres schemas",
  "Production deploys",
];

export function Hero() {
  // This ref is passed to Dither so mouse events on the full section
  // (including the content overlay) are tracked — the canvas itself
  // lives at z-index -10 and would otherwise never receive pointer events.
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-svh overflow-hidden flex items-center justify-center"
    >
      {/* DotField background */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly={true}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 255, 255, 0.15)"
          gradientTo="rgba(255, 255, 255, 0.05)"
          glowColor="rgba(255, 255, 255, 0.05)"
        />
      </div>

      {/* Content overlay - Centered */}
      <div className="shell relative z-10 flex flex-col items-center justify-center text-center py-24 sm:py-28">
        {/* Badge */}
        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/80 px-4 py-2 backdrop-blur-sm mb-8">
            <span className="rounded-full bg-foreground px-2.5 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-background">
              Open to Work
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground">
              Full-Stack Developer
            </span>
          </div>
        </Reveal>

        {/* Main Heading */}
        <h1 className="max-w-5xl">
          <span className="sr-only">
            {site.name} — {site.role}
          </span>
          <RevealText
            text={site.name}
            stagger={26}
            delay={200}
            className="font-display block text-[clamp(1.5rem,4vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-muted-foreground mb-4"
          />
          <RevealText
            text={site.role}
            stagger={26}
            delay={400}
            className="font-display block text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-foreground"
          />
        </h1>

        {/* Subtitle */}
        <Reveal delay={600}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {site.statement}
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={700}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <button
              type="button"
              onClick={() => scrollToId("work")}
              className="group flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-base font-semibold text-background transition-all duration-200 hover:opacity-90 rounded-full"
            >
              View Projects
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href={site.resume}
              download
              className="group flex items-center justify-center gap-3 border border-hairline bg-surface/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-all duration-200 hover:bg-surface/80 rounded-full"
            >
              <Download className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>
        </Reveal>

        {/* Social Links */}
        <Reveal delay={800}>
          <div className="mt-12 flex items-center gap-6">
            {secondaryLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
                <span className="link-underline">{label}</span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Scroll Indicator */}
        <Reveal delay={900}>
          <button
            type="button"
            onClick={() => scrollToId("work")}
            className="group mt-16 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em]">
              Scroll to explore
            </span>
            <svg
              className="size-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}