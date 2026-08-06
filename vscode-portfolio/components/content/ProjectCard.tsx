"use client";

import { Project } from "@/lib/content/projects";
import { useEditorStore } from "@/lib/store";

function LinkIcon({ kind }: { kind: Project["links"][number]["icon"] }) {
  if (kind === "github") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    );
  }
  if (kind === "paper") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M4 1h6l3 3v11H4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 7h4M6 9.5h4M6 12h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "npm") {
    return (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 0v16h16V0H0zm13 13h-2V5H8v8H3V3h10v10z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M6.5 3H3v10h10V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 2.5H13.5V6.5M13 3L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const openFile = useEditorStore((s) => s.openFile);

  return (
    <article
      className="flex flex-col overflow-hidden rounded border border-border bg-sidebar-bg transition-colors hover:border-accent-focus/60"
      data-reveal
    >
      <div className="relative aspect-video overflow-hidden border-b border-border bg-black/40">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_30%_20%,rgba(31,111,235,0.18),transparent_60%)]">
            <span className="font-mono text-[15px] text-text-muted">
              <span className="text-accent-link">~/</span>
              {project.slug}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-sm border border-border bg-black/70 px-2 py-0.5 text-[11px] font-medium text-accent-link backdrop-blur">
          {project.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold text-text-body">{project.title}</h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-text-muted">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-sm border border-border bg-black/30 px-2 py-0.5 text-[11px] text-text-body">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.pageTabId && (
            <button
              onClick={() => openFile(project.pageTabId!)}
              className="flex items-center gap-2 rounded-sm bg-accent-focus px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 4.5h12M2 8h12M2 11.5h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              View full page
            </button>
          )}
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-sm border border-border bg-black/30 px-3 py-1.5 text-[12px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
            >
              <LinkIcon kind={link.icon} />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
