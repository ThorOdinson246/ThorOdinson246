"use client";

import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";
import { VscodeLogo } from "./VscodeLogo";

function WindowButton({
  onClick,
  title,
  danger,
  children,
}: {
  onClick: () => void;
  title: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-text-body transition-colors ${
        danger ? "hover:bg-[#e01b24] hover:text-white" : "hover:bg-white/20"
      }`}
    >
      {children}
    </button>
  );
}

export function TitleBar() {
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const togglePalette = useEditorStore((s) => s.togglePalette);
  const windowState = useEditorStore((s) => s.windowState);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const activeFile = activeTabId ? fileMap[activeTabId] : null;

  return (
    <header className="flex h-8 shrink-0 items-center justify-between gap-2 overflow-hidden border-b border-border bg-titlebar-bg px-3 text-[13px] text-text-muted">
      <div className="flex shrink-0 items-center gap-2">
        <VscodeLogo size={16} />
        <span className="hidden text-text-muted sm:inline">Portfolio</span>
      </div>

      <button
        onClick={() => togglePalette(true)}
        className="min-w-0 max-w-md flex-1 truncate whitespace-nowrap rounded bg-white/5 px-3 py-0.5 text-center text-[12px] text-text-muted transition-colors hover:bg-white/10"
      >
        {activeFile ? `mukesh-poudel — ${activeFile.name}` : "mukesh-poudel"}
      </button>

      <div className="flex shrink-0 items-center justify-end gap-2">
        <WindowButton onClick={() => setWindowState("minimized")} title="Minimize">
          <svg width="10" height="10" viewBox="0 0 16 16">
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </WindowButton>
        <WindowButton
          onClick={() => setWindowState(windowState === "maximized" ? "normal" : "maximized")}
          title={windowState === "maximized" ? "Restore" : "Maximize"}
        >
          <svg width="10" height="10" viewBox="0 0 16 16">
            <rect x="3.5" y="3.5" width="9" height="9" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </WindowButton>
        <WindowButton onClick={() => setWindowState("closed")} title="Close" danger>
          <svg width="10" height="10" viewBox="0 0 16 16">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </WindowButton>
      </div>
    </header>
  );
}
