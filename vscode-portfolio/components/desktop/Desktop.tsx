"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { useIsMobile } from "@/lib/useViewport";
import { EditorShell } from "../shell/EditorShell";
import { TopBar } from "./TopBar";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopWidget } from "./DesktopWidget";
import { UrlSync } from "../UrlSync";
import { SketchFilters } from "../easter/SketchFilters";
import { SketchTransition } from "../easter/SketchTransition";

const DESKTOP_BG_DARK =
  "radial-gradient(ellipse at 82% 88%, rgba(119,41,83,0.28) 0%, transparent 52%), radial-gradient(ellipse at 12% 8%, rgba(40,42,54,0.5) 0%, transparent 45%), linear-gradient(135deg, #101013 0%, #0a0a0c 55%, #050506 100%)";

// Paper wallpaper so the desktop behind the window also turns to sketch.
const DESKTOP_BG_SKETCH =
  "repeating-linear-gradient(48deg, rgba(58,47,16,0.035) 0 1px, transparent 1px 6px), radial-gradient(ellipse at 80% 85%, rgba(150,110,55,0.12) 0%, transparent 55%), linear-gradient(135deg, #efe6cf 0%, #e7dbbd 60%, #e0d2af 100%)";

export function Desktop() {
  const windowState = useEditorStore((s) => s.windowState);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const isMobile = useIsMobile();
  const visible = windowState === "normal" || windowState === "maximized";
  const floating = windowState === "normal" && !isMobile;

  useEffect(() => {
    if (isMobile && windowState === "normal") setWindowState("maximized");
  }, [isMobile, windowState, setWindowState]);

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden transition-[background] duration-500"
      style={{ background: sketchMode ? DESKTOP_BG_SKETCH : DESKTOP_BG_DARK }}
    >
      <UrlSync />
      <SketchFilters />
      <SketchTransition />
      {!visible && <TopBar />}

      <div className="relative flex-1 overflow-hidden">
        {!visible && (
          <>
            <DesktopIcons />
            <DesktopWidget />
          </>
        )}
        {visible && (
          <div
            className={clsx(
              "absolute overflow-hidden bg-editor-bg transition-all duration-300",
              floating ? "inset-x-[4%] inset-y-[5%] rounded-lg border border-white/15 shadow-2xl" : "inset-0"
            )}
          >
            <EditorShell rounded={floating} />
          </div>
        )}
      </div>
    </div>
  );
}
