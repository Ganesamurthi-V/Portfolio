"use client";

import { Section } from "@/components/layout/section";
import { stackGroups } from "@/content/engineering";
import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";
import MagicBento from "@/components/reactbits/MagicBento";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

const bentoCards = stackGroups.map((group) => ({
  color: "#0d0f13",
  label: group.label,
  title: group.title,
  description: group.blurb,
}));

export function Engineering() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section
      id="engineering"
      index="02"
      eyebrow="Engineering"
      title="What I build"
      lead="Six layers I work across. The list reflects what I have actually shipped rather than everything I have briefly touched."
    >
      <div className="shell">
        {/* MagicBento caps its grid at 54rem; let it use the full shell width. */}
        <div className="flex justify-center [&_.bento-section]:max-w-none [&_.bento-section]:w-full">
          <MagicBento
            cards={bentoCards}
            textAutoHide={false}
            enableStars={!isCompact && !reduceMotion}
            enableSpotlight={!isCompact && !reduceMotion}
            enableBorderGlow
            enableTilt={!isCompact && !reduceMotion}
            enableMagnetism={!isCompact && !reduceMotion}
            clickEffect={!reduceMotion}
            disableAnimations={reduceMotion}
            spotlightRadius={320}
            particleCount={10}
            glowColor="200, 255, 77"
          />
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            containerClassName="!my-0"
            textClassName="font-display text-[clamp(1.35rem,1rem+1.8vw,2.25rem)] font-medium leading-[1.45] text-foreground"
          >
            The interesting problems are rarely in the framework. They are in the schema
            you have to live with, the authorisation rule that has to hold in four places
            at once, and the query that was fine until the table had real data in it.
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
