"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { applyTheme } from "@/lib/themes";

export function ThemeManager() {
  const themeId = useEditorStore((s) => s.themeId);

  useEffect(() => {
    applyTheme(themeId);
  }, [themeId]);

  return null;
}
