const extensions: [string, string][] = [
  ["GitLens", "eamodio"],
  ["GitHub Copilot", "GitHub"],
  ["Python", "Microsoft"],
  ["Pylance", "Microsoft"],
  ["Jupyter", "Microsoft"],
  ["C/C++", "Microsoft"],
  ["Dart", "Dart Code"],
  ["Flutter", "Dart Code"],
  ["Remote - SSH", "Microsoft"],
  ["Error Lens", "Alexander"],
  ["Prettier", "Prettier"],
  ["Rainbow CSV", "mechatroner"],
  ["Material Icon Theme", "Philipp Kief"],
  ["LaTeX Workshop", "James Yu"],
];

export function ExtensionsPanel() {
  return (
    <div className="py-2">
      {extensions.map(([name, pub]) => (
        <div key={name} className="flex items-center gap-3 px-4 py-2 hover:bg-white/5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border bg-black/30 text-[11px] font-semibold text-text-muted">
            {name.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] text-text-body">{name}</p>
            <p className="truncate text-[11px] text-text-muted">{pub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
