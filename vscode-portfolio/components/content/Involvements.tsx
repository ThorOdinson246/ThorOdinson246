"use client";

import { involvements } from "@/lib/content/projects";
import { useReveal } from "@/lib/useReveal";
import { ProjectCard } from "./ProjectCard";

export function Involvements() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
      <p className="mb-2 font-mono text-[13px] text-text-muted">{"// involvements.tsx"}</p>
      <h1 className="text-3xl font-semibold text-text-body">Involvements</h1>
      <p className="mt-2 max-w-2xl text-[14px] text-text-muted">
        Organizations and communities I help build and run.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {involvements.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
