"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store";

function PencilGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
      {/* body */}
      <path d="M15.5 4.5l4 4-9.7 9.7-4-4L15.5 4.5z" fill="#f2b705" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M13.6 6.4l4 4" stroke="#c98a00" strokeWidth="1.1" />
      {/* wooden tip */}
      <path d="M5.8 14.2l4 4L4 20l1.8-5.8z" fill="#e9d6a8" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
      {/* graphite point */}
      <path d="M4 20l1.15-3.7L7.7 18.85 4 20z" fill="#2b2b2b" />
      {/* metal ferrule */}
      <path d="M15.4 4.6l1.7-1.7 4 4-1.7 1.7-4-4z" fill="#d94a8c" stroke="#3a2f10" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function EraserGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
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

  // Occasional wiggle to tempt a click (only while not in sketch mode).
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
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-2 select-none sm:bottom-6 sm:right-6">
      {(hovered || wiggling) && (
        <span
          className="pointer-events-none whitespace-nowrap rounded-md border border-dashed border-[#3a2f10]/60 bg-[#f7f0dd] px-2.5 py-1 text-[13px] text-[#3a2f10] shadow-sm"
          style={{ fontFamily: "var(--font-shantell), cursive", transform: "rotate(-3deg)" }}
        >
          {tag}
          {sketchMode ? " ✏️" : " 👀"}
        </span>
      )}
      <button
        type="button"
        onClick={toggleSketch}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={sketchMode ? "Leave sketch mode" : "Enter sketch mode"}
        title={tag}
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
        style={{
          animation: wiggling
            ? "pencil-wiggle 0.7s ease-in-out"
            : "pencil-bob 3.2s ease-in-out infinite",
        }}
      >
        {sketchMode ? <EraserGlyph /> : <PencilGlyph />}
      </button>
    </div>
  );
}
