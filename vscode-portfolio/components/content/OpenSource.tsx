"use client";

import { contributions } from "@/lib/content/opensource";
import { identity } from "@/lib/content/identity";
import { useReveal } from "@/lib/useReveal";

export function OpenSource() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
      <p className="mb-2 font-mono text-[13px] text-text-muted">{"// open-source.tsx"}</p>
      <h1 className="text-3xl font-semibold text-text-body">Open Source</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-text-muted">
        Beyond my own repos, I contribute to open-source projects I use. A few highlights below.
      </p>

      <div className="mt-10 space-y-5">
        {contributions.map((c) => (
          <a
            key={c.repo}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded border border-border bg-sidebar-bg p-5 transition-colors hover:border-accent-focus/60"
            data-reveal
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h2 className="text-[15px] font-semibold text-accent-link">{c.repo}</h2>
              <span className="font-mono text-[12px] text-text-muted">
                {c.prs} merged PR{c.prs > 1 ? "s" : ""} · {c.language}
              </span>
            </div>
            <p className="mt-2 text-[13px] text-text-muted">{c.description}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-text-body">{c.work}</p>
          </a>
        ))}
      </div>

      <a
        href={`${identity.github}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-sm border border-border bg-black/30 px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        See all repositories &amp; contributions on GitHub
      </a>
    </div>
  );
}
