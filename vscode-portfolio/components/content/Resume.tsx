"use client";

import { identity } from "@/lib/content/identity";
import { education, publications, awards, selectedWork } from "@/lib/content/highlights";
import { experience } from "@/lib/content/experience";
import { skillGroups } from "@/lib/content/skills";
import { softwareProjects, researchProjects } from "@/lib/content/projects";
import { useReveal } from "@/lib/useReveal";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-10 border-b border-border pb-1.5 text-sm font-semibold uppercase tracking-widest text-text-muted" data-reveal>
      {children}
    </h2>
  );
}

function ContactLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
      {children}
    </a>
  );
}

const resumeProjects = [...softwareProjects.slice(0, 4), ...researchProjects.slice(0, 2)];

export function Resume() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-12">
      <p className="mb-4 font-mono text-[13px] text-text-muted">{"// resume.md"}</p>

      {/* header */}
      <header data-reveal>
        <h1 className="text-3xl font-semibold text-text-body sm:text-4xl">{identity.name}</h1>
        <p className="mt-1.5 text-[14px] text-text-muted">{identity.tagline}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-text-muted">
          <ContactLink href={`mailto:${identity.email}`}>{identity.email}</ContactLink>
          <span className="text-border">·</span>
          <ContactLink href={identity.github}>github.com/ThorOdinson246</ContactLink>
          <span className="text-border">·</span>
          <ContactLink href={identity.linkedin}>LinkedIn</ContactLink>
          <span className="text-border">·</span>
          <span>Hattiesburg, MS</span>
        </div>
      </header>

      <SectionTitle>Summary</SectionTitle>
      <p className="text-[14px] leading-relaxed text-text-muted" data-reveal>
        {identity.intro}
      </p>

      <SectionTitle>Education</SectionTitle>
      <div data-reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-[15px] font-semibold text-text-body">{education.school}</h3>
          <span className="font-mono text-[12px] text-text-muted">{education.period}</span>
        </div>
        <p className="mt-1 text-[13px] text-accent-link">{education.degree}</p>
        <p className="mt-1 text-[13px] text-text-muted">{education.detail}</p>
      </div>

      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-6">
        {experience.map((e, i) => (
          <div key={i} data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-[15px] font-semibold text-text-body">
                {e.role}
                {e.current && (
                  <span className="ml-2 rounded-full bg-git-added/15 px-2 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide text-git-added">
                    Current
                  </span>
                )}
              </h3>
              <span className="font-mono text-[12px] text-text-muted">{e.period}</span>
            </div>
            <p className="mt-0.5 text-[13px] text-accent-link">
              {e.org}
              {e.location && <span className="text-text-muted"> · {e.location}</span>}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{e.summary}</p>
            {e.points && (
              <ul className="mt-2 space-y-1.5">
                {e.points.map((p, j) => (
                  <li key={j} className="flex gap-2 text-[13px] leading-relaxed text-text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Selected Projects</SectionTitle>
      <div className="space-y-4">
        {resumeProjects.map((p) => (
          <div key={p.slug} data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-[14px] font-semibold text-text-body">{p.title}</h3>
              <span className="font-mono text-[11px] text-text-muted">{p.tech.slice(0, 4).join(" · ")}</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{p.description}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Publications</SectionTitle>
      <div className="space-y-4">
        {publications.map((p, i) => (
          <div key={i} data-reveal>
            <span className="mb-1.5 inline-block rounded-full border border-accent-focus/40 bg-accent-focus/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent-link">
              {p.status}
            </span>
            <p className="text-[13px] leading-relaxed text-text-muted">{p.citation}</p>
            {p.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent-link hover:underline">
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Skills</SectionTitle>
      <div className="space-y-3" data-reveal>
        {skillGroups.map((g) => (
          <div key={g.category} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
            <span className="w-full shrink-0 text-[12px] font-semibold text-text-body sm:w-44">{g.category}</span>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it} className="rounded border border-border bg-sidebar-bg px-2 py-0.5 text-[12px] text-text-muted">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Honors &amp; Awards</SectionTitle>
      <div className="space-y-3">
        {awards.map((a, i) => (
          <div key={i} className="flex gap-3" data-reveal>
            <span className="mt-0.5 shrink-0 font-mono text-[12px] text-text-muted">{a.year}</span>
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

      {selectedWork.length > 0 && (
        <>
          <SectionTitle>Selected Work</SectionTitle>
          <div className="space-y-3">
            {selectedWork.map((w, i) => (
              <div key={i} data-reveal>
                <h3 className="text-[14px] font-semibold text-text-body">{w.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-text-muted">{w.note}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
