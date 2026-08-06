"use client";

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";

// A sheet that covers the screen the instant the theme swaps, then sweeps away.
const PAPER = "repeating-linear-gradient(45deg, rgba(58,47,16,0.06) 0 2px, transparent 2px 8px), #f1e8d2";
const DARK = "repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 8px), #0b0d12";

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
    <div
      key={runKey}
      aria-hidden="true"
      onAnimationEnd={() => setPlay(false)}
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: sketchMode ? PAPER : DARK, animation: "sketch-wipe 0.8s ease-in-out forwards" }}
    >
      <span style={{ fontSize: 46, opacity: 0.55 }}>{sketchMode ? "✏️" : "🧽"}</span>
    </div>
  );
}
