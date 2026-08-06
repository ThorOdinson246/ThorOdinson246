"use client";

import clsx from "clsx";
import { useEditorStore } from "@/lib/store";

function PencilGlyph() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path d="M15.5 4.5l4 4-9.7 9.7-4-4L15.5 4.5z" fill="#f2b705" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.8 14.2l4 4L4 20l1.8-5.8z" fill="#e9d6a8" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4 20l1.15-3.7L7.7 18.85 4 20z" fill="#2b2b2b" />
      <path d="M15.4 4.6l1.7-1.7 4 4-1.7 1.7-4-4z" fill="#d94a8c" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function EraserGlyph() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 15.5l8-8a2.2 2.2 0 0 1 3.1 0l4 4a2.2 2.2 0 0 1 0 3.1l-3.6 3.6H7.1L3.5 15.5z" fill="#ec6f9c" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7.1 18.2h11.5" stroke="#3a2f10" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Sketch-mode toggle that lives in the activity bar, beside Settings. */
export function SketchBarToggle() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const toggleSketch = useEditorStore((s) => s.toggleSketch);

  return (
    <button
      onClick={toggleSketch}
      title={sketchMode ? "rub it out" : "don't click me"}
      aria-label={sketchMode ? "Leave sketch mode" : "Enter sketch mode"}
      className={clsx(
        "flex h-11 w-12 shrink-0 items-center justify-center border-l-2 transition-colors",
        sketchMode ? "border-l-accent-link" : "border-l-transparent hover:bg-white/5"
      )}
    >
      <span
        className="inline-flex"
        style={{ animation: sketchMode ? undefined : "attention-wiggle 5.5s ease-in-out infinite", transformOrigin: "70% 70%" }}
      >
        {sketchMode ? <EraserGlyph /> : <PencilGlyph />}
      </span>
    </button>
  );
}
