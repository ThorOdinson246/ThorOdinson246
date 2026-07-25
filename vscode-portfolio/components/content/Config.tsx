import { identity } from "@/lib/content/identity";
import { EditorSurface, CommentLine } from "./EditorSurface";

function CodeLine({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-mono text-[13px] ${className}`}>{children}</div>;
}

export function Config() {
  return (
    <EditorSurface>
      <CommentLine>{"// portfolio.config.ts"}</CommentLine>
      <div className="mt-4 space-y-0.5">
        <CodeLine>
          <span className="text-accent-link">export const</span> portfolio = {"{"}
        </CodeLine>
        <CodeLine className="pl-4">
          name: <span className="text-[#d29922]">&quot;{identity.name}&quot;</span>,
        </CodeLine>
        <CodeLine>
          <span className="pl-4">
            tagline: <span className="text-[#d29922]">&quot;{identity.tagline}&quot;</span>,
          </span>
        </CodeLine>
        <CodeLine>
          <span className="pl-4">
            email: <span className="text-[#d29922]">&quot;{identity.email}&quot;</span>,
          </span>
        </CodeLine>
        <CodeLine>
          <span className="pl-4">
            links: {"{"}
          </span>
        </CodeLine>
        <CodeLine>
          <span className="pl-8">
            linkedin: <span className="text-[#d29922]">&quot;{identity.linkedin}&quot;</span>,
          </span>
        </CodeLine>
        <CodeLine>
          <span className="pl-8">
            github: <span className="text-[#d29922]">&quot;{identity.github}&quot;</span>,
          </span>
        </CodeLine>
        <CodeLine>
          <span className="pl-4">{"}"},</span>
        </CodeLine>
        <CodeLine>{"} as const;"}</CodeLine>
      </div>
    </EditorSurface>
  );
}
