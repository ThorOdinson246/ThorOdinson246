// Songs for the sketchbook piano's falling-notes player.
//
// These are short, note-by-note melody motifs the little piano plays (pitch and
// rhythm data, not any recording), for a personal, non-commercial easter egg.
// Twinkle, Happy Birthday, and Ode to Joy are public domain. The Interstellar
// and Game of Thrones entries are brief recognizable phrases transcribed by ear;
// tweak the notes here if anything sounds off.

export interface SongStep {
  note?: string; // omitted for a rest
  beats: number;
}

export interface Song {
  id: string;
  title: string;
  subtitle?: string;
  secondsPerBeat: number;
  steps: SongStep[];
}

export interface TimedNote {
  note: string;
  start: number; // seconds from song start
  duration: number;
}

/** Expand a song's steps into absolutely-timed notes. */
export function timeline(song: Song): { notes: TimedNote[]; total: number } {
  const notes: TimedNote[] = [];
  let t = 0;
  for (const step of song.steps) {
    const dur = step.beats * song.secondsPerBeat;
    if (step.note) notes.push({ note: step.note, start: t, duration: Math.min(dur * 1.1, 1.9) });
    t += dur;
  }
  return { notes, total: t };
}

export const SONGS: Song[] = [
  {
    id: "twinkle",
    title: "Twinkle, Twinkle",
    subtitle: "the easy one",
    secondsPerBeat: 0.44,
    steps: [
      { note: "C4", beats: 1 }, { note: "C4", beats: 1 }, { note: "G4", beats: 1 }, { note: "G4", beats: 1 },
      { note: "A4", beats: 1 }, { note: "A4", beats: 1 }, { note: "G4", beats: 2 },
      { note: "F4", beats: 1 }, { note: "F4", beats: 1 }, { note: "E4", beats: 1 }, { note: "E4", beats: 1 },
      { note: "D4", beats: 1 }, { note: "D4", beats: 1 }, { note: "C4", beats: 2 },
    ],
  },
  {
    id: "happy-birthday",
    title: "Happy Birthday",
    subtitle: "public domain since 2016",
    secondsPerBeat: 0.42,
    steps: [
      { note: "G4", beats: 0.75 }, { note: "G4", beats: 0.25 }, { note: "A4", beats: 1 }, { note: "G4", beats: 1 }, { note: "C5", beats: 1 }, { note: "B4", beats: 2 },
      { note: "G4", beats: 0.75 }, { note: "G4", beats: 0.25 }, { note: "A4", beats: 1 }, { note: "G4", beats: 1 }, { note: "D5", beats: 1 }, { note: "C5", beats: 2 },
      { note: "G4", beats: 0.75 }, { note: "G4", beats: 0.25 }, { note: "G5", beats: 1 }, { note: "E5", beats: 1 }, { note: "C5", beats: 1 }, { note: "B4", beats: 1 }, { note: "A4", beats: 1 },
      { note: "F5", beats: 0.75 }, { note: "F5", beats: 0.25 }, { note: "E5", beats: 1 }, { note: "C5", beats: 1 }, { note: "D5", beats: 1 }, { note: "C5", beats: 2 },
    ],
  },
  {
    id: "ode-to-joy",
    title: "Ode to Joy",
    subtitle: "Beethoven",
    secondsPerBeat: 0.42,
    steps: [
      { note: "E4", beats: 1 }, { note: "E4", beats: 1 }, { note: "F4", beats: 1 }, { note: "G4", beats: 1 },
      { note: "G4", beats: 1 }, { note: "F4", beats: 1 }, { note: "E4", beats: 1 }, { note: "D4", beats: 1 },
      { note: "C4", beats: 1 }, { note: "C4", beats: 1 }, { note: "D4", beats: 1 }, { note: "E4", beats: 1 },
      { note: "E4", beats: 1.5 }, { note: "D4", beats: 0.5 }, { note: "D4", beats: 2 },
      { note: "E4", beats: 1 }, { note: "E4", beats: 1 }, { note: "F4", beats: 1 }, { note: "G4", beats: 1 },
      { note: "G4", beats: 1 }, { note: "F4", beats: 1 }, { note: "E4", beats: 1 }, { note: "D4", beats: 1 },
      { note: "C4", beats: 1 }, { note: "C4", beats: 1 }, { note: "D4", beats: 1 }, { note: "E4", beats: 1 },
      { note: "D4", beats: 1.5 }, { note: "C4", beats: 0.5 }, { note: "C4", beats: 2 },
    ],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    subtitle: "main theme · by ear",
    secondsPerBeat: 0.5,
    steps: [
      { note: "A4", beats: 1 }, { note: "E5", beats: 1 }, { note: "A5", beats: 1 }, { note: "E5", beats: 1 },
      { note: "A4", beats: 1 }, { note: "F5", beats: 1 }, { note: "A5", beats: 1 }, { note: "F5", beats: 1 },
      { note: "G4", beats: 1 }, { note: "D5", beats: 1 }, { note: "G5", beats: 1 }, { note: "D5", beats: 1 },
      { note: "G4", beats: 1 }, { note: "E5", beats: 1 }, { note: "G5", beats: 1 }, { note: "E5", beats: 1 },
      { note: "F4", beats: 1 }, { note: "C5", beats: 1 }, { note: "F5", beats: 1 }, { note: "C5", beats: 1 },
      { note: "A4", beats: 1 }, { note: "E5", beats: 1 }, { note: "A5", beats: 1 }, { note: "E5", beats: 1 },
      { note: "A4", beats: 1 }, { note: "F5", beats: 1 }, { note: "A5", beats: 1 }, { note: "F5", beats: 1 },
      { note: "G4", beats: 1 }, { note: "E5", beats: 1 }, { note: "G5", beats: 1 }, { note: "E5", beats: 1 },
      { note: "A4", beats: 2 }, { note: "E5", beats: 2 }, { note: "A5", beats: 4 },
    ],
  },
  {
    id: "game-of-thrones",
    title: "Game of Thrones",
    subtitle: "main theme · by ear",
    secondsPerBeat: 0.36,
    steps: [
      { note: "E4", beats: 1 }, { note: "A4", beats: 1 }, { note: "C5", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "E4", beats: 1 }, { note: "A4", beats: 1 }, { note: "C5", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "E4", beats: 1 }, { note: "A4", beats: 1 }, { note: "B4", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "E4", beats: 1 }, { note: "A4", beats: 1 }, { note: "B4", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "G4", beats: 1 }, { note: "C5", beats: 1 }, { note: "E5", beats: 0.5 }, { note: "F5", beats: 0.5 },
      { note: "G4", beats: 1 }, { note: "C5", beats: 1 }, { note: "E5", beats: 0.5 }, { note: "F5", beats: 0.5 },
      { note: "G4", beats: 1 }, { note: "C5", beats: 1 }, { note: "D5", beats: 0.5 }, { note: "F5", beats: 0.5 },
      { note: "G4", beats: 1 }, { note: "C5", beats: 1 }, { note: "D5", beats: 0.5 }, { note: "F5", beats: 0.5 },
      { note: "E5", beats: 1 }, { note: "A4", beats: 1 }, { note: "C5", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "E5", beats: 1 }, { note: "A4", beats: 1 }, { note: "C5", beats: 0.5 }, { note: "D5", beats: 0.5 },
      { note: "E4", beats: 2 },
    ],
  },
];
