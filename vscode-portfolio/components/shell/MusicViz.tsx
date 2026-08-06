"use client";

import { useMusic } from "@/lib/audio";

const bars = [
  { d: "0.7s", delay: "0s" },
  { d: "1.1s", delay: "0.15s" },
  { d: "0.5s", delay: "0.3s" },
  { d: "0.9s", delay: "0.1s" },
  { d: "1.3s", delay: "0.25s" },
];

export function MusicViz() {
  const { musicOn, toggle } = useMusic();

  return (
    <button
      onClick={toggle}
      title={musicOn ? "Lo-fi: playing (click to pause)" : "Lo-fi coding music (click to play)"}
      className="flex h-[14px] items-end gap-[2px]"
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className={`w-[2px] origin-bottom rounded-sm transition-colors ${
            musicOn ? "bg-accent-link" : "bg-statusbar-fg/60"
          }`}
          style={{
            height: "12px",
            animation: `eq-bar ${musicOn ? b.d : "1.8s"} ease-in-out ${b.delay} infinite`,
          }}
        />
      ))}
    </button>
  );
}
