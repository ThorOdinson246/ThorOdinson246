"use client";

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";

/**
 * A pencil (or eraser) zips diagonally across the screen when sketch mode toggles,
 * as if drawing the change on. The actual theme morph is a smooth colour
 * transition (see ThemeManager + .theme-morphing); this is the flourish on top.
 */
export function SketchTransition() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const [play, setPlay] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setRunKey((k) => k + 1);
    setPlay(true);
  }, [sketchMode]);

  if (!play) return null;

  return (
    <div key={runKey} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <span
        onAnimationEnd={() => setPlay(false)}
        style={{
          fontSize: 60,
          filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))",
          animation: "pencil-fly 0.62s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      >
        {sketchMode ? "✏️" : "🧽"}
      </span>
    </div>
  );
}
