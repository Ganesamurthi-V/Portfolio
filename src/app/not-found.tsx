import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(200,255,77,0.1),transparent_70%)]" />
        <div className="absolute inset-0 grid-lines radial-fade opacity-45" />
      </div>

      <div className="shell">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-brand">
          404
        </p>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,1.4rem+6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          Page not found
        </h1>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
          That URL does not exist. The work, experience and contact sections are all on the
          home page.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:scale-[1.03]"
          >
            <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2.5 rounded-full border border-hairline px-6 py-3.5 text-sm text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
          >
            Browse work
          </Link>
        </div>
      </div>
    </div>
  );
}
