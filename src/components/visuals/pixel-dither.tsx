"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

/**
 * 1-bit pixel field: an animated noise cloud quantised to a pixel grid and
 * resolved through a 4x4 ordered (Bayer) dither, so it renders as discrete
 * white pixels on black rather than a smooth gradient.
 *
 * Built on ogl, which is already a dependency, so this adds no bundle weight
 * beyond the shader itself.
 */

const VERT = /* glsl */ `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uCell;
uniform vec2  uMouse;
uniform float uIntensity;
uniform float uSpeed;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

const float bayer[16] = float[16](
   0.0,  8.0,  2.0, 10.0,
  12.0,  4.0, 14.0,  6.0,
   3.0, 11.0,  1.0,  9.0,
  15.0,  7.0, 13.0,  5.0
);

void main() {
  // Snap to the pixel grid first so everything downstream is per-cell.
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 uv = (cell * uCell) / uResolution;

  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * uSpeed;

  float n = fbm(p * 3.1 + vec2(t * 0.06, -t * 0.042));
  n += 0.34 * fbm(p * 7.4 - vec2(t * 0.028, t * 0.016));
  n *= 0.78;

  // Soft mass, nudged by the pointer so the field feels alive.
  vec2 centre = vec2(0.5 * aspect, 0.54) + (uMouse - 0.5) * vec2(0.14 * aspect, 0.11);
  float d = distance(p, centre);
  float mask = smoothstep(0.66, 0.04, d);

  float v = clamp(n * mask * uIntensity, 0.0, 1.0);

  // 4x4 ordered dither -> hard on/off per cell
  ivec2 b = ivec2(mod(cell, 4.0));
  float threshold = (bayer[b.y * 4 + b.x] + 0.5) / 16.0;
  float on = step(threshold, v);

  float alpha = on * (0.32 + 0.68 * v);
  fragColor = vec4(vec3(1.0) * alpha, alpha);
}
`;

interface PixelDitherProps {
  /** Pixel size in CSS pixels. */
  cell?: number;
  intensity?: number;
  speed?: number;
  followMouse?: boolean;
  className?: string;
}

export default function PixelDither({
  cell = 5,
  intensity = 1.25,
  speed = 1,
  followMouse = true,
  className = "",
}: PixelDitherProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new Renderer({ alpha: true, antialias: false, dpr: 1 });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    delete geometry.attributes.uv;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uCell: { value: cell },
        uMouse: { value: [0.5, 0.5] },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    host.appendChild(gl.canvas);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const target = [0.5, 0.5];
    const current = [0.5, 0.5];

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      target[0] = (event.clientX - rect.left) / rect.width;
      target[1] = 1 - (event.clientY - rect.top) / rect.height;
    };

    if (followMouse) window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      // ~40fps is plenty for a 1-bit field and keeps the GPU cost trivial.
      if (now - last < 24) return;
      last = now;

      current[0] += (target[0] - current[0]) * 0.06;
      current[1] += (target[1] - current[1]) * 0.06;

      program.uniforms.uTime.value = now * 0.001;
      program.uniforms.uMouse.value = current;
      renderer.render({ scene: mesh });
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      if (followMouse) window.removeEventListener("pointermove", onPointerMove);
      if (gl.canvas.parentNode === host) host.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [cell, intensity, speed, followMouse]);

  return <div ref={hostRef} className={`h-full w-full ${className}`} />;
}
