"use client";

import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";

function TrafficLight({ color, symbol, onClick, title }: { color: string; symbol: string; onClick: () => void; title: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="group flex h-3 w-3 items-center justify-center rounded-full"
      style={{ backgroundColor: color }}
    >
      <span className="text-[8px] font-bold leading-none text-black/60 opacity-0 group-hover:opacity-100">{symbol}</span>
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
    <header className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-titlebar-bg px-3 text-[13px] text-text-muted">
      <div className="flex items-center gap-2">
        <TrafficLight color="#ff5f57" symbol="×" title="Close" onClick={() => setWindowState("closed")} />
        <TrafficLight color="#febc2e" symbol="−" title="Minimize" onClick={() => setWindowState("minimized")} />
        <TrafficLight
          color="#28c840"
          symbol="+"
          title={windowState === "maximized" ? "Restore" : "Maximize"}
          onClick={() => setWindowState(windowState === "maximized" ? "normal" : "maximized")}
        />
      </div>
      <button
        onClick={() => togglePalette(true)}
        className="min-w-[40%] rounded bg-white/5 px-3 py-0.5 text-center text-[12px] text-text-muted transition-colors hover:bg-white/10"
      >
        {activeFile ? `mukesh-poudel — ${activeFile.name}` : "mukesh-poudel"}
      </button>
      <div className="w-[54px]" />
    </header>
  );
}
