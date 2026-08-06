"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { applyTheme } from "@/lib/themes";

export function ThemeManager() {
  const themeId = useEditorStore((s) => s.themeId);
  const sketchMode = useEditorStore((s) => s.sketchMode);

  useEffect(() => {
    // Morph the theme colors smoothly: enable transitions, force a reflow so the
    // browser commits the current values as the animation baseline, then swap.
    const root = document.documentElement;
    root.classList.add("theme-morphing");
    void root.offsetWidth;
    applyTheme(themeId);
    const id = setTimeout(() => root.classList.remove("theme-morphing"), 650);
    return () => clearTimeout(id);
  }, [themeId]);

  useEffect(() => {
    const root = document.documentElement;
    if (sketchMode) root.setAttribute("data-sketch", "");
    else root.removeAttribute("data-sketch");
  }, [sketchMode]);

  return null;
}
