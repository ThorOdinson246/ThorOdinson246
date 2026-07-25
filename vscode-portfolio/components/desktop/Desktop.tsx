"use client";

import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { EditorShell } from "../shell/EditorShell";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";

function ReopenHint() {
  const setWindowState = useEditorStore((s) => s.setWindowState);
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-lg font-medium text-white/90">Mukesh Poudel</p>
      <button
        onClick={() => setWindowState("maximized")}
        className="rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-[14px] text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        Open Portfolio
      </button>
    </div>
  );
}

export function Desktop() {
  const windowState = useEditorStore((s) => s.windowState);
  const visible = windowState === "normal" || windowState === "maximized";

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_20%_20%,#1e3a5f_0%,#0b1220_45%,#05070d_100%)]">
      <MenuBar />

      <div className="relative flex-1 overflow-hidden">
        {visible ? (
          <div
            className={clsx(
              "absolute overflow-hidden bg-editor-bg transition-all duration-300",
              windowState === "maximized"
                ? "inset-0"
                : "inset-x-[4%] inset-y-[5%] rounded-xl border border-white/15 shadow-2xl"
            )}
          >
            <EditorShell rounded={windowState === "normal"} />
          </div>
        ) : (
          <ReopenHint />
        )}
      </div>

      <Dock />
    </div>
  );
}
