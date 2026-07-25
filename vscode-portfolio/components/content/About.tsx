import { identity } from "@/lib/content/identity";
import { EditorSurface, Heading, CommentLine } from "./EditorSurface";

export function About() {
  return (
    <EditorSurface>
      <CommentLine>{"// about/about.md"}</CommentLine>
      <Heading>Intro</Heading>
      <p>{identity.intro}</p>
    </EditorSurface>
  );
}
