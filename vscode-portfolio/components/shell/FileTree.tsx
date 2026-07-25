"use client";

import { FolderNode, fileMap } from "@/lib/fileRegistry";
import { useEditorStore } from "@/lib/store";
import { FileIcon } from "./FileIcon";
import clsx from "clsx";

function FolderRow({ node, depth }: { node: FolderNode; depth: number }) {
  const expanded = useEditorStore((s) => s.expandedFolders.has(node.id));
  const toggleFolder = useEditorStore((s) => s.toggleFolder);

  return (
    <div>
      <button
        onClick={() => toggleFolder(node.id)}
        className="flex w-full items-center gap-1.5 px-2 py-[3px] text-left text-[13px] text-text-body hover:bg-white/5"
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <ChevronIcon expanded={expanded} />
        <FileIcon icon={expanded ? "folder-open" : "folder"} />
        <span>{node.name}</span>
      </button>
      {expanded && (
        <div>
          {node.children.map((child) =>
            typeof child === "string" ? (
              <FileRow key={child} fileId={child} depth={depth + 1} />
            ) : (
              <FolderRow key={child.id} node={child} depth={depth + 1} />
            )
          )}
        </div>
      )}
    </div>
  );
}

function FileRow({ fileId, depth }: { fileId: string; depth: number }) {
  const file = fileMap[fileId];
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const openFile = useEditorStore((s) => s.openFile);
  const setSidebarCollapsed = useEditorStore((s) => s.setSidebarCollapsed);
  if (!file) return null;
  const active = activeTabId === fileId;

  function handleOpen() {
    openFile(fileId);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches) {
      setSidebarCollapsed(true);
    }
  }

  return (
    <button
      onClick={handleOpen}
      className={clsx(
        "flex w-full items-center gap-1.5 px-2 py-[3px] text-left text-[13px] hover:bg-white/5",
        active ? "bg-white/10 text-text-body" : "text-text-muted"
      )}
      style={{ paddingLeft: 8 + depth * 12 + 14 }}
    >
      <FileIcon icon={file.icon} />
      <span className="truncate">{file.name}</span>
    </button>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={clsx("shrink-0 transition-transform text-text-muted", expanded && "rotate-90")}
    >
      <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FileTree({ root }: { root: FolderNode }) {
  return (
    <div className="py-2">
      {root.children.map((child) =>
        typeof child === "string" ? (
          <FileRow key={child} fileId={child} depth={0} />
        ) : (
          <FolderRow key={child.id} node={child} depth={0} />
        )
      )}
    </div>
  );
}
