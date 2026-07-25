"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { FileEntry } from "@/lib/fileRegistry";
import { FileIcon } from "./FileIcon";

export function Tab({
  file,
  active,
  onSelect,
  onClose,
}: {
  file: FileEntry;
  active: boolean;
  onSelect: () => void;
  onClose: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      className={clsx(
        "group flex h-9 shrink-0 cursor-pointer items-center gap-2 border-r border-border px-3 text-[13px]",
        active
          ? "border-t-2 border-t-tab-active-border bg-tab-active-bg text-text-body"
          : "border-t-2 border-t-transparent bg-tab-inactive-bg text-text-muted"
      )}
    >
      <FileIcon icon={file.icon} />
      <span className="whitespace-nowrap">{file.name}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-1 flex h-4 w-4 items-center justify-center rounded opacity-0 hover:bg-white/10 group-hover:opacity-100"
      >
        <svg width="12" height="12" viewBox="0 0 16 16">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
