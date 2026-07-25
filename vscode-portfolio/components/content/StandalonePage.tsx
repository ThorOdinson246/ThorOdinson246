import Link from "next/link";
import { VscodeLogo } from "@/components/shell/VscodeLogo";

export function StandalonePage({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen overflow-y-auto bg-editor-bg text-text-body">
      <div className="sticky top-0 z-10 flex h-11 items-center border-b border-border bg-titlebar-bg px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] text-text-muted transition-colors hover:text-accent-link"
        >
          <VscodeLogo size={16} />
          <span>Mukesh Poudel</span>
        </Link>
      </div>
      {children}
    </main>
  );
}
