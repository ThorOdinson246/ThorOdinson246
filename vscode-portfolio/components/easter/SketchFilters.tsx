"use client";

/**
 * Hidden SVG filters for the sketch-mode morph. Mounted once at the desktop level.
 *
 * - `#sketch-rough`: a subtle displacement applied to the whole editor surface so
 *   straight UI edges waver slightly. Kept gentle so text stays readable.
 * - `#pencil-edge`: a stronger, grainy filter for hand-drawn strokes (the
 *   `PencilBox` borders). Displaces the edge and then masks it with high-contrast
 *   noise so the line breaks up into streaks with varying weight and opacity,
 *   the way a real pencil stroke does.
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
          <feTurbulence type="fractalNoise" baseFrequency="0.013 0.011" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="pencil-edge" x="-15%" y="-15%" width="130%" height="130%">
          {/* waver the stroke */}
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.032" numOctaves="3" seed="5" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="3.6" xChannelSelector="R" yChannelSelector="G" result="disp" />
          {/* fine graphite grain, turned into a high-contrast alpha mask */}
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.7" numOctaves="3" seed="11" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="grainR"
          />
          <feComponentTransfer in="grainR" result="grainMask">
            <feFuncA type="linear" slope="2.4" intercept="0.12" />
          </feComponentTransfer>
          {/* break the stroke up with the grain so it reads as pencil */}
          <feComposite in="disp" in2="grainMask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
