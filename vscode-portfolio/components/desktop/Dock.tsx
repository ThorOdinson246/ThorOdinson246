"use client";

import { useEditorStore } from "@/lib/store";
import { identity } from "@/lib/content/identity";

function DockItem({
  title,
  onClick,
  href,
  active,
  children,
}: {
  title: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const inner = (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
        {title}
      </span>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-150 group-hover:-translate-y-1.5 group-hover:scale-110">
        {children}
      </div>
      <span className={`mt-0.5 h-1 w-1 rounded-full bg-white/80 ${active ? "opacity-100" : "opacity-0"}`} />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" title={title}>
        {inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} title={title}>
      {inner}
    </button>
  );
}

function VscodeIcon() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#0d1117] to-[#010409] shadow-lg ring-1 ring-white/10">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17 3l4 2v14l-4 2-9-8 9-8z" fill="#58a6ff" opacity="0.9" />
        <path d="M17 3v18l-9-8 9-10z" fill="#1f6feb" />
        <path d="M3 8.5L6 7l5 5-5 5-3-1.5v-7z" fill="#8b949e" />
      </svg>
    </div>
  );
}

function CircleIcon({ from, to, children }: { from: string; to: string; children: React.ReactNode }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-xl text-white shadow-lg ring-1 ring-white/10"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {children}
    </div>
  );
}

export function Dock() {
  const windowState = useEditorStore((s) => s.windowState);
  const setWindowState = useEditorStore((s) => s.setWindowState);
  const open = windowState !== "closed" && windowState !== "minimized";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-30 flex justify-center">
      <div className="pointer-events-auto flex items-end gap-3 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-xl">
        <DockItem title="Portfolio" onClick={() => setWindowState("maximized")} active={open}>
          <VscodeIcon />
        </DockItem>
        <DockItem title="GitHub" href={identity.github}>
          <CircleIcon from="#333" to="#111">
            <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </CircleIcon>
        </DockItem>
        <DockItem title="LinkedIn" href={identity.linkedin}>
          <CircleIcon from="#0a66c2" to="#004182">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
            </svg>
          </CircleIcon>
        </DockItem>
        <DockItem title="Email" href={`mailto:${identity.email}`}>
          <CircleIcon from="#38bdf8" to="#0284c7">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CircleIcon>
        </DockItem>
      </div>
    </div>
  );
}
