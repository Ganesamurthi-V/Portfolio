import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { Section } from "@/components/layout/section";
import { about, currentlyBuilding, education, site } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";

const profile = [
  { term: "Role", detail: site.role },
  { term: "Based in", detail: site.location },
  { term: "Focus", detail: "SaaS products and business applications" },
  { term: "Availability", detail: "Open to 2026 roles and internships" },
];

export function About() {
  return (
    <Section id="about" index="05" eyebrow="About" title={about.heading} lead={about.body}>
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[clamp(1.05rem,0.95rem+0.7vw,1.45rem)] leading-[1.55] text-foreground/90">
              {about.detail}
            </p>
          </Reveal>

          {/* Currently building — folded in rather than given its own section */}
          <Reveal delay={80}>
            <div className="mt-10 border border-hairline bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="size-1.5 rounded-full bg-foreground" aria-hidden="true" />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-silver-300">
                  Currently building
                </span>
                <span className="font-display text-base font-semibold text-foreground">
                  {currentlyBuilding.project}
                </span>
                <Link
                  href="/work/gymflow"
                  className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="link-underline">Case study</span>
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {currentlyBuilding.summary}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {["Reports module", "WhatsApp sweeps", "Member rewards"].map((item) => (
                  <li
                    key={item}
                    className="border border-hairline bg-surface-2 px-2.5 py-1 font-mono text-[0.625rem] text-foreground/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="border border-hairline bg-surface p-6 sm:p-7">
            <p className="eyebrow">Profile</p>

            <dl className="mt-5 space-y-4">
              {profile.map((row) => (
                <div key={row.term} className="border-b border-hairline pb-4 last:border-0 last:pb-0">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {row.term}
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{row.detail}</dd>
                </div>
              ))}
            </dl>

            {/* Education — a supporting detail, not its own section */}
            <div className="mt-7 border-t border-hairline pt-6">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center border border-hairline bg-surface-2 text-silver-300">
                  <GraduationCap className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium leading-snug text-foreground">
                    {education.degree}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-muted-foreground">
                    {education.institution}
                  </p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-silver-300">
                    {education.expected}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
