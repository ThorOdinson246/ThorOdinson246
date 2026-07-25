import { identity } from "@/lib/content/identity";
import { EditorSurface, Heading, SubHeading } from "./EditorSurface";

export function Readme() {
  return (
    <EditorSurface>
      <Heading>{identity.name}</Heading>
      <p className="text-text-muted">{identity.tagline}</p>

      <SubHeading>About</SubHeading>
      <p>{identity.intro}</p>

      <SubHeading>Contact</SubHeading>
      <ul className="space-y-1">
        <li>
          Email:{" "}
          <a href={`mailto:${identity.email}`} className="text-accent-link hover:underline">
            {identity.email}
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
            {identity.linkedin.replace("https://", "")}
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a href={identity.github} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
            {identity.github.replace("https://", "")}
          </a>
        </li>
      </ul>

      <SubHeading>Explore</SubHeading>
      <p className="text-text-muted">
        Open <code className="rounded bg-white/10 px-1 py-0.5 text-[13px]">home.tsx</code> for the interactive landing
        view, or browse <code className="rounded bg-white/10 px-1 py-0.5 text-[13px]">projects/</code> in the explorer
        for personal, client, and research work.
      </p>
    </EditorSurface>
  );
}
