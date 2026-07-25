"use client";

import { fileTree } from "@/lib/fileRegistry";
import { useEditorStore } from "@/lib/store";
import { FileTree } from "./FileTree";
import { AccountPanel } from "./AccountPanel";
import { SettingsPanel } from "./SettingsPanel";
import { SourceControlPanel } from "./SourceControlPanel";
import { RemotePanel } from "./RemotePanel";
import clsx from "clsx";

const titles: Record<string, string> = {
  explorer: "MUKESH-POUDEL",
  account: "ACCOUNT",
  settings: "SETTINGS",
  scm: "SOURCE CONTROL",
  remote: "REMOTE EXPLORER",
};

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const collapsed = useEditorStore((s) => s.sidebarCollapsed);
  const activePanel = useEditorStore((s) => s.activePanel);
  const setSidebarCollapsed = useEditorStore((s) => s.setSidebarCollapsed);

  if (collapsed) return null;

  return (
    <aside
      className={clsx(
        "no-scrollbar shrink-0 overflow-y-auto border-l border-border bg-sidebar-bg text-text-muted",
        mobile ? "absolute right-0 top-0 z-30 h-full w-64 shadow-2xl" : "w-64"
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-1 text-[11px] font-semibold tracking-wide text-text-muted">
        <span>{titles[activePanel]}</span>
        {mobile && (
          <button
            onClick={() => setSidebarCollapsed(true)}
            aria-label="Close sidebar"
            className="flex h-5 w-5 items-center justify-center rounded hover:bg-white/10 hover:text-text-body"
          >
            <svg width="13" height="13" viewBox="0 0 16 16">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      {activePanel === "explorer" && <FileTree root={fileTree} />}
      {activePanel === "account" && <AccountPanel />}
      {activePanel === "settings" && <SettingsPanel />}
      {activePanel === "scm" && <SourceControlPanel />}
      {activePanel === "remote" && <RemotePanel />}
    </aside>
  );
}
