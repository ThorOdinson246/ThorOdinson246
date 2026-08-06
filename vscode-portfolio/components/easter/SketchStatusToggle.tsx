"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store";

function PencilGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M15.5 4.5l4 4-9.7 9.7-4-4L15.5 4.5z" fill="#f2b705" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.8 14.2l4 4L4 20l1.8-5.8z" fill="#e9d6a8" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M4 20l1.15-3.7L7.7 18.85 4 20z" fill="#2b2b2b" />
      <path d="M15.4 4.6l1.7-1.7 4 4-1.7 1.7-4-4z" fill="#d94a8c" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function EraserGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 15.5l8-8a2.2 2.2 0 0 1 3.1 0l4 4a2.2 2.2 0 0 1 0 3.1l-3.6 3.6H7.1L3.5 15.5z" fill="#ec6f9c" stroke="#3a2f10" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7.1 18.2h11.5" stroke="#3a2f10" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Sketch-mode toggle docked in the status bar (so it never covers other controls). */
export function SketchStatusToggle() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const toggleSketch = useEditorStore((s) => s.toggleSketch);
  const [hovered, setHovered] = useState(false);
  const [wiggling, setWiggling] = useState(false);

  useEffect(() => {
    if (sketchMode) return;
    const id = setInterval(() => {
      setWiggling(true);
      setTimeout(() => setWiggling(false), 700);
    }, 9000);
    return () => clearInterval(id);
  }, [sketchMode]);

  const tag = sketchMode ? "rub it out" : "don't click me";

  return (
    <div className="relative flex items-center">
      {(hovered || wiggling) && (
        <span
          className="pointer-events-none absolute bottom-full right-0 mb-1.5 whitespace-nowrap rounded-md px-2 py-1 shadow-md"
          style={{
            background: "var(--panel)",
            color: "var(--text-body)",
            border: "1px solid var(--border)",
            transform: "rotate(-2deg)",
            fontFamily: sketchMode ? "var(--font-caveat), cursive" : "var(--font-ui)",
            fontSize: sketchMode ? "15px" : "12px",
          }}
        >
          {tag} {sketchMode ? "✏️" : "👀"}
        </span>
      )}
      <button
        type="button"
        onClick={toggleSketch}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={sketchMode ? "Leave sketch mode" : "Enter sketch mode"}
        title={tag}
        className="flex items-center transition-transform hover:scale-110"
        style={{ animation: sketchMode || !wiggling ? undefined : "pencil-wiggle 0.7s ease-in-out" }}
      >
        {sketchMode ? <EraserGlyph /> : <PencilGlyph />}
      </button>
    </div>
  );
}
