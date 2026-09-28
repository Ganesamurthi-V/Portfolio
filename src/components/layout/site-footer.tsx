"use client";

import { ArrowUp, Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";

import { nav, site } from "@/content/site";
import { idFromHref, scrollToId } from "@/lib/lenis-store";
import ShinyText from "@/components/reactbits/ShinyText";
import AnimatedContent from "@/components/reactbits/AnimatedContent";

const socials = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: site.links.email, Icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline">
      <div
        className="pointer-events-none absolute inset-0 grid-lines opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[min(90rem,140%)] -translate-x-1/2 rounded-[50%] bg-brand/6 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative pt-20 pb-10">
        {/* Oversized wordmark */}
        <AnimatedContent distance={40} duration={1} threshold={0.15}>
          <div className="select-none">
            <ShinyText
              text={site.name}
              className="font-display text-[clamp(2.75rem,11vw,9rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
              color="#2e2e33"
              shineColor="#ffffff"
              speed={4}
              spread={110}
            />
          </div>
        </AnimatedContent>

        <div className="mt-10 grid gap-10 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="eyebrow">Role</p>
            <p className="mt-3 text-sm text-foreground">{site.role}</p>
            <p className="mt-1 text-sm text-muted-foreground">{site.location}</p>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-3 space-y-2">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      const id = idFromHref(item.href);
                      if (!id) return;
                      event.preventDefault();
                      scrollToId(id);
                    }}
                    className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Elsewhere</p>
            <ul className="mt-3 space-y-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="size-3.5 text-brand/70" aria-hidden="true" />
                    <span className="link-underline">{label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resume}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow">Direct</p>
            <a
              href={site.links.email}
              className="link-underline mt-3 block text-sm text-foreground"
            >
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="link-underline mt-1 block text-sm text-muted-foreground"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} {site.name}
          </p>

          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Built with Next.js · Tailwind · GSAP
            </p>
            <button
              type="button"
              onClick={() => scrollToId("top")}
              className="group flex items-center gap-2 rounded-full border border-hairline px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
            >
              Back to top
              <ArrowUp className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
