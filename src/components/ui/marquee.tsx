import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
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
          key={`${item}-${i}`}
          className="flex shrink-0 items-center gap-10 px-5 font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-muted-foreground"
        >
          {item}
          <span className="register-mark opacity-60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee relative", className)}>
      {/* The accessible copy; the animated track is decorative. */}
      <span className="sr-only">{items.join(", ")}</span>
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
