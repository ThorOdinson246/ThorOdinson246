import { experience } from "@/lib/content/experience";

export function ExperienceTimeline() {
  return (
    <ol className="relative ml-2 border-l border-border">
      {experience.map((e, i) => (
        <li key={i} className="relative pb-9 pl-6 last:pb-0" data-reveal>
          <span
            className={`absolute -left-[6.5px] top-1.5 h-3 w-3 rounded-full border-2 ${
              e.current ? "border-accent-link bg-accent-link" : "border-border bg-editor-bg"
            }`}
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-[15px] font-semibold text-text-body">
              {e.role}
              {e.current && (
                <span className="ml-2 rounded-full border border-accent-focus/40 bg-accent-focus/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-link">
                  Current
                </span>
              )}
            </h3>
            <span className="font-mono text-[12px] text-text-muted">{e.period}</span>
          </div>

          <p className="mt-0.5 text-[13px] text-accent-link">
            {e.href ? (
              <a href={e.href} target={e.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline">
                {e.org}
              </a>
            ) : (
              e.org
            )}
            {e.location && <span className="text-text-muted"> · {e.location}</span>}
          </p>

          <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{e.summary}</p>

          {e.points && (
            <ul className="mt-2 space-y-1">
              {e.points.map((pt, j) => (
                <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-text-muted">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-text-muted/60" />
                  {pt}
                </li>
              ))}
            </ul>
          )}

          {e.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.tags.map((t) => (
                <span key={t} className="rounded-sm border border-border bg-black/30 px-2 py-0.5 text-[11px] text-text-body">
                  {t}
                </span>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
