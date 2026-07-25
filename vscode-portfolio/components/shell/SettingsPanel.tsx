const settings: [string, string][] = [
  ["Color Theme", "GitHub Dark Colorblind (Beta)"],
  ["File Icon Theme", "Material Icon Theme (Palenight)"],
  ["Primary Side Bar", "Right"],
  ["Title Bar Style", "Custom"],
  ["Editor Font", "System monospace"],
  ["Files: Auto Save", "afterDelay"],
  ["Git: Autofetch", "Enabled"],
];

export function SettingsPanel() {
  return (
    <div className="py-2">
      <p className="px-4 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-text-muted">Settings</p>
      <div className="divide-y divide-border/60">
        {settings.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5 px-4 py-2.5">
            <span className="text-[13px] text-text-body">{label}</span>
            <span className="text-[12px] text-text-muted">{value}</span>
          </div>
        ))}
      </div>
      <p className="px-4 pt-4 text-[11px] leading-relaxed text-text-muted/70">
        These mirror my actual VSCode configuration, recreated for the browser.
      </p>
    </div>
  );
}
