"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const INK = "#3a2f10";

/**
 * A hand-drawn pencil border that fills its (relatively-positioned) parent.
 * Draws two slightly-offset stroked rects at different weights and opacities and
 * runs them through the grainy `#pencil-edge` filter, so the outline reads as a
 * real pencil line: wavering, streaky, with varying weight. Purely decorative.
 */
export function PencilBox({
  radius = 10,
  color = INK,
  strokeWidth = 1.7,
  className,
}: {
  radius?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;
    // Measure the border box (offsetWidth/Height), not contentRect: the SVG fills
    // the parent's padding box, so using the content box would draw the border
    // shrunk and offset toward the top-left on padded buttons.
    const ro = new ResizeObserver(() => {
      setSize({ w: parent.offsetWidth, h: parent.offsetHeight });
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const i = 3; // inset

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0 h-full w-full overflow-visible", className)}
    >
      {w > 0 && h > 0 && (
        <g filter="url(#pencil-edge)">
          <rect
            x={i}
            y={i}
            width={Math.max(0, w - i * 2)}
            height={Math.max(0, h - i * 2)}
            rx={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={0.92}
          />
          <rect
            x={i + 1.1}
            y={i + 1.6}
            width={Math.max(0, w - i * 2 - 2.2)}
            height={Math.max(0, h - i * 2 - 3.2)}
            rx={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.55}
            opacity={0.5}
          />
        </g>
      )}
    </svg>
  );
}
