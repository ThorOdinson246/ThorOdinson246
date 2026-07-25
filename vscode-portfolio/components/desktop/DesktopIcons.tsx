"use client";

import { useEditorStore } from "@/lib/store";
import { identity } from "@/lib/content/identity";
import { VscodeLogo } from "../shell/VscodeLogo";

function IconTile({
  label,
  onClick,
  href,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <div className="flex w-20 flex-col items-center gap-1.5">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-colors group-hover:bg-white/20">
        {children}
      </div>
      <span className="rounded px-1 text-center text-[12px] text-white/90 group-hover:bg-accent-focus/70">{label}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group">
        {body}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="group">
      {body}
    </button>
  );
}

function FolderGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M3 6.5h6l1.5 2H21v9H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function DesktopIcons() {
  const openFile = useEditorStore((s) => s.openFile);
  const setWindowState = useEditorStore((s) => s.setWindowState);

  function open(id: string) {
    openFile(id);
    setWindowState("maximized");
  }

  return (
    <div className="absolute left-4 top-4 flex flex-col gap-4 sm:left-6 sm:top-6">
      <IconTile label="Portfolio" onClick={() => setWindowState("maximized")}>
        <VscodeLogo size={28} />
      </IconTile>
      <IconTile label="Projects" onClick={() => open("projects")}>
        <FolderGlyph />
      </IconTile>
      <IconTile label="Research" onClick={() => open("aes-key-recovery")}>
        <FolderGlyph />
      </IconTile>
      <IconTile label="Contact" onClick={() => open("contact")}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconTile>
      <IconTile label="GitHub" href={identity.github}>
        <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </IconTile>
    </div>
  );
}
