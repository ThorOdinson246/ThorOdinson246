"use client";

import { useEffect, useState } from "react";

function AppleGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M11.03 8.36c-.02-1.6 1.3-2.37 1.36-2.4-.74-1.09-1.9-1.24-2.31-1.25-.98-.1-1.92.58-2.42.58-.5 0-1.27-.57-2.09-.55-1.07.02-2.06.62-2.61 1.58-1.11 1.93-.28 4.78.8 6.34.53.76 1.16 1.62 1.98 1.59.79-.03 1.09-.51 2.05-.51.95 0 1.23.51 2.07.5.85-.02 1.39-.78 1.91-1.55.6-.88.85-1.74.86-1.78-.02-.01-1.65-.63-1.67-2.5zM9.47 3.6c.44-.53.73-1.27.65-2-.63.03-1.39.42-1.84.95-.4.47-.75 1.22-.66 1.94.7.05 1.42-.36 1.85-.89z" />
    </svg>
  );
}

const menus = ["Portfolio", "File", "Edit", "View", "Go", "Window", "Help"];

export function MenuBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const label = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) +
      "  " +
      now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "";

  return (
    <div className="flex h-7 shrink-0 items-center justify-between bg-black/35 px-3 text-[13px] text-white/90 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-white">
          <AppleGlyph />
        </span>
        {menus.map((m, i) => (
          <span key={m} className={i === 0 ? "font-semibold" : "hidden text-white/85 sm:inline"}>
            {m}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="hidden sm:block">
          <path d="M2 8.5C5 5.5 8.3 4 12 4s7 1.5 10 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M5 12c2-2 4.3-3 7-3s5 1 7 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.4" fill="currentColor" />
        </svg>
        <svg width="20" height="14" viewBox="0 0 26 14" fill="none" className="hidden sm:block">
          <rect x="1" y="2" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="3" y="4" width="15" height="6" rx="1" fill="currentColor" />
          <rect x="22.5" y="5" width="1.8" height="4" rx="1" fill="currentColor" />
        </svg>
        <span className="tabular-nums">{label}</span>
      </div>
    </div>
  );
}
