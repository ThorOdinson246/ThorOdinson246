"use client";

import { useEditorStore } from "@/lib/store";
import { identity } from "@/lib/content/identity";
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
function SourceControlGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8.2v7.6M17 11.2c0 3.3-3 3.8-6 3.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function RemoteGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 8l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GitHubGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function LinkedInGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
    </svg>
  );
}
function MailGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AccountGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function SettingsGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function BarButton({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={clsx(
        "flex h-11 w-12 shrink-0 items-center justify-center border-l-2 transition-colors",
        active ? "border-l-accent-link text-text-body" : "border-l-transparent text-text-muted hover:text-text-body"
      )}
    >
      {children}
    </button>
  );
}

function BarLink({ href, title, children }: { href: string; title: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      title={title}
      className="flex h-11 w-12 shrink-0 items-center justify-center border-l-2 border-l-transparent text-text-muted transition-colors hover:text-text-body"
    >
      {children}
    </a>
  );
}

export function ActivityBar() {
  const sidebarCollapsed = useEditorStore((s) => s.sidebarCollapsed);
  const activePanel = useEditorStore((s) => s.activePanel);
  const setPanel = useEditorStore((s) => s.setPanel);
  const togglePalette = useEditorStore((s) => s.togglePalette);

  const explorerActive = activePanel === "explorer" && !sidebarCollapsed;

  return (
    <nav className="no-scrollbar flex w-12 shrink-0 flex-col items-center justify-between gap-2 overflow-y-auto border-l border-border bg-activitybar-bg py-1.5">
      <div className="flex flex-col items-center">
        <BarButton active={explorerActive} onClick={() => setPanel("explorer")} title="Explorer">
          <ExplorerGlyph />
        </BarButton>
        <BarButton onClick={() => togglePalette(true)} title="Search files (Ctrl+P)">
          <SearchGlyph />
        </BarButton>
        <BarButton active={activePanel === "scm" && !sidebarCollapsed} onClick={() => setPanel("scm")} title="Source Control">
          <SourceControlGlyph />
        </BarButton>
        <BarButton active={activePanel === "remote" && !sidebarCollapsed} onClick={() => setPanel("remote")} title="Remote Explorer">
          <RemoteGlyph />
        </BarButton>
      </div>

      <div className="flex flex-col items-center">
        <BarLink href={identity.github} title="GitHub">
          <GitHubGlyph />
        </BarLink>
        <BarLink href={identity.linkedin} title="LinkedIn">
          <LinkedInGlyph />
        </BarLink>
        <BarLink href={`mailto:${identity.email}`} title="Email">
          <MailGlyph />
        </BarLink>
        <BarButton active={activePanel === "account" && !sidebarCollapsed} onClick={() => setPanel("account")} title="Account">
          <AccountGlyph />
        </BarButton>
        <BarButton active={activePanel === "settings" && !sidebarCollapsed} onClick={() => setPanel("settings")} title="Settings">
          <SettingsGlyph />
        </BarButton>
      </div>
    </nav>
  );
}
