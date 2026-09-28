"use client";

import { Section } from "@/components/layout/section";
import { stackGroups, techMarquee } from "@/content/engineering";
import { useIsCompact, usePrefersReducedMotion } from "@/hooks/use-media-query";
import MagicBento from "@/components/reactbits/MagicBento";
import LogoLoop from "@/components/reactbits/LogoLoop";

const bentoCards = stackGroups.map((group) => ({
  color: "#0d0f13",
  label: group.label,
  title: group.title,
  description: group.blurb,
}));

const logos = [...techMarquee.primary, ...techMarquee.secondary].map((label) => ({
  node: (
    <span className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 hover:text-brand">
      {label}
    </span>
  ),
  title: label,
  ariaLabel: label,
}));

export function Engineering() {
  const isCompact = useIsCompact();
  const reduceMotion = usePrefersReducedMotion();
  const rich = !isCompact && !reduceMotion;

  return (
    <Section
      id="engineering"
      index="02"
      eyebrow="Engineering"
      title="What I build"
      lead="Six layers I work across. The list reflects what I have shipped rather than everything I have briefly touched."
    >
      {/* MagicBento caps its grid at 54rem and forces a 4:3 card ratio — widen
          the grid and let the cards size to their content so the section does
          not eat a full extra viewport. */}
      <div className="shell flex justify-center [&_.bento-section]:w-full [&_.bento-section]:max-w-none [&_.card]:!aspect-auto [&_.card]:!min-h-[9.5rem] [&_.card]:!gap-4 [&_.card]:!rounded-none">
        <MagicBento
          cards={bentoCards}
          textAutoHide={false}
          enableStars={rich}
          enableSpotlight={rich}
          enableBorderGlow
          enableTilt={rich}
          enableMagnetism={rich}
          clickEffect={!reduceMotion}
          disableAnimations={reduceMotion}
          spotlightRadius={320}
          particleCount={10}
          glowColor="255, 255, 255"
        />
      </div>

      {/* Technology marquee */}
      <div className="relative mt-12 h-14 border-y border-hairline">
        <LogoLoop
          logos={logos}
          speed={40}
          direction="left"
          gap={56}
          logoHeight={20}
          fadeOut
          fadeOutColor="#07080a"
          pauseOnHover
          scaleOnHover
          ariaLabel="Technologies"
        />
      </div>
    </Section>
  );
}
