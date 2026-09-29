"use client";

import { useEffect, useRef } from "react";

/**
 * Animated ASCII developer symbol: </>
 *
 * Binary digits form the classic gradient code symbol with rounded bars.
 * Left bracket (blue) → center slash (cyan) → right bracket (teal)
 */

// Clean </> with thicker, rounded bars
const SYMBOL = `
                                    00000000
                                    00000000
                    111            100000000     000
                 11111111          10000000    00000000
               11111111111         10000000   00000000000
             111111111111         110000000    000000000000
           111111111111           11000000       000000000000
         111111111111             11000000         000000000000
       111111111111              111000000           000000000000
     111111111111                11100000              000000000000
   111111111111                 111100000                000000000000
1111111111111                   111100000                  0000000000000
11111111111                    111110000                     00000000000
11111111111                    111110000                     00000000000
1111111111111                  111110000                   0000000000000
   111111111111               11111000                  000000000000
     111111111111             11111000                000000000000
       111111111111           11111000              000000000000
         111111111111         11111100             000000000000
           111111111111      11111100           000000000000
             111111111111    111111100         000000000000
               11111111111  111111110         00000000000
                 11111111   111111110          00000000
                    111     111111110            000
                            11111111
                            11111111

                    
`.trim();

const CHARS = ["0", "1"];

export function AsciiSymbol() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const lines = SYMBOL.split("\n");
    const charWidth = 5.5;
    const charHeight = 9;
    const totalWidth = Math.max(...lines.map((l) => l.length)) * charWidth;
    const totalHeight = lines.length * charHeight;
    const offsetX = (rect.width - totalWidth) / 2;
    const offsetY = (rect.height - totalHeight) / 2;

    ctx.font = "9px ui-monospace, monospace";
    ctx.textBaseline = "top";

    // Parse template into grid
    const grid: Array<{ x: number; y: number; col: number; template: string }> = [];
    lines.forEach((line, row) => {
      Array.from(line).forEach((char, col) => {
        if (char !== " ") {
          grid.push({
            x: offsetX + col * charWidth,
            y: offsetY + row * charHeight,
            col,
            template: char,
          });
        }
      });
    });

    const maxCol = Math.max(...grid.map((g) => g.col));

    // Each cell flickers then settles
    const cells = grid.map((cell) => ({
      ...cell,
      current: CHARS[Math.floor(Math.random() * CHARS.length)],
      settled: false,
      settleTime: 500 + Math.random() * 1000,
    }));

    let raf = 0;

    const frame = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (const cell of cells) {
        // Continuous flicker: randomly change ~15% of characters each frame
        if (Math.random() < 0.15) {
          cell.current = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        // Gradient: blue (left) → cyan (center) → teal (right)
        const ratio = cell.col / maxCol;
        let r, g, b;

        if (ratio < 0.33) {
          // Blue to cyan
          const t = ratio / 0.33;
          r = Math.round(37 + (14 - 37) * t);
          g = Math.round(99 + (165 - 99) * t);
          b = Math.round(235 + (250 - 235) * t);
        } else if (ratio < 0.66) {
          // Cyan to teal
          const t = (ratio - 0.33) / 0.33;
          r = Math.round(14 + (6 - 14) * t);
          g = Math.round(165 + (182 - 165) * t);
          b = Math.round(250 + (212 - 250) * t);
        } else {
          // Teal
          const t = (ratio - 0.66) / 0.34;
          r = Math.round(6 + (20 - 6) * t);
          g = Math.round(182 + (184 - 182) * t);
          b = Math.round(212 + (166 - 212) * t);
        }

        // Slightly higher opacity for the template character
        const alpha = cell.current === cell.template ? 0.9 : 0.65;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        ctx.fillText(cell.current, cell.x, cell.y);
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ width: "100%", height: "100%" }}
      aria-label="Developer symbol: code brackets with slash"
    />
  );
}
