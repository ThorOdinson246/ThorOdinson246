"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { useMusic } from "@/lib/audio";

function WifiGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M2 8.5C5 5.5 8.3 4 12 4s7 1.5 10 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5.5 12c1.8-1.8 4-2.7 6.5-2.7s4.7.9 6.5 2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function VolumeGlyph({ on }: { on: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M4 9v6h3.5L13 19V5L7.5 9H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {on ? (
        <path d="M16 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M16.5 9.5l4 5M20.5 9.5l-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg width="24" height="14" viewBox="0 0 26 14" fill="none">
      <rect x="1" y="2" width="20" height="10" rx="2.2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3" y="4" width="8.5" height="6" rx="1" fill="currentColor" />
      <rect x="22.4" y="5" width="1.8" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function TopBar() {
  const windowState = useEditorStore((s) => s.windowState);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const { musicOn, toggle: toggleMusic } = useMusic();
  const [now, setNow] = useState<Date | null>(null);
  const [net, setNet] = useState("0 B/s");
  const [ghz, setGhz] = useState("2.9 GHz");

  useEffect(() => {
    const tick = () => {
      setNow(new Date());
      const kb = Math.floor(Math.random() * 900);
      setNet(kb < 40 ? "0 B/s" : `${kb} B/s`);
      setGhz(`${(2.3 + Math.random() * 1.2).toFixed(1)} GHz`);
    };
    tick();
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, []);

  const clock = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
      "  " +
      now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "";

  const toggleActivities = () =>
    setWindowState(windowState === "minimized" || windowState === "closed" ? "maximized" : "minimized");

  return (
    <div
      className="desk-topbar flex h-7 shrink-0 items-center justify-between bg-[#1b1b1b] px-2 text-[12.5px] font-medium text-white/85"
      style={{ fontFamily: "var(--font-ubuntu), system-ui, sans-serif" }}
    >
      <div className="flex items-center gap-1">
        <button onClick={toggleActivities} className="rounded px-2 py-0.5 hover:bg-white/10">
          Activities
        </button>
        <span className="hidden px-2 text-white/70 sm:inline">Portfolio</span>
      </div>

      <button onClick={() => setWindowState("maximized")} className="rounded px-2 py-0.5 tabular-nums hover:bg-white/10">
        {clock}
      </button>

      <div className="flex items-center gap-2.5 text-white/80">
        <span className="hidden items-center gap-1 tabular-nums md:flex">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v4l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2 8l2-2M14 8l-2-2M2 8l2 2M14 8l-2 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          {net}
        </span>
        <span className="hidden tabular-nums lg:inline">{ghz}</span>
        <span className="hidden tabular-nums lg:inline">60°C</span>
        <span className="hidden tabular-nums lg:inline">6.9 GB</span>
        <WifiGlyph />
        <button
          onClick={toggleMusic}
          title={musicOn ? "Lo-fi: on (click to mute)" : "Lo-fi coding music: click to play"}
          className={musicOn ? "text-accent-link" : "hover:text-white"}
        >
          <VolumeGlyph on={musicOn} />
        </button>
        <span className="flex items-center gap-1">
          <BatteryGlyph />
          <span className="tabular-nums">46%</span>
        </span>
      </div>
    </div>
  );
}
