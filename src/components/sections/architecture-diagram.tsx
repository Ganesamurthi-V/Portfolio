"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Boxes,
  Cloud,
  Database,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { ArchitectureEdge, ArchitectureNode } from "@/content/projects";

type Kind = ArchitectureNode["kind"];

const TIERS: { label: string; kinds: Kind[] }[] = [
  { label: "Client", kinds: ["client"] },
  { label: "Edge", kinds: ["edge"] },
  { label: "Services", kinds: ["service"] },
  { label: "Data & external", kinds: ["data", "external"] },
];

/** Tiers are distinguished by lightness, not hue — the palette is monochrome. */
const KIND_META: Record<Kind, { Icon: typeof Boxes; tone: string }> = {
  client: { Icon: MonitorSmartphone, tone: "text-silver-100" },
  edge: { Icon: ShieldCheck, tone: "text-silver-200" },
  service: { Icon: Boxes, tone: "text-silver-300" },
  data: { Icon: Database, tone: "text-silver-400" },
  external: { Icon: Cloud, tone: "text-silver-500" },
};

interface Geometry {
  width: number;
  height: number;
  paths: { id: string; d: string; label?: string; mid: { x: number; y: number } }[];
}

interface Props {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  className?: string;
}

/**
 * Layered architecture diagram. Nodes are laid out by tier, then connectors are
 * measured from the rendered DOM so the SVG always matches the real layout —
 * including after a resize or font swap.
 */
