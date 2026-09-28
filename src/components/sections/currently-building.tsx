"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Hammer, Rocket, TestTube2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { currentlyBuilding } from "@/content/site";
import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import ElectricBorder from "@/components/reactbits/ElectricBorder";
import Carousel from "@/components/reactbits/Carousel";

const Threads = dynamic(() => import("@/components/reactbits/Threads"), { ssr: false });

const stageIcons = [Hammer, TestTube2, Rocket];

const carouselItems = currentlyBuilding.notes.map((note, index) => ({
  id: index + 1,
  title: ["Reports module", "WhatsApp sweeps", "Member rewards"][index] ?? "In progress",
  description: note,
  icon: (
    <span className="grid size-5 place-items-center font-mono text-[0.625rem] text-brand">
      {String(index + 1).padStart(2, "0")}
    </span>
  ),
}));

export function CurrentlyBuilding() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {!isCompact && !reduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40"
          aria-hidden="true"
        >
          <Threads color={[0.78, 1, 0.3]} amplitude={1.1} distance={0.32} enableMouseInteraction />
        </div>
      )}

      <Section
        id="building"
        index="08"
        eyebrow="Currently Building"
        title="Live work in progress"
        lead="What is actually on the bench right now, and which stage it is at."
      >
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-center lg:gap-16">
          {/* Status card */}
          <AnimatedContent distance={36} duration={0.9} threshold={0.15}>
            <ElectricBorder
              color="#c8ff4d"
              speed={0.7}
              chaos={0.06}
              borderRadius={26}
              className="w-full"
            >
              <div className="rounded-[26px] bg-surface/92 p-6 backdrop-blur-xl sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="relative grid size-2.5 place-items-center">
                    <span className="absolute size-2.5 rounded-full bg-brand/50 animate-pulse-ring" />
                    <span className="size-1.5 rounded-full bg-brand" />
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-brand">
                    In active development
                  </span>
                </div>

                <h3 className="mt-5 font-display text-[clamp(1.85rem,1.3rem+2vw,3rem)] font-semibold leading-none tracking-[-0.035em]">
                  {currentlyBuilding.project}
                </h3>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {currentlyBuilding.summary}
                </p>

                {/* Stage rail */}
                <div className="mt-9">
                  <p className="eyebrow">Stage</p>
                  <ol className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    {currentlyBuilding.stages.map((stage, index) => {
                      const Icon = stageIcons[index] ?? Hammer;
                      const done = index < currentlyBuilding.activeStage;
                      const active = index === currentlyBuilding.activeStage;

                      return (
                        <li
                          key={stage}
                          className="flex flex-1 items-center gap-3"
                          aria-current={active ? "step" : undefined}
                        >
                          <span
                            className={cn(
                              "grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-500",
                              active && "border-brand/60 bg-brand/12 text-brand",
                              done && "border-brand/30 bg-brand/5 text-brand/70",
                              !active && !done && "border-hairline text-muted-foreground",
                            )}
                          >
                            <Icon className="size-4" aria-hidden="true" />
                          </span>

                          <span className="flex flex-1 items-center gap-3">
                            <span
                              className={cn(
                                "text-sm transition-colors duration-500",
                                active ? "text-foreground" : "text-muted-foreground",
                              )}
                            >
                              {stage}
                            </span>

                            {index < currentlyBuilding.stages.length - 1 && (
                              <span
                                className="relative hidden h-px flex-1 overflow-hidden bg-hairline sm:block"
                                aria-hidden="true"
                              >
                                <span
                                  className={cn(
                                    "absolute inset-y-0 left-0 bg-brand/70 transition-[width] duration-700",
                                    done ? "w-full" : active ? "w-1/3" : "w-0",
                                  )}
                                />
                              </span>
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <Link
                  href="/work/gymflow"
                  className="cursor-target group mt-9 inline-flex items-center gap-2.5 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
                >
                  See the architecture behind it
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </ElectricBorder>
          </AnimatedContent>

          {/* Work items */}
          <AnimatedContent
            distance={36}
            duration={0.9}
            delay={0.1}
            threshold={0.15}
            className="flex justify-center lg:justify-end"
          >
            <div>
              <p className="eyebrow mb-4">This week</p>
              <Carousel
                items={carouselItems}
                baseWidth={320}
                autoplay={!reduceMotion}
                autoplayDelay={3800}
                pauseOnHover
                loop
              />
            </div>
          </AnimatedContent>
        </div>
      </Section>
    </div>
  );
}
