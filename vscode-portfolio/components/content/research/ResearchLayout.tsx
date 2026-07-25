"use client";

import { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

export function ResearchLayout({
  sourceFile,
  hero,
  children,
}: {
  sourceFile: string;
  hero: ReactNode;
  children: ReactNode;
}) {
  const ref = useReveal();

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-8 py-12">
      <p className="mb-6 font-mono text-[13px] text-text-muted">{`// ${sourceFile}`}</p>
      <header className="border-b border-border pb-10" data-reveal>
        {hero}
      </header>
      <div className="space-y-14 pt-10">{children}</div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal>
      <h2 className="mb-5 text-xl font-semibold text-text-body">{title}</h2>
      <div className="space-y-4 text-[14px] leading-relaxed text-text-muted">{children}</div>
    </section>
  );
}

export function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-white/[0.02] p-5" data-reveal>
      <h3 className="mb-2 text-[14px] font-semibold text-accent-link">{title}</h3>
      <div className="space-y-3 text-[14px] leading-relaxed text-text-muted">{children}</div>
    </div>
  );
}

export function Figure({ src, alt, caption, maxWidth }: { src: string; alt: string; caption: string; maxWidth?: number }) {
  return (
    <figure className="my-6 flex flex-col items-center" data-reveal>
      <div className="overflow-hidden rounded-lg border border-border bg-black/30 p-2" style={maxWidth ? { maxWidth } : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full rounded" loading="lazy" />
      </div>
      <figcaption className="mt-3 text-center text-[12px] italic text-text-muted">{caption}</figcaption>
    </figure>
  );
}

export function FigureGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
}

export function StatusNote({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-md border border-diag-warning/40 bg-diag-warning/10 px-4 py-2 text-center text-[13px] italic text-diag-warning" data-reveal>
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
