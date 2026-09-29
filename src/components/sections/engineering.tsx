import { Section } from "@/components/layout/section";
import { stackGroups, techMarquee } from "@/content/engineering";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { CursorGrid } from "@/components/ui/cursor-grid";

/**
 * Plain CSS grid. This replaced MagicBento, which ran a GSAP particle system
 * (ten animated nodes per card), a pointer-tracked spotlight, per-card tilt and
 * magnetism — all of it writing transforms on every mouse move.
 */
export function Engineering() {
  return (
    <Section
      id="engineering"
      index="02"
      eyebrow="Engineering"
      title="What I build"
      lead="Six layers I work across. The list reflects what I have shipped rather than everything I have briefly touched."
    >
      <CursorGrid
        color="#c2c2c8"
        maxOpacity={0.4}
        radius={250}
        fadeDuration={600}
        className="absolute inset-0 z-0 pointer-events-auto"
      />
      <div className="shell mt-8 relative z-10">
        <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden">
          {stackGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 60} className="bg-surface">
              <div className="group h-full p-6 transition-colors duration-300 hover:bg-surface-2 sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="eyebrow">{group.label}</p>
                  <span className="font-mono text-[0.625rem] text-silver-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {group.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {group.description}
                </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[0.6875rem] text-foreground/75"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
      </div>

      <div className="mt-12 border-y border-hairline py-5">
        <Marquee items={[...techMarquee.primary, ...techMarquee.secondary]} />
      </div>
    </Section>
  );
}
