"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { useIsMobile } from "@/lib/useViewport";
import { EditorShell } from "../shell/EditorShell";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";

export function Desktop() {
  const windowState = useEditorStore((s) => s.windowState);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const isMobile = useIsMobile();
  const visible = windowState === "normal" || windowState === "maximized";
  const floating = windowState === "normal" && !isMobile;

  useEffect(() => {
    if (isMobile && windowState === "normal") setWindowState("maximized");
  }, [isMobile, windowState, setWindowState]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_25%_15%,#15263f_0%,#0a1120_45%,#05070d_100%)]">
      <MenuBar />

      <div className="relative flex-1 overflow-hidden">
        {!visible && <DesktopIcons />}
        {visible && (
          <div
            className={clsx(
              "absolute overflow-hidden bg-editor-bg transition-all duration-300",
              floating
                ? "inset-x-[4%] inset-y-[5%] rounded-lg border border-white/15 shadow-2xl"
                : "inset-0"
            )}
          >
            <EditorShell rounded={floating} />
          </div>
        )}
      </div>

      {!visible && <Dock />}
    </div>
  );
}
