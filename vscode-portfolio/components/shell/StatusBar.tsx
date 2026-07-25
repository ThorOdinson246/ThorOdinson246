"use client";

import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";
import { ThemePicker } from "./ThemePicker";

function BranchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
      <circle cx="4" cy="3" r="1.6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="4" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M4 4.6V11.4M4 6c0 3 3 3 6 3" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function CopilotIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
      <path
        d="M8 2c-2.8 0-4.5 1.8-4.5 4.2 0 1 .3 1.7.3 1.7S2 8.6 2 10.5C2 12.6 3.6 14 5.6 14c.8 0 1.4-.3 1.9-.6.3.2.9.6 1.5.6.6 0 1.2-.4 1.5-.6.5.3 1.1.6 1.9.6 2 0 3.6-1.4 3.6-3.5 0-1.9-1.8-2.6-1.8-2.6s.3-.7.3-1.7C14.5 3.8 12.8 2 10 2H8z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" className="shrink-0">
      <path d="M8 2a3 3 0 0 0-3 3v2c0 1-.5 1.8-1 2.5h8c-.5-.7-1-1.5-1-2.5V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
      <path d="M6.5 11.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.1" fill="none" />
    </svg>
  );
}

export function StatusBar() {
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const activeFile = activeTabId ? fileMap[activeTabId] : null;
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);

  return (
    <footer className="flex h-[22px] shrink-0 items-center justify-between border-l border-border bg-statusbar-bg px-2 text-[12px] text-statusbar-fg">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <BranchIcon />
          main
        </span>
        <button onClick={() => toggleTerminal()} title="Toggle Terminal (Ctrl+`)" className="flex items-center gap-1 hover:text-text-body">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M4 6l2 2-2 2M8 10h3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">zsh</span>
        </button>
        <span className="hidden items-center gap-1 sm:flex">
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M8 2l1.5 5H14l-3.7 3 1.4 5-3.7-3-3.7 3 1.4-5L2 7h4.5z" fill="none" stroke="currentColor" strokeWidth="0.9" /></svg>
        </span>
        <span className="hidden sm:inline">0 ↓ 0 ↑</span>
        <span className="flex items-center gap-1 text-diag-warning">⚠ 0</span>
        <span className="flex items-center gap-1 text-diag-error">⊘ 0</span>
      </div>
      <div className="flex items-center gap-3">
        {activeFile && (
          <>
            <span className="hidden sm:inline">Ln 1, Col 1</span>
            <span className="hidden sm:inline">Spaces: 2</span>
            <span className="hidden sm:inline">UTF-8</span>
            <span>{activeFile.language}</span>
          </>
        )}
        <ThemePicker />
        <span className="flex items-center gap-1">
          <CopilotIcon />
        </span>
        <BellIcon />
      </div>
    </footer>
  );
}
