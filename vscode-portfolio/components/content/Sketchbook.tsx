"use client";

import { useEditorStore } from "@/lib/store";
import { SketchCarousel } from "../easter/SketchCarousel";
import { Piano } from "../easter/Piano";

const INK = "#3a2f10";

export function Sketchbook() {
  const exitSketch = useEditorStore((s) => s.exitSketch);

  return (
    <div className="min-h-full w-full px-6 py-10 sm:px-10" style={{ color: INK }}>
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <p
          className="text-[15px] opacity-70"
          style={{ fontFamily: "var(--font-shantell), cursive" }}
        >
          you found the pencil.
        </p>
        <h1
          className="mt-1 text-4xl sm:text-5xl"
          style={{ fontFamily: "var(--font-shantell), cursive", fontWeight: 700 }}
        >
          Mukesh&rsquo;s Sketchbook
        </h1>
        <p
          className="mt-3 max-w-md text-[17px] leading-relaxed opacity-80"
          style={{ fontFamily: "var(--font-shantell), cursive" }}
        >
          a few drawings, and a little piano I&rsquo;m still learning. poke around.
        </p>

        <section className="mt-10 w-full">
          <SketchCarousel />
        </section>

        <div className="my-10 flex w-full items-center gap-4 opacity-50">
          <span className="h-px flex-1" style={{ background: INK }} />
          <span style={{ fontFamily: "var(--font-shantell), cursive" }}>♪</span>
          <span className="h-px flex-1" style={{ background: INK }} />
        </div>

        <section className="w-full">
          <Piano />
        </section>

        <button
          onClick={exitSketch}
          className="mt-12 rounded-full px-4 py-1.5 text-[15px] transition-transform hover:scale-105 active:scale-95"
          style={{ border: `1.5px dashed ${INK}`, color: INK, fontFamily: "var(--font-shantell), cursive" }}
        >
          rub it out & go back ✏️
        </button>
      </div>
    </div>
  );
}
