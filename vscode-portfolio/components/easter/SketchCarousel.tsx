"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { sketches } from "@/lib/content/sketches";
import { useEditorStore } from "@/lib/store";

const INK = "#3a2f10";

function TapeCorner({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-3 h-6 w-14 bg-[#e8dcae]/70 shadow-sm"
      style={{
        [side]: "1.25rem",
        transform: `rotate(${side === "left" ? -8 : 8}deg)`,
        borderLeft: "1px dashed rgba(58,47,16,0.25)",
        borderRight: "1px dashed rgba(58,47,16,0.25)",
      }}
    />
  );
}

function EmptyFrame() {
  return (
    <div
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3"
      style={{ color: INK }}
    >
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" opacity="0.5">
        <path d="M4 17l4.5-6 3 3.5L15 9l5 8" stroke={INK} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="7.5" r="1.6" stroke={INK} strokeWidth="1.2" />
      </svg>
      <p className="text-[15px] opacity-70" style={{ fontFamily: "var(--font-shantell), cursive" }}>
        ( drawing coming soon )
      </p>
    </div>
  );
}

export function SketchCarousel() {
  const active = useEditorStore((s) => s.sketchMode && s.activeTabId === "sketchbook");
  const [index, setIndex] = useState(0);
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const count = sketches.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go]);

  const current = sketches[index];
  const showImage = current && !errored[index];

  return (
    <div className="flex w-full flex-col items-center" style={{ color: INK }}>
      <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
        <ArrowButton dir="left" onClick={() => go(-1)} />

        <div
          className="relative w-full max-w-md rounded-[14px] bg-[#fbf6e6] p-4 pt-6"
          style={{
            border: `1.5px solid ${INK}`,
            filter: "url(#sketch-rough)",
            boxShadow: "3px 4px 0 rgba(58,47,16,0.18)",
          }}
        >
          <TapeCorner side="left" />
          <TapeCorner side="right" />
          <div className="overflow-hidden rounded-[8px]" style={{ border: `1px solid ${INK}` }}>
            {showImage ? (
              <img
                src={current.file}
                alt={current.caption}
                className="aspect-[4/3] w-full object-cover"
                onError={() => setErrored((e) => ({ ...e, [index]: true }))}
              />
            ) : (
              <EmptyFrame />
            )}
          </div>
          <p
            className="mt-3 text-center text-[17px]"
            style={{ fontFamily: "var(--font-shantell), cursive" }}
          >
            {current?.caption}
          </p>
        </div>

        <ArrowButton dir="right" onClick={() => go(1)} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        {sketches.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to drawing ${i + 1}`}
            className="h-2.5 w-2.5 rounded-full transition-transform hover:scale-125"
            style={{ background: i === index ? INK : "transparent", border: `1.5px solid ${INK}` }}
          />
        ))}
      </div>
      <p className="mt-2 text-[13px] opacity-60" style={{ fontFamily: "var(--font-shantell), cursive" }}>
        {index + 1} / {count} · use ← → to flip
      </p>
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous drawing" : "Next drawing"}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fbf6e6] transition-transform hover:scale-110 active:scale-95"
      style={{ border: `1.5px solid ${INK}`, color: INK }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ transform: dir === "right" ? "scaleX(-1)" : undefined }}>
        <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
