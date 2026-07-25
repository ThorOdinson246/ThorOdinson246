import { skillGroups } from "@/lib/content/skills";
import { EditorSurface, SubHeading, CommentLine } from "./EditorSurface";

export function Skills() {
  return (
    <EditorSurface>
      <CommentLine>{"// about/skills.json"}</CommentLine>
      {skillGroups.map((group) => (
        <div key={group.category}>
          <SubHeading>{group.category}</SubHeading>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-[12px] text-text-body"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </EditorSurface>
  );
}
