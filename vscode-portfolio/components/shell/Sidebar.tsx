"use client";

import { fileTree } from "@/lib/fileRegistry";
import { useEditorStore } from "@/lib/store";
import { FileTree } from "./FileTree";
import clsx from "clsx";

export function Sidebar() {
  const collapsed = useEditorStore((s) => s.sidebarCollapsed);

  return (
    <aside
      className={clsx(
        "shrink-0 overflow-y-auto border-l border-border bg-sidebar-bg text-text-muted",
        collapsed ? "w-0 overflow-hidden border-l-0" : "w-64"
      )}
    >
      <div className="px-4 pt-4 pb-1 text-[11px] font-semibold tracking-wide text-text-muted">
        MUKESH-POUDEL
      </div>
      <FileTree root={fileTree} />
    </aside>
  );
}
