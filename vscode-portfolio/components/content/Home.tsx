"use client";

import { identity } from "@/lib/content/identity";
import { skillGroups } from "@/lib/content/skills";
import { useReveal } from "@/lib/useReveal";
import { PhotoParticlesDemo } from "./PhotoParticlesDemo";

const socials = [
  {
    label: "GitHub",
    href: identity.github,
    icon: (
      <svg width="19" height="19" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: identity.linkedin,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.02 0-2.33 1.58-2.33 3.21V21H9z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${identity.email}`,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

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
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                title={s.label}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-sidebar-bg text-text-muted transition-colors hover:border-accent-focus hover:text-accent-link"
              >
                {s.icon}
              </a>
            ))}
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
