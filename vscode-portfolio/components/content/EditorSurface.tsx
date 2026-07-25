export function EditorSurface({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-8 py-10 text-[14px] leading-relaxed text-text-body">{children}</div>;
}

export function Heading({ children }: { children: React.ReactNode }) {
  return <h1 className="mb-4 text-2xl font-semibold text-text-body">{children}</h1>;
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-text-muted">{children}</h2>;
}

export function CommentLine({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[13px] text-[#8b949e]">{children}</p>;
}
