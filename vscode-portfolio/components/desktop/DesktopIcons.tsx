"use client";

import { useEditorStore } from "@/lib/store";
import { identity } from "@/lib/content/identity";
import { VscodeLogo } from "../shell/VscodeLogo";

function IconTile({
  label,
  onClick,
  href,
  tile,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  tile: string;
  children: React.ReactNode;
}) {
  const body = (
    <div className="flex w-[74px] flex-col items-center gap-1.5">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[16px] text-white shadow-lg ring-1 ring-white/10 transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-105"
        style={{ backgroundImage: tile }}
      >
        {children}
      </div>
      <span className="rounded px-1 text-center text-[12px] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)] group-hover:bg-[#e95420]">
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group" title={label}>
        {body}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="group" title={label}>
      {body}
    </button>
  );
}

function FolderGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M3 6.5h6l1.5 2H21V18H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function DesktopIcons() {
  const openFile = useEditorStore((s) => s.openFile);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);

  function open(id: string) {
    openFile(id);
    setWindowState("maximized");
  }

  return (
    <div className="absolute left-4 top-4 flex flex-col gap-3 sm:left-6 sm:top-6">
      <IconTile label="Portfolio" tile="linear-gradient(145deg,#1f2733,#0d1117)" onClick={() => setWindowState("maximized")}>
        <VscodeLogo size={30} />
      </IconTile>
      <IconTile label="Projects" tile="linear-gradient(145deg,#e95420,#a3310f)" onClick={() => open("projects")}>
        <FolderGlyph />
      </IconTile>
      <IconTile label="Research" tile="linear-gradient(145deg,#2bb0a6,#0f766e)" onClick={() => open("aes-key-recovery")}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M9 3h6M10 3v6l-4.5 8a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </IconTile>
      <IconTile label="Contact" tile="linear-gradient(145deg,#3b82f6,#1e40af)" onClick={() => open("contact")}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconTile>
      <IconTile
        label="Terminal"
        tile="linear-gradient(145deg,#2b2b2b,#000000)"
        onClick={() => {
          setWindowState("maximized");
          toggleTerminal(true);
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 6l5 6-5 6M11 18h9" stroke="#3fb950" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconTile>
      <IconTile label="GitHub" tile="linear-gradient(145deg,#333,#111)" href={identity.github}>
        <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
      </IconTile>
    </div>
  );
}
