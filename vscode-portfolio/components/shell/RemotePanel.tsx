const targets = ["magnolia.usm.edu", "localhost", "wsl: Ubuntu"];

export function RemotePanel() {
  return (
    <div className="py-2">
      <p className="px-4 pb-1 pt-1 text-[11px] uppercase tracking-wide text-text-muted">SSH Targets</p>
      {targets.map((t) => (
        <div key={t} className="flex items-center gap-2 px-4 py-1.5 text-[13px] text-text-body hover:bg-white/5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-text-muted">
            <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {t}
        </div>
      ))}
    </div>
  );
}
