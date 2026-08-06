"use client";

/**
 * Hidden SVG filter used by the sketch-mode morph. Mounted once at the desktop
 * level; referenced from CSS as `filter: url(#sketch-rough)`. The turbulence +
 * displacement give straight edges a hand-drawn waver.
 */
export function SketchFilters() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}
    >
      <defs>
        <filter id="sketch-rough" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.013 0.011"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
