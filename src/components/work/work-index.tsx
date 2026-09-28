"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { projects, statusLabel } from "@/content/projects";
import SplitText from "@/components/reactbits/SplitText";
import FadeContent from "@/components/reactbits/FadeContent";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import FlowingMenu from "@/components/reactbits/FlowingMenu";

const menuItems = projects.map((project) => ({
  link: `/work/${project.slug}`,
  text: project.name,
  image: project.image,
}));

export function WorkIndex() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(200,255,77,0.1),transparent_70%)]" />
        <div className="absolute inset-0 grid-lines radial-fade opacity-45" />
      </div>

      <div className="shell">
        <FadeContent duration={600}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Home
          </Link>
        </FadeContent>

        <h1 className="mt-9">
          <span className="sr-only">Selected work</span>
          <SplitText
            tag="span"
            text="Selected Work"
            textAlign="left"
            className="font-display block text-[clamp(2.75rem,1.4rem+7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
            splitType="chars"
            delay={28}
            duration={1}
            ease="power4.out"
            from={{ opacity: 0, yPercent: 105 }}
            to={{ opacity: 1, yPercent: 0 }}
            threshold={0.05}
            rootMargin="0px"
          />
        </h1>

        <AnimatedContent distance={26} duration={0.8} delay={0.2} threshold={0.05}>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-[1.75] text-muted-foreground sm:text-lg">
            Every project here has a case study covering the problem, the architecture, the
            decisions that mattered and the things that broke on the way.
          </p>
        </AnimatedContent>
      </div>

      {/* Flowing list */}
      <AnimatedContent distance={30} duration={0.9} threshold={0.1} className="mt-16">
        <div className="h-[26rem] sm:h-[30rem]">
          <FlowingMenu
            items={menuItems}
            speed={28}
            textColor="#eef0f2"
            bgColor="#07080a"
            marqueeBgColor="#c8ff4d"
            marqueeTextColor="#0a0d04"
            borderColor="rgba(255,255,255,0.08)"
          />
        </div>
      </AnimatedContent>

      {/* Detail list */}
      <div className="shell mt-24">
        <div className="rule mb-10" aria-hidden="true" />

        <ul className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedContent
              key={project.slug}
              distance={30}
              duration={0.85}
              delay={index * 0.06}
              threshold={0.12}
            >
              <li className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  className="cursor-target group flex h-full flex-col rounded-3xl border border-hairline bg-surface/70 p-6 backdrop-blur transition-colors duration-300 hover:border-brand/35 sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-xs tracking-[0.2em] text-brand">
                      {project.index}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-brand">
                    {project.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{project.tagline}</p>

                  <p className="mt-5 flex-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 border-t border-hairline pt-5 text-xs font-medium text-foreground">
                    Read case study
                    <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </li>
            </AnimatedContent>
          ))}
        </ul>
      </div>
    </div>
  );
}
