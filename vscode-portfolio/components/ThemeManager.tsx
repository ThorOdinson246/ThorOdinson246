"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { applyTheme } from "@/lib/themes";

export function ThemeManager() {
  const themeId = useEditorStore((s) => s.themeId);
  const sketchMode = useEditorStore((s) => s.sketchMode);

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  useEffect(() => {
    const root = document.documentElement;
    if (sketchMode) root.setAttribute("data-sketch", "");
    else root.removeAttribute("data-sketch");
  }, [sketchMode]);

  return null;
}
