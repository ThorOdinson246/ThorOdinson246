"use client";

import { useEditorStore } from "@/lib/store";
import clsx from "clsx";

function ExplorerGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 5.5h6l1.5 2H20v11H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function SearchGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GitGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="18" r="2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8v8M8 8c0 4 4 4 7 4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function ExtensionsGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 5a2 2 0 1 1 4 0v1.5H20a1 1 0 0 1 1 1V10a2 2 0 1 0 0 4v2.5a1 1 0 0 1-1 1h-2.5A2 2 0 1 0 13.5 21H10a1 1 0 0 1-1-1v-2.5a2 2 0 1 0 0-4V10a1 1 0 0 1 1-1h4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActivityBar() {
  const sidebarCollapsed = useEditorStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useEditorStore((s) => s.toggleSidebar);

  return (
    <nav className="flex w-12 shrink-0 flex-col items-center justify-between border-l border-border bg-activitybar-bg py-2">
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={toggleSidebar}
          title="Explorer"
          className={clsx(
            "flex h-11 w-11 items-center justify-center border-l-2",
            !sidebarCollapsed ? "border-l-accent-link text-text-body" : "border-l-transparent text-text-muted"
          )}
        >
          <ExplorerGlyph />
        </button>
        <button title="Search" className="flex h-11 w-11 items-center justify-center border-l-2 border-l-transparent text-text-muted opacity-60">
          <SearchGlyph />
        </button>
        <button title="Source Control" className="flex h-11 w-11 items-center justify-center border-l-2 border-l-transparent text-text-muted opacity-60">
          <GitGlyph />
        </button>
        <button title="Extensions" className="flex h-11 w-11 items-center justify-center border-l-2 border-l-transparent text-text-muted opacity-60">
          <ExtensionsGlyph />
        </button>
      </div>
    </nav>
  );
}
