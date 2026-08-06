"use client";

import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { useIsMobile } from "@/lib/useViewport";
import { SketchWall } from "../easter/SketchWall";
import { PianoStage } from "../easter/PianoStage";
import { SketchPad } from "../easter/SketchPad";
import { PencilBox } from "../easter/PencilBox";

const INK = "#3a2f10";
const HAND = "var(--font-caveat), cursive";

export function Sketchbook() {
  const exitSketch = useEditorStore((s) => s.exitSketch);
  // Doodling is a desktop-only detail: on touch it would swallow scrolling and
  // taps, so keep the canvas off on mobile.
  const doodle = !useIsMobile();

  return (
    <div className="relative min-h-full w-full" style={{ color: INK }}>
      <SketchPad enabled={doodle} />

      <div
        className={clsx(
          "relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 py-10 text-center sm:px-10 sm:py-12",
          doodle && "pointer-events-none"
        )}
      >
        <p className="text-[18px] opacity-70 sm:text-[19px]" style={{ fontFamily: HAND }}>
          you found the pencil.
        </p>
        <h1 className="mt-1 text-4xl sm:text-6xl" style={{ fontFamily: HAND, fontWeight: 700 }}>
          Mukesh&rsquo;s Sketchbook
        </h1>
        <p className="mt-2 max-w-md text-[18px] leading-snug opacity-80 sm:text-[20px]" style={{ fontFamily: HAND }}>
          a few drawings, and a little piano I&rsquo;m still learning. poke around.
        </p>
        {doodle && (
          <p className="mt-3 text-[15px] opacity-55" style={{ fontFamily: HAND }}>
            psst — drag anywhere on the paper to doodle. it fades on its own.
          </p>
        )}

        <section className="pointer-events-auto mt-12 w-full">
          <SketchWall />
        </section>

        <div className="my-14 flex w-full items-center gap-4 opacity-50 sm:my-16">
          <span className="h-px flex-1" style={{ background: INK }} />
          <span className="text-2xl" style={{ fontFamily: HAND }}>
            ♪
          </span>
          <span className="h-px flex-1" style={{ background: INK }} />
        </div>

        <h2 className="mb-2 text-3xl sm:text-4xl" style={{ fontFamily: HAND, fontWeight: 700 }}>
          the piano
        </h2>
        <section className="pointer-events-auto mt-6 w-full">
          <PianoStage />
        </section>

        <button
          onClick={exitSketch}
          className="pointer-events-auto relative mt-14 rounded-full bg-[#fbf6e6] px-6 py-2.5 text-[18px] transition-transform hover:scale-105 active:scale-95 sm:mt-16"
          style={{ color: INK, fontFamily: HAND }}
        >
          <PencilBox radius={22} strokeWidth={1.5} />
          rub it out &amp; go back ✏️
        </button>
      </div>
    </div>
  );
}
