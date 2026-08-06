"use client";

import { useEffect, useRef, useState } from "react";
import { useEditorStore } from "@/lib/store";
import { themes, themeMap, sketchThemeId } from "@/lib/themes";

const pickerThemes = themes.filter((t) => t.id !== sketchThemeId);

export function ThemePicker() {
  const themeId = useEditorStore((s) => s.themeId);
  const setTheme = useEditorStore((s) => s.setTheme);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = themeMap[themeId];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        title="Color Theme"
        className="flex items-center gap-1.5 hover:text-text-body"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0">
          <path d="M8 1.5A6.5 6.5 0 1 0 8 14.5c.8 0 1.3-.6 1.3-1.3 0-.4-.15-.7-.4-.95-.24-.25-.4-.6-.4-.95 0-.7.6-1.3 1.3-1.3H11a3.5 3.5 0 0 0 3.5-3.5C14.5 4 11.6 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.1" />
          <circle cx="5.3" cy="6.8" r="0.9" fill="currentColor" />
          <circle cx="8" cy="5.2" r="0.9" fill="currentColor" />
          <circle cx="10.7" cy="6.8" r="0.9" fill="currentColor" />
        </svg>
        <span className="hidden md:inline">{current?.name ?? "Theme"}</span>
      </button>

      {open && (
        <div className="absolute bottom-[140%] right-0 z-50 w-56 overflow-hidden rounded-md border border-border bg-panel py-1 shadow-2xl">
          <p className="px-3 py-1 text-[11px] uppercase tracking-wide text-text-muted">Color Theme</p>
          {pickerThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[13px] text-text-body hover:bg-accent-focus/20"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-sm border border-border"
                style={{ backgroundColor: t.tokens["editor-bg"] }}
              />
              <span className="flex-1">{t.name}</span>
              {t.id === themeId && <span className="text-accent-link">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
