"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { useIsMobile } from "@/lib/useViewport";
import { EditorShell } from "../shell/EditorShell";
import { TopBar } from "./TopBar";
import { DesktopIcons } from "./DesktopIcons";
import { DesktopWidget } from "./DesktopWidget";

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
    <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_75%_15%,#772953_0%,#3b1f34_38%,#1a1420_100%)]">
      <TopBar />

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