export function ArchitectureDiagram({ nodes, edges, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const tiers = TIERS.map((tier) => ({
    ...tier,
    nodes: nodes.filter((node) => tier.kinds.includes(node.kind)),
  })).filter((tier) => tier.nodes.length > 0);

  const tierIndexOf = useCallback(
    (id: string) => {
      const node = nodes.find((candidate) => candidate.id === id);
      if (!node) return -1;
      return tiers.findIndex((tier) => tier.kinds.includes(node.kind));
    },
    // `tiers` is derived from `nodes`, so nodes is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes],
  );

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const base = container.getBoundingClientRect();
    if (base.width === 0) return;

    const box = (id: string) => {
      const el = nodeRefs.current.get(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left - base.left,
        top: rect.top - base.top,
        width: rect.width,
        height: rect.height,
      };
    };

    const paths: Geometry["paths"] = [];

    edges.forEach((edge, index) => {
      const from = box(edge.from);
      const to = box(edge.to);
      if (!from || !to) return;

      const sameTier = tierIndexOf(edge.from) === tierIndexOf(edge.to);

      let x1: number;
      let y1: number;
      let x2: number;
      let y2: number;
      let c1x: number;
      let c1y: number;
      let c2x: number;
      let c2y: number;

      if (sameTier) {
        // Horizontal hop between siblings.
        const fromIsLeft = from.left <= to.left;
        x1 = fromIsLeft ? from.left + from.width : from.left;
        x2 = fromIsLeft ? to.left : to.left + to.width;
        y1 = from.top + from.height / 2;
        y2 = to.top + to.height / 2;
        const bend = Math.max(28, Math.abs(x2 - x1) / 2);
        c1x = x1 + (fromIsLeft ? bend : -bend);
        c1y = y1;
        c2x = x2 + (fromIsLeft ? -bend : bend);
        c2y = y2;
      } else {
        const downward = from.top < to.top;
        x1 = from.left + from.width / 2;
        x2 = to.left + to.width / 2;
        y1 = downward ? from.top + from.height : from.top;
        y2 = downward ? to.top : to.top + to.height;
        const bend = Math.max(32, Math.abs(y2 - y1) * 0.55);
        c1x = x1;
        c1y = y1 + (downward ? bend : -bend);
        c2x = x2;
        c2y = y2 + (downward ? -bend : bend);
      }

      const t = 0.5;
      const mid = {
        x:
          (1 - t) ** 3 * x1 +
          3 * (1 - t) ** 2 * t * c1x +
          3 * (1 - t) * t ** 2 * c2x +
          t ** 3 * x2,
        y:
          (1 - t) ** 3 * y1 +
          3 * (1 - t) ** 2 * t * c1y +
          3 * (1 - t) * t ** 2 * c2y +
          t ** 3 * y2,
      };

      paths.push({
        id: `${edge.from}->${edge.to}-${index}`,
        d: `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`,
        label: edge.label,
        mid,
      });
    });

    setGeometry({ width: base.width, height: base.height, paths });
  }, [edges, tierIndexOf]);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    nodeRefs.current.forEach((el) => observer.observe(el));

    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, [measure]);

  const isEdgeActive = (edgeId: string) =>
    Boolean(activeNode) && edgeId.startsWith(`${activeNode}->`);

  const isNodeDimmed = (id: string) => {
    if (!activeNode) return false;
    if (activeNode === id) return false;
    return !edges.some(
      (edge) =>
        (edge.from === activeNode && edge.to === id) ||
        (edge.to === activeNode && edge.from === id),
    );
  };

  return (
    <div
      className={cn(
        "overflow-x-auto overflow-y-hidden border border-hairline bg-surface/60 p-5 sm:p-8",
        className,
      )}
    >
      <div ref={containerRef} className="relative min-w-[40rem]">
        {/* Connectors */}
        {geometry && (
          <svg
            className="pointer-events-none absolute inset-0 z-0"
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arch-arrow"
                viewBox="0 0 8 8"
                refX="6"
                refY="4"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 6 4 L 0 7 z" fill="currentColor" />
              </marker>
            </defs>

            {geometry.paths.map((path) => {
              const active = isEdgeActive(path.id);
              return (
                <g
                  key={path.id}
                  className={cn(
                    "transition-[color,opacity] duration-300",
                    active ? "text-brand opacity-100" : "text-white/22 opacity-90",
                  )}
                >
                  <path
                    d={path.d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={active ? 1.6 : 1}
                    markerEnd="url(#arch-arrow)"
                  />
                  {/* Static dash overlay. This used to run a continuous
                      stroke-dashoffset animation on every path, repainting the
                      whole SVG each frame for a decorative effect. */}
                  <path
                    d={path.d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={active ? 2.4 : 1.6}
                    strokeDasharray="4 24"
                    className={active ? "opacity-100" : "opacity-40"}
                  />
                  {path.label && (
                    <text
                      x={path.mid.x}
                      y={path.mid.y - 6}
                      textAnchor="middle"
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-[0.12em] transition-colors duration-300",
                        active ? "fill-brand" : "fill-muted-foreground",
                      )}
                    >
                      {path.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Tiers */}
        <div className="relative z-10 flex flex-col gap-11">
          {tiers.map((tier) => (
            <div key={tier.label} className="flex items-start gap-5">
              <span className="w-24 shrink-0 pt-4 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                {tier.label}
              </span>

              <div className="flex flex-1 flex-wrap items-stretch justify-center gap-4">
                {tier.nodes.map((node) => {
                  const { Icon, tone } = KIND_META[node.kind];
                  const dimmed = isNodeDimmed(node.id);
                  const isActive = activeNode === node.id;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      ref={(el) => {
                        if (el) nodeRefs.current.set(node.id, el);
                        else nodeRefs.current.delete(node.id);
                      }}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                      onFocus={() => setActiveNode(node.id)}
                      onBlur={() => setActiveNode(null)}
                      aria-pressed={isActive}
                      className={cn(
                        "group min-w-[9.5rem] max-w-[13rem] flex-1 rounded-none border bg-surface-2/90 px-4 py-3.5 text-left transition-all duration-300",
                        isActive ? "border-foreground/45 bg-surface-2" : "border-hairline",
                        dimmed ? "opacity-35" : "opacity-100",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          className={cn("size-3.5 transition-colors", isActive ? "text-brand" : tone)}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium leading-tight text-foreground">
                          {node.label}
                        </span>
                      </span>
                      {node.sublabel && (
                        <span className="mt-1.5 block font-mono text-[0.625rem] leading-relaxed text-muted-foreground">
                          {node.sublabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="sm:hidden">Swipe sideways to see the full diagram · tap</span>
        <span className="hidden sm:inline">Hover or focus</span> a node to trace its outbound calls
      </p>
    </div>
  );
}
