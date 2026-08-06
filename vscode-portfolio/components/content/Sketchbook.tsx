"use client";

import { useState } from "react";
import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { SketchWall } from "../easter/SketchWall";
import { PianoStage } from "../easter/PianoStage";
import { SketchPad } from "../easter/SketchPad";
import { PencilBox } from "../easter/PencilBox";

const INK = "#3a2f10";
const HAND = "var(--font-caveat), cursive";

export function Sketchbook() {
  const exitSketch = useEditorStore((s) => s.exitSketch);
  const [doodle, setDoodle] = useState(true);

  return (
    <div className="relative min-h-full w-full" style={{ color: INK }}>
      <SketchPad enabled={doodle} />

      <div
        className={clsx(
          "relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-12 text-center sm:px-10",
          doodle && "pointer-events-none"
        )}
      >
        <p className="text-[19px] opacity-70" style={{ fontFamily: HAND }}>
          you found the pencil.
        </p>
        <h1 className="mt-1 text-5xl sm:text-6xl" style={{ fontFamily: HAND, fontWeight: 700 }}>
          Mukesh&rsquo;s Sketchbook
        </h1>
        <p className="mt-2 max-w-md text-[20px] leading-snug opacity-80" style={{ fontFamily: HAND }}>
          a few drawings, and a little piano I&rsquo;m still learning. poke around.
        </p>

        {/* doodle toggle */}
        <button
          onClick={() => setDoodle((d) => !d)}
          className="pointer-events-auto relative mt-5 rounded-full bg-[#fbf6e6] px-4 py-1.5 text-[16px] transition-transform hover:scale-105 active:scale-95"
          style={{ color: INK, fontFamily: HAND }}
        >
          <PencilBox radius={16} strokeWidth={1.4} />
          {doodle ? "✎ doodling on — drag the paper (click to stop)" : "✎ doodle on the paper?"}
        </button>

        <section className="pointer-events-auto mt-12 w-full">
          <SketchWall />
        </section>

        <div className="my-16 flex w-full items-center gap-4 opacity-50">
          <span className="h-px flex-1" style={{ background: INK }} />
          <span className="text-2xl" style={{ fontFamily: HAND }}>
            ♪
          </span>
          <span className="h-px flex-1" style={{ background: INK }} />
        </div>

        <h2 className="mb-2 text-4xl" style={{ fontFamily: HAND, fontWeight: 700 }}>
          the piano
        </h2>
        <section className="pointer-events-auto mt-6 w-full">
          <PianoStage />
        </section>

        <button
          onClick={exitSketch}
          className="pointer-events-auto relative mt-16 rounded-full bg-[#fbf6e6] px-6 py-2.5 text-[18px] transition-transform hover:scale-105 active:scale-95"
          style={{ color: INK, fontFamily: HAND }}
        >
          <PencilBox radius={22} strokeWidth={1.5} />
          rub it out &amp; go back ✏️
        </button>
      </div>
    </div>
  );
}
