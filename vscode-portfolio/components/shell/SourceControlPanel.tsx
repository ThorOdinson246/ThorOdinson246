import { identity } from "@/lib/content/identity";

export function SourceControlPanel() {
  return (
    <div className="px-4 py-3 text-[13px]">
      <p className="mb-2 text-text-body">ThorOdinson246 / portfolio</p>
      <div className="space-y-1 text-text-muted">
        <p>Branch: <span className="text-text-body">master</span></p>
        <p>Working tree: <span className="text-text-body">clean</span></p>
        <p>0 changes</p>
      </div>
      <a
        href={identity.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block rounded-sm border border-border bg-black/30 px-3 py-1.5 text-[12px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
      >
        Open on GitHub
      </a>
    </div>
  );
}
