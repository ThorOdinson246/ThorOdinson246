"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { files } from "@/lib/fileRegistry";
import { useEditorStore } from "@/lib/store";
import { FileIcon } from "./FileIcon";

export function CommandPalette() {
  const paletteOpen = useEditorStore((s) => s.paletteOpen);
  const togglePalette = useEditorStore((s) => s.togglePalette);
  const openFile = useEditorStore((s) => s.openFile);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(() => new Fuse(files, { keys: ["name", "folder"], threshold: 0.4 }), []);

  const results = useMemo(() => {
    if (!query.trim()) return files;
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  function close() {
    togglePalette(false);
    setQuery("");
    setActiveIndex(0);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "p") {
        e.preventDefault();
        togglePalette(true);
      } else if (e.key === "Escape") {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focusing an already-mounted input in response to a prop change is a pure
  // DOM side effect (no setState), which is exactly what effects are for.
  useEffect(() => {
    if (paletteOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [paletteOpen]);

  if (!paletteOpen) return null;

  function selectFile(id: string) {
    openFile(id);
    close();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-24" onClick={close}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-md border border-border bg-[#161b22] shadow-2xl"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" && results[activeIndex]) {
              selectFile(results[activeIndex].id);
            }
          }}
          placeholder="Go to file..."
          className="w-full border-b border-border bg-transparent px-4 py-3 text-[14px] text-text-body outline-none placeholder:text-text-muted"
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {results.map((file, i) => (
            <button
              key={file.id}
              onClick={() => selectFile(file.id)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-[13px] ${
                i === activeIndex ? "bg-white/10 text-text-body" : "text-text-muted"
              }`}
            >
              <FileIcon icon={file.icon} />
              <span>{file.name}</span>
              {file.folder && <span className="text-[11px] text-text-muted/70">{file.folder}</span>}
            </button>
          ))}
          {results.length === 0 && <div className="px-4 py-3 text-[13px] text-text-muted">No matching files</div>}
        </div>
      </div>
    </div>
  );
}
