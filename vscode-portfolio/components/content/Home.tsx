"use client";

import { identity } from "@/lib/content/identity";
import { skillGroups } from "@/lib/content/skills";
import { useReveal } from "@/lib/useReveal";
import { PhotoParticlesDemo } from "./PhotoParticlesDemo";

export function Home() {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <section className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:justify-between lg:gap-6">
        <div className="relative z-10 max-w-xl text-center lg:text-left" data-reveal>
          <p className="mb-3 font-mono text-[13px] text-text-muted">{"// home.tsx"}</p>
          <h1 className="text-4xl font-semibold leading-tight text-text-body sm:text-5xl">
            I&apos;m <span className="text-accent-link">{identity.name}</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">{identity.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border bg-sidebar-bg px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
            >
              GitHub
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border bg-sidebar-bg px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="rounded border border-border bg-sidebar-bg px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
            >
              Email
            </a>
          </div>
        </div>
        <div data-reveal>
          <PhotoParticlesDemo size={380} />
        </div>
      </section>

      <section className="mt-28" data-reveal>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-text-muted">Intro</h2>
        <p className="max-w-3xl text-[15px] leading-relaxed text-text-body">{identity.intro}</p>
      </section>

      <section className="mt-20">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-text-muted" data-reveal>
          Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded border border-border bg-sidebar-bg p-5"
              data-reveal
            >
              <h3 className="mb-3 text-[13px] font-semibold text-accent-link">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-black/30 px-3 py-1 text-[12px] text-text-body"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
