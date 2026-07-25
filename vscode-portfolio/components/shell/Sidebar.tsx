"use client";

import { fileTree } from "@/lib/fileRegistry";
import { useEditorStore } from "@/lib/store";
import { FileTree } from "./FileTree";
import { AccountPanel } from "./AccountPanel";
import { SettingsPanel } from "./SettingsPanel";
import clsx from "clsx";

const titles: Record<string, string> = {
  explorer: "MUKESH-POUDEL",
  account: "ACCOUNT",
  settings: "SETTINGS",
};

export function Sidebar() {
  const collapsed = useEditorStore((s) => s.sidebarCollapsed);
  const activePanel = useEditorStore((s) => s.activePanel);

  return (
    <aside
      className={clsx(
        "no-scrollbar shrink-0 overflow-y-auto border-l border-border bg-sidebar-bg text-text-muted",
        collapsed ? "w-0 overflow-hidden border-l-0" : "w-64"
      )}
    >
      <div className="px-4 pt-4 pb-1 text-[11px] font-semibold tracking-wide text-text-muted">
        {titles[activePanel]}
      </div>
      {activePanel === "explorer" && <FileTree root={fileTree} />}
      {activePanel === "account" && <AccountPanel />}
      {activePanel === "settings" && <SettingsPanel />}
    </aside>
  );
}
