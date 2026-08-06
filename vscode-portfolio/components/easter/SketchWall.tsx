"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { sketches } from "@/lib/content/sketches";
import { PencilBox } from "./PencilBox";

const INK = "#3a2f10";
const HAND = "var(--font-caveat), cursive";
// Varied placeholder heights and slight rotations give the wall a pinned-up,
// hand-arranged feel until real scans (which drive their own heights) are added.
const PLACEHOLDER_H = [210, 260, 190, 250, 220, 240];
const ROTATE = [-2, 1.5, -1, 2, -1.5, 1];

function Tape({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-2.5 h-5 w-12 bg-[#e8dcae]/70"
      style={{
        [side]: "0.9rem",
        transform: `rotate(${side === "left" ? -7 : 7}deg)`,
        borderLeft: "1px dashed rgba(58,47,16,0.25)",
        borderRight: "1px dashed rgba(58,47,16,0.25)",
      }}
    />
  );
}

export function SketchWall() {
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <>
      <div className="mx-auto max-w-2xl [column-gap:1.25rem] sm:columns-2" style={{ color: INK }}>
        {sketches.map((s, i) => {
          const broken = errored[i];
          return (
            <figure
              key={s.file}
              className="relative mb-6 inline-block w-full break-inside-avoid rounded-[14px] bg-[#fbf6e6] p-3 pt-5"
              style={{ transform: `rotate(${ROTATE[i % ROTATE.length]}deg)`, boxShadow: "3px 4px 0 rgba(58,47,16,0.14)" }}
            >
              <PencilBox radius={14} />
              <Tape side={i % 2 === 0 ? "left" : "right"} />
              <button
                onClick={() => !broken && setZoom(i)}
                className="relative block w-full overflow-hidden rounded-[8px]"
                style={{ cursor: broken ? "default" : "zoom-in" }}
                aria-label={`View ${s.caption}`}
              >
                <PencilBox radius={8} strokeWidth={1.2} />
                {!broken ? (
                  <img
                    src={s.file}
                    alt={s.caption}
                    className="w-full object-cover"
                    onError={() => setErrored((e) => ({ ...e, [i]: true }))}
                  />
                ) : (
                  <div
                    className="flex w-full flex-col items-center justify-center gap-2"
                    style={{ height: PLACEHOLDER_H[i % PLACEHOLDER_H.length] }}
                  >
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" opacity="0.5">
                      <path d="M4 17l4.5-6 3 3.5L15 9l5 8" stroke={INK} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="8" cy="7.5" r="1.6" stroke={INK} strokeWidth="1.2" />
                    </svg>
                    <span className="text-[16px] opacity-60" style={{ fontFamily: HAND }}>
                      coming soon
                    </span>
                  </div>
                )}
              </button>
              <figcaption className="mt-2 text-center text-[18px]" style={{ fontFamily: HAND }}>
                {s.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {zoom !== null && sketches[zoom] && !errored[zoom] && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#2b2317]/70 p-8"
          onClick={() => setZoom(null)}
        >
          <figure className="relative max-h-full max-w-3xl rounded-[16px] bg-[#fbf6e6] p-4" onClick={(e) => e.stopPropagation()}>
            <PencilBox radius={16} />
            <img src={sketches[zoom].file} alt={sketches[zoom].caption} className="max-h-[70vh] w-auto rounded-[8px]" />
            <figcaption className="mt-3 text-center text-[20px]" style={{ color: INK, fontFamily: HAND }}>
              {sketches[zoom].caption}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
