"use client";

import clsx from "clsx";
import { useEditorStore } from "@/lib/store";

// Line icons in the same style as the other activity-bar glyphs.
function PencilGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 4.5l3 3L9 18l-4 1 1-4 10.5-10.5z" />
      <path d="M14.3 6.7l3 3" />
    </svg>
  );
}
function EraserGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15.5l7.6-7.6a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8L15 17.5H7.5L4 15.5z" />
      <path d="M7.5 17.5H19" />
    </svg>
  );
}

/** Sketch-mode toggle in the activity bar, styled like the other icons. */
export function SketchBarToggle() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const toggleSketch = useEditorStore((s) => s.toggleSketch);

  return (
    <button
      onClick={toggleSketch}
      title={sketchMode ? "rub it out" : "don't click"}
      aria-label={sketchMode ? "Leave sketch mode" : "Enter sketch mode"}
      className={clsx(
        "relative flex h-11 w-12 shrink-0 items-center justify-center border-l-2 transition-colors",
        sketchMode ? "border-l-accent-link text-text-body" : "border-l-transparent text-text-muted hover:text-text-body"
      )}
    >
      <span
        className="inline-flex"
        style={{
          animation: sketchMode ? undefined : "attention-wiggle 4.5s ease-in-out infinite",
          transformOrigin: "70% 70%",
        }}
      >
        {sketchMode ? <EraserGlyph /> : <PencilGlyph />}
      </span>
    </button>
  );
}
