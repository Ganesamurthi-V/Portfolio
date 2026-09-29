import { cn } from "@/lib/utils";
import type { MarqueeItem } from "@/content/engineering";

interface MarqueeProps {
  items: MarqueeItem[];
  reverse?: boolean;
  className?: string;
}

/**
 * CSS-only marquee. The track renders the list twice and a linear keyframe
 * translates it -50%, so the loop is seamless and runs entirely on the
 * compositor — no requestAnimationFrame, no layout reads.
 */
export function Marquee({ items, reverse = false, className }: MarqueeProps) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item, i) => (
        <li
          key={`${item.name}-${i}`}
          className="flex shrink-0 items-center gap-2.5 px-5"
        >
          {/* Brand SVG icon */}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 shrink-0 opacity-80"
            style={{ fill: item.color ?? "currentColor" }}
          >
            <path d={item.icon} />
          </svg>
          <span className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-muted-foreground">
            {item.name}
          </span>
          <span className="register-mark opacity-60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee relative", className)}>
      {/* The accessible copy; the animated track is decorative. */}
      <span className="sr-only">{items.map((i) => i.name).join(", ")}</span>
      <div
        className={cn(
          "marquee__track",
          reverse ? "animate-marquee-x-rev" : "animate-marquee-x",
        )}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
