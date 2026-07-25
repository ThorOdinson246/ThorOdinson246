"use client";

import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";

export function TitleBar() {
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const togglePalette = useEditorStore((s) => s.togglePalette);
  const activeFile = activeTabId ? fileMap[activeTabId] : null;

  return (
    <header className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-titlebar-bg px-3 text-[13px] text-text-muted">
      <div className="flex items-center gap-2">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
      </div>
      <button
        onClick={() => togglePalette(true)}
        className="min-w-[40%] rounded bg-white/5 px-3 py-0.5 text-center text-[12px] text-text-muted hover:bg-white/10"
      >
        {activeFile ? `mukesh-poudel — ${activeFile.name}` : "mukesh-poudel"}
      </button>
      <div className="w-[72px]" />
    </header>
  );
}
