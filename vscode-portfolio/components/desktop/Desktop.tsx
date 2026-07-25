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
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 82% 88%, rgba(119,41,83,0.28) 0%, transparent 52%), radial-gradient(ellipse at 12% 8%, rgba(40,42,54,0.5) 0%, transparent 45%), linear-gradient(135deg, #101013 0%, #0a0a0c 55%, #050506 100%)",
      }}
    >
      <UrlSync />
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
