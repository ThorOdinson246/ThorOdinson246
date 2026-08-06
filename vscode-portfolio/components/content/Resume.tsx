"use client";

import { education, publication, awards, highlightBullets } from "@/lib/content/highlights";
import { useReveal } from "@/lib/useReveal";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-9 text-sm font-semibold uppercase tracking-widest text-text-muted" data-reveal>
      {children}
    </h2>
  );
}

export function Resume() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
      <p className="mb-2 font-mono text-[13px] text-text-muted">{"// resume.md"}</p>
      <h1 className="text-3xl font-semibold text-text-body">Highlights</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-text-muted">
        A quick brag sheet — the things I&apos;m most proud of.
      </p>

      <SectionTitle>Selected Wins</SectionTitle>
      <ul className="space-y-2">
        {highlightBullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-text-body" data-reveal>
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-link" />
            {b}
          </li>
        ))}
      </ul>

      <SectionTitle>Education</SectionTitle>
      <div className="rounded border border-border bg-sidebar-bg p-5" data-reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-[15px] font-semibold text-text-body">{education.school}</h3>
          <span className="font-mono text-[12px] text-text-muted">{education.period}</span>
        </div>
        <p className="mt-1 text-[13px] text-accent-link">{education.degree}</p>
        <p className="mt-2 text-[13px] text-text-muted">{education.detail}</p>
      </div>

      <SectionTitle>Publication</SectionTitle>
      <div className="rounded border border-border bg-sidebar-bg p-5 text-[13px] leading-relaxed text-text-muted" data-reveal>
        {publication.citation}{" "}
        <a href={publication.href} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
          {publication.hrefLabel}
        </a>
      </div>

      <SectionTitle>Honors &amp; Awards</SectionTitle>
      <div className="space-y-3">
        {awards.map((a, i) => (
          <div key={i} className="flex gap-3" data-reveal>
            <span className="mt-0.5 font-mono text-[12px] text-text-muted">{a.year}</span>
            <div>
              <p className="text-[14px] text-text-body">{a.title}</p>
              <p className="text-[12px] text-text-muted">
                {a.org}
                {a.note && <span> · {a.note}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
