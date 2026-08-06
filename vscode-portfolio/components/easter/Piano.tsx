"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { KEYS, keyByKeyboard, playFreq, playMelody, TWINKLE, type PianoKey } from "@/lib/piano";

const INK = "#3a2f10";
const WHITE_W = 46; // px

const whites = KEYS.filter((k) => !k.black);
// Each black key sits just after this white-key index.
const blackAfter: Record<string, number> = {
  "C#4": 0,
  "D#4": 1,
  "F#4": 3,
  "G#4": 4,
  "A#4": 5,
};

export function Piano() {
  const active = useEditorStore((s) => s.sketchMode && s.activeTabId === "sketchbook");
  const [lit, setLit] = useState<Record<string, boolean>>({});
  const [playing, setPlaying] = useState(false);
  const cancelRef = useRef<() => void>(() => {});

  const flash = useCallback((note: string) => {
    setLit((l) => ({ ...l, [note]: true }));
    setTimeout(() => setLit((l) => ({ ...l, [note]: false })), 220);
  }, []);

  const strike = useCallback(
    (k: PianoKey) => {
      playFreq(k.freq);
      flash(k.note);
    },
    [flash]
  );

  // Computer-keyboard play, only while the sketchbook is the active tab.
  useEffect(() => {
    if (!active) return;
    function onKey(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = keyByKeyboard[e.key.toLowerCase()];
      if (k) {
        e.preventDefault();
        strike(k);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, strike]);

  useEffect(() => () => cancelRef.current(), []);

  function playSong() {
    if (playing) return;
    setPlaying(true);
    cancelRef.current = playMelody(TWINKLE, flash);
    const total = TWINKLE.reduce((s, step) => s + step.beats, 0) * 0.42;
    setTimeout(() => setPlaying(false), total * 1000 + 400);
  }

  return (
    <div className="flex flex-col items-center gap-4" style={{ color: INK }}>
      <div
        className="relative rounded-[10px] bg-[#fbf6e6] p-3"
        style={{ border: `1.5px solid ${INK}`, filter: "url(#sketch-rough)", boxShadow: "3px 4px 0 rgba(58,47,16,0.18)" }}
      >
        <div className="relative flex" style={{ height: 150 }}>
          {/* white keys */}
          {whites.map((k) => (
            <button
              key={k.note}
              onClick={() => strike(k)}
              aria-label={k.note}
              className="relative flex items-end justify-center rounded-b-[6px] pb-2 transition-colors"
              style={{
                width: WHITE_W,
                marginRight: 3,
                background: lit[k.note] ? "#e9d9a4" : "#fffdf5",
                border: `1.5px solid ${INK}`,
                borderTop: "none",
              }}
            >
              <span className="pointer-events-none flex flex-col items-center gap-0.5">
                <span className="text-[12px] font-semibold">{k.note.replace("4", "").replace("5", "")}</span>
                <kbd
                  className="rounded px-1 text-[10px] uppercase opacity-55"
                  style={{ border: `1px solid ${INK}` }}
                >
                  {k.keyboard}
                </kbd>
              </span>
            </button>
          ))}

          {/* black keys */}
          {KEYS.filter((k) => k.black).map((k) => {
            const wIdx = blackAfter[k.note];
            const left = (wIdx + 1) * (WHITE_W + 3) - 15;
            return (
              <button
                key={k.note}
                onClick={() => strike(k)}
                aria-label={k.note}
                className="absolute top-0 flex items-end justify-center rounded-b-[5px] pb-1.5"
                style={{
                  left,
                  width: 30,
                  height: 92,
                  background: lit[k.note] ? "#5b4a2a" : "#2b2317",
                  border: `1.5px solid ${INK}`,
                  color: "#f3ead0",
                }}
              >
                <kbd className="pointer-events-none text-[9px] uppercase opacity-80">{k.keyboard}</kbd>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={playSong}
        disabled={playing}
        className="rounded-full bg-[#fbf6e6] px-4 py-1.5 text-[15px] transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
        style={{ border: `1.5px solid ${INK}`, color: INK, fontFamily: "var(--font-shantell), cursive" }}
      >
        {playing ? "♪ playing…" : "♪ play something"}
      </button>
      <p className="text-[13px] opacity-60" style={{ fontFamily: "var(--font-shantell), cursive" }}>
        click the keys, or use your keyboard
      </p>
    </div>
  );
}
