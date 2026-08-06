"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { KEYS, keyByKeyboard, playNote, getAudioCtx, type PianoKey } from "@/lib/piano";
import { SONGS, timeline, type Song } from "@/lib/songs";
import { PencilBox } from "./PencilBox";

const INK = "#3a2f10";
const HAND = "var(--font-caveat), cursive";
const WHITE_W = 40;
const BLACK_W = 26;
const LEAD = 1.9; // seconds a note falls before it sounds

// Pre-compute the horizontal layout (shared by keys and falling tiles).
const whites = KEYS.filter((k) => !k.black);
const whiteIndex: Record<string, number> = {};
whites.forEach((k, i) => (whiteIndex[k.note] = i));

interface Slot {
  left: number;
  width: number;
  black: boolean;
}
const layout: Record<string, Slot> = {};
whites.forEach((k, i) => (layout[k.note] = { left: i * WHITE_W, width: WHITE_W, black: false }));
KEYS.forEach((k, idx) => {
  if (!k.black) return;
  let j = idx - 1;
  while (j >= 0 && KEYS[j].black) j--;
  const wi = whiteIndex[KEYS[j].note];
  layout[k.note] = { left: (wi + 1) * WHITE_W - BLACK_W / 2, width: BLACK_W, black: true };
});
const TOTAL_W = whites.length * WHITE_W;

interface Tile {
  id: number;
  note: string;
  delay: number;
  height: number;
  slot: Slot;
}

export function PianoStage() {
  const active = useEditorStore((s) => s.sketchMode && s.activeTabId === "sketchbook");
  const [lit, setLit] = useState<Record<string, boolean>>({});
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);

  const flash = useCallback((note: string) => {
    setLit((l) => ({ ...l, [note]: true }));
    setTimeout(() => setLit((l) => ({ ...l, [note]: false })), 220);
  }, []);

  const strike = useCallback(
    (k: PianoKey) => {
      playNote(k.note);
      flash(k.note);
    },
    [flash]
  );

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTiles([]);
    setPlayingId(null);
  }, []);

  const play = useCallback(
    (song: Song) => {
      stop();
      getAudioCtx(); // unlock audio inside the click gesture
      const { notes, total } = timeline(song);
      setPlayingId(song.id);
      setTiles(
        notes.map((n, i) => ({
          id: i,
          note: n.note,
          delay: n.start,
          height: Math.max(16, Math.min(n.duration, 1.6) * 62),
          slot: layout[n.note],
        }))
      );
      for (const n of notes) {
        playNote(n.note, n.start + LEAD, n.duration);
        timers.current.push(setTimeout(() => flash(n.note), (n.start + LEAD) * 1000));
      }
      timers.current.push(setTimeout(stop, (total + LEAD + 1.6) * 1000));
      // Make sure the whole stage (falling notes + keys) is in view.
      stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    [flash, stop]
  );

  // Computer-keyboard free play (lower octave), only while the sketchbook is active.
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

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <div ref={stageRef} className="flex w-full flex-col items-center scroll-mt-20" style={{ color: INK }}>
      {/* stage: falling notes + keyboard */}
      <div className="max-w-full overflow-x-auto pb-2">
        <div style={{ width: TOTAL_W }}>
          {/* falling notes area */}
          <div className="relative overflow-hidden" style={{ height: "clamp(200px, 34vh, 360px)" }}>
            {/* faint lane guides */}
            {whites.map((k, i) => (
              <span
                key={k.note}
                className="absolute top-0 bottom-0"
                style={{ left: i * WHITE_W, width: WHITE_W, borderRight: "1px solid rgba(58,47,16,0.08)" }}
              />
            ))}
            {tiles.map((t) => (
              <span
                key={t.id}
                className="absolute rounded-[5px]"
                style={{
                  left: t.slot.left + 3,
                  width: t.slot.width - 6,
                  height: t.height,
                  background: t.slot.black ? "rgba(58,47,16,0.82)" : "rgba(58,47,16,0.55)",
                  border: `1.5px solid ${INK}`,
                  animation: `note-fall ${LEAD}s linear ${t.delay}s both`,
                }}
              />
            ))}
            {/* hit line */}
            <span className="absolute inset-x-0 bottom-0 h-[2px]" style={{ background: INK, opacity: 0.5 }} />
          </div>

          {/* keyboard */}
          <div className="relative" style={{ height: 156 }}>
            {whites.map((k, i) => (
              <button
                key={k.note}
                onClick={() => strike(k)}
                aria-label={k.note}
                className="absolute top-0 flex items-end justify-center rounded-b-[6px] pb-2"
                style={{
                  left: i * WHITE_W + 1,
                  width: WHITE_W - 2,
                  height: 156,
                  background: lit[k.note] ? "#e6d29a" : "#fffdf5",
                  border: `1.5px solid ${INK}`,
                  borderTop: "none",
                }}
              >
                <span className="pointer-events-none flex flex-col items-center gap-0.5">
                  <span className="text-[11px] font-semibold">{k.note.replace(/[45]/g, "")}</span>
                  {k.keyboard && (
                    <kbd className="rounded px-1 text-[9px] uppercase opacity-50" style={{ border: `1px solid ${INK}` }}>
                      {k.keyboard}
                    </kbd>
                  )}
                </span>
              </button>
            ))}
            {KEYS.filter((k) => k.black).map((k) => (
              <button
                key={k.note}
                onClick={() => strike(k)}
                aria-label={k.note}
                className="absolute top-0 flex items-end justify-center rounded-b-[5px] pb-1.5"
                style={{
                  left: layout[k.note].left,
                  width: BLACK_W,
                  height: 96,
                  background: lit[k.note] ? "#6b5730" : "#2b2317",
                  border: `1.5px solid ${INK}`,
                  color: "#f3ead0",
                }}
              >
                {k.keyboard && <kbd className="pointer-events-none text-[9px] uppercase opacity-80">{k.keyboard}</kbd>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* song picker */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
        {SONGS.map((song) => {
          const on = playingId === song.id;
          return (
            <button
              key={song.id}
              onClick={() => (on ? stop() : play(song))}
              className="relative rounded-full bg-[#fbf6e6] px-6 py-2.5 text-[17px] leading-none transition-transform hover:scale-105 active:scale-95"
              style={{ color: INK, fontFamily: HAND }}
              title={song.subtitle}
            >
              <PencilBox radius={18} strokeWidth={on ? 2 : 1.4} />
              {on ? "◼ stop" : `▶ ${song.title}`}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-[16px] opacity-60" style={{ fontFamily: HAND }}>
        pick a tune and watch the notes fall, or play the keys yourself
      </p>
    </div>
  );
}
