# Sketchbook Easter Egg — Design

## Goal
A hidden "sketch mode" for the VSCode-clone portfolio. When triggered, the whole
environment morphs into a hand-drawn pencil aesthetic and a Sketchbook opens,
holding a carousel of Mukesh's drawings and a playable piano. It is a personal,
delightful easter egg, discovered by curiosity.

## Trigger — the "forbidden" pencil
- A small pencil floats fixed at the bottom-right, idly bobbing, with a periodic
  wiggle to tempt clicks. Hover shows a hand-lettered tag: "don't click me".
- Click enters sketch mode. In sketch mode the pencil becomes an eraser tagged
  "rub it out"; clicking it exits.
- Implemented as one component (`SketchToggle`) mounted at the Desktop level so it
  floats above the window in every window state. Easy to swap the glyph later.

## The morph (whole-UI)
Rides the existing theme-token system so every panel recolors consistently, plus a
`data-sketch` layer for the hand-drawn qualities flat tokens cannot express.

1. **New theme `sketchbook`** (kind: light) in `lib/themes.ts`: warm paper
   backgrounds, graphite text, soft-pencil borders, ink-blue accent. Applied by the
   existing `applyTheme`.
2. **`sketchMode` flag** in the store. On enter: remember previous theme, set
   `themeId = "sketchbook"`, `sketchMode = true`, open+activate the Sketchbook tab.
   On exit: restore previous theme, `sketchMode = false`, close the Sketchbook tab.
3. **`ThemeManager`** sets/removes `data-sketch` on `<html>` from `sketchMode`.
4. **`globals.css` `:root[data-sketch]` block**: overrides `--font-ui` to Shantell
   Sans (self-hosted via next/font), paints a subtle paper-grain background, and
   applies a light SVG roughen filter (`feTurbulence` + `feDisplacementMap`, defined
   in a hidden `SketchFilters` svg) tuned so borders waver but text stays readable.
   Code blocks keep the mono font. Filter strength verified empirically in-browser
   and backed off if it harms legibility; the theme + font + grain are the baseline
   morph even without the filter.

## The Sketchbook (opens as a tab)
A hidden file `sketchbook` (in `fileMap`, not in the visible tree, not pinned),
rendered by `EditorPane` via component key `sketchbook`. Two isolated pieces:

- **`SketchCarousel`** — reads `lib/content/sketches.ts` (`{ file, caption }[]`) and
  loads `/sketches/<file>`. Prev/next arrows, page dots, hand-lettered captions,
  tape-corner framing, arrow-key navigation. If an image is missing it shows a
  neutral empty sketch-frame with the caption (never fake art). Seeded with 5
  placeholder entries; Mukesh drops real scans into `public/sketches/`.
- **`Piano`** — a hand-drawn one-octave-plus keyboard. Playable by mouse and by the
  computer home row (a s d f g h j + w e t y u), with note labels for a beginner.
  Soft piano-ish tone synthesized in `lib/piano.ts` (Web Audio oscillators + gain
  envelope, AudioContext created on first interaction, no audio assets). A
  "play something" button auto-plays a short public-domain melody with keys lighting.

## Files
New: `components/easter/SketchToggle.tsx`, `components/easter/SketchFilters.tsx`,
`components/easter/SketchCarousel.tsx`, `components/easter/Piano.tsx`,
`components/content/Sketchbook.tsx`, `lib/content/sketches.ts`, `lib/piano.ts`,
`public/sketches/.gitkeep`.
Edited: `lib/themes.ts`, `lib/store.ts`, `components/ThemeManager.tsx`,
`app/layout.tsx`, `app/globals.css`, `lib/fileRegistry.ts`,
`components/shell/EditorPane.tsx`, `components/desktop/Desktop.tsx`.

## Out of scope / YAGNI
No persistence of sketch mode across reloads (default off). Not added to the theme
picker (easter egg stays special). No audio files. No per-element bespoke roughening
of every UI control — the global filter plus bespoke sketch art in the Sketchbook
carry the look.

## Branch
`easter-egg-sketchbook`, local only. Reviewed live, merged only on approval.
