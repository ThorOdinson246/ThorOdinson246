"use client";

import { personalProjects, clientProjects } from "@/lib/content/projects";
import { useReveal } from "@/lib/useReveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
      <p className="mb-2 font-mono text-[13px] text-text-muted">{"// projects.tsx"}</p>
      <h1 className="text-3xl font-semibold text-text-body">Projects</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-text-muted">
        Software, AI, and geospatial work. Research projects with dedicated write-ups open in their own tab.
      </p>

      <section className="mt-12">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-text-muted" data-reveal>
          Personal
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {personalProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-text-muted" data-reveal>
          Client
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {clientProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
