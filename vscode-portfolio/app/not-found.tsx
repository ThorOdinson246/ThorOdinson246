import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Not Found — Mukesh Poudel",
};

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-editor-bg px-6 text-center font-mono text-text-body">
      <p className="text-[13px] text-text-muted">
        <span className="text-[#3fb950]">mukesh-poudel</span>
        <span className="text-text-muted"> ~ </span>
        <span className="text-accent-link">❯</span> cat {""}
        <span className="text-text-body">$REQUEST</span>
      </p>
      <p className="mt-3 text-[15px] text-diag-error">zsh: no such file or directory</p>

      <h1 className="mt-10 text-6xl font-semibold tracking-tight text-text-body">404</h1>
      <p className="mt-3 max-w-sm text-[14px] text-text-muted">
        The page you&apos;re looking for isn&apos;t here. It may have moved, or never existed.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md border border-border bg-sidebar-bg px-4 py-2 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
      >
        cd ~ — back to home
      </Link>
    </main>
  );
}
