// Drawings shown in the sketchbook easter egg.
//
// To add a real drawing: drop the image into `public/sketches/` (e.g.
// `public/sketches/01.jpg`) and set its `file` and `caption` below. Any entry
// whose image is missing shows a neutral empty frame with the caption, so the
// carousel always looks intentional even before the scans are added.

export interface Sketch {
  file: string; // path under /sketches/
  caption: string;
}

export const sketches: Sketch[] = [
  { file: "/sketches/01.jpg", caption: "untitled — ink & graphite" },
  { file: "/sketches/02.jpg", caption: "study in lines" },
  { file: "/sketches/03.jpg", caption: "forms, no. 3" },
  { file: "/sketches/04.jpg", caption: "late-night scribbles" },
  { file: "/sketches/05.jpg", caption: "abstract, pencil on paper" },
];
