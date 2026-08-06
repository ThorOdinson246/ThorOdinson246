"use client";

import { useEditorStore } from "@/lib/store";

/**
 * A persistent callout next to the activity-bar eraser while in sketch mode, so
 * it is easy to find the way back. Dismissable with the X; reappears next time
 * you enter sketch mode (the store resets it on entry).
 */
export function SketchExitHint() {
  const sketchMode = useEditorStore((s) => s.sketchMode);
  const dismissed = useEditorStore((s) => s.exitHintDismissed);
  const exitSketch = useEditorStore((s) => s.exitSketch);
  const dismiss = useEditorStore((s) => s.dismissExitHint);

  if (!sketchMode || dismissed) return null;

  return (
    <div
      className="absolute bottom-2 right-[54px] z-40 flex items-center gap-2 rounded-lg border px-3 py-1.5 shadow-lg"
      style={{
        background: "var(--panel)",
        borderColor: "var(--border)",
        color: "var(--text-body)",
        fontFamily: "var(--font-caveat), cursive",
      }}
    >
      <button onClick={exitSketch} className="text-[16px] leading-none hover:underline">
        click the eraser to go back
      </button>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="grid h-4 w-4 place-items-center rounded-full text-[12px] leading-none opacity-60 hover:opacity-100"
        style={{ border: "1px solid var(--border)" }}
      >
        ✕
      </button>
      {/* little arrow pointing right toward the eraser */}
      <span
        aria-hidden="true"
        className="absolute left-full top-1/2 -translate-y-1/2 border-y-[6px] border-l-[7px] border-y-transparent"
        style={{ borderLeftColor: "var(--border)" }}
      />
    </div>
  );
}
