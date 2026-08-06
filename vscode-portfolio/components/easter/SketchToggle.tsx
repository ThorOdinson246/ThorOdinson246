"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { PencilBox } from "./PencilBox";

const INK = "#3a2f10";

function PencilGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M15.5 4.5l4 4-9.7 9.7-4-4L15.5 4.5z" fill="#f2b705" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M13.6 6.4l4 4" stroke="#c98a00" strokeWidth="1.1" />
      <path d="M5.8 14.2l4 4L4 20l1.8-5.8z" fill="#e9d6a8" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M4 20l1.15-3.7L7.7 18.85 4 20z" fill="#2b2b2b" />
      <path d="M15.4 4.6l1.7-1.7 4 4-1.7 1.7-4-4z" fill="#d94a8c" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function EraserGlyph() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 15.5l8-8a2.2 2.2 0 0 1 3.1 0l4 4a2.2 2.2 0 0 1 0 3.1l-3.6 3.6H7.1L3.5 15.5z" fill="#ec6f9c" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M10.4 8.6l5 5" stroke="#b23a6a" strokeWidth="1.1" />
      <path d="M7.1 18.2h11.5" stroke="#3a2f10" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function SketchToggle() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const toggleSketch = useEditorStore((s) => s.toggleSketch);
  const [hovered, setHovered] = useState(false);
  const [wiggling, setWiggling] = useState(false);

  // Occasional wiggle to tempt a click (only while the pencil is resting on the IDE).
  useEffect(() => {
    if (sketchMode) return;
    const id = setInterval(() => {
      setWiggling(true);
      setTimeout(() => setWiggling(false), 700);
    }, 7000);
    return () => clearInterval(id);
  }, [sketchMode]);

  const tag = sketchMode ? "rub it out" : "don't click me";

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 select-none">
      {(hovered || wiggling) && (
        <span
          className="pointer-events-none mr-1 whitespace-nowrap rounded-md px-2.5 py-1 text-[13px] shadow-sm"
          style={{
            background: "var(--panel)",
            color: "var(--text-body)",
            border: "1px solid var(--border)",
            transform: "rotate(-2deg)",
            fontFamily: sketchMode ? "var(--font-caveat), cursive" : "var(--font-ui)",
            fontSize: sketchMode ? "16px" : "13px",
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
        className="pointer-events-auto relative grid h-12 w-12 place-items-center rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
        style={{
          background: "var(--panel)",
          border: sketchMode ? "none" : "1px solid var(--border)",
          animation: sketchMode
            ? undefined
            : wiggling
              ? "pencil-wiggle 0.7s ease-in-out"
              : "pencil-bob 3.2s ease-in-out infinite",
        }}
      >
        {/* In sketch mode the button gets a hand-drawn pencil border to match the paper world. */}
        {sketchMode && <PencilBox radius={12} strokeWidth={1.5} color={INK} />}
        {sketchMode ? <EraserGlyph /> : <PencilGlyph />}
      </button>
    </div>
  );
}
