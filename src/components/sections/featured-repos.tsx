"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { GithubIcon } from "@/components/icons";

import { Section } from "@/components/layout/section";
import { featuredRepos } from "@/content/engineering";
import { site } from "@/content/site";
import AnimatedContent from "@/components/reactbits/AnimatedContent";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export function FeaturedRepos() {
  return (
    <Section
      id="github"
      index="09"
      eyebrow="GitHub"
      title="Selected repositories"
      lead="Four repositories rather than a full listing — these are the ones worth reading."
      action={
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className="cursor-target group inline-flex items-center gap-2.5 rounded-full border border-hairline px-5 py-3 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
        >
          <GithubIcon className="size-4" />
          All repositories
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      }
    >
      <div className="shell grid gap-5 sm:grid-cols-2">
        {featuredRepos.map((repo, index) => (
          <AnimatedContent
            key={repo.name}
            distance={32}
            duration={0.8}
            delay={index * 0.06}
            threshold={0.15}
          >
            <SpotlightCard
              className="group/repo h-full !rounded-3xl !border-hairline !bg-surface/80 !p-6 backdrop-blur sm:!p-7"
              spotlightColor="rgba(200, 255, 77, 0.09)"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <p className="flex items-center gap-2 font-mono text-sm text-foreground">
                    <GithubIcon className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Ganesamurthi-V/</span>
                    <span className="text-brand">{repo.name}</span>
                  </p>
                  <Star className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                </div>

                <p className="mt-4 flex-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {repo.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-hairline bg-surface-2/60 px-2.5 py-1 font-mono text-[0.625rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center gap-4 border-t border-hairline pt-5">
                  <a
                    href={repo.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-xs font-medium text-foreground"
                  >
                    Repository
                  </a>
                  {repo.slug && (
                    <Link
                      href={`/work/${repo.slug}`}
                      className="link-underline text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Case study
                    </Link>
                  )}
                  {repo.demo && (
                    <a
                      href={repo.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Live demo
                    </a>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </Section>
  );
}
