// Tiny Web Audio piano synth for the sketchbook easter egg. No samples: a couple
// of oscillators shaped with a gain envelope give a soft, warm piano-ish tone.

export interface PianoKey {
  note: string; // e.g. "C4"
  freq: number;
  black: boolean;
  keyboard: string; // computer key that plays it
}

// One octave plus the top C, C4..C5.
export const KEYS: PianoKey[] = [
  { note: "C4", freq: 261.63, black: false, keyboard: "a" },
  { note: "C#4", freq: 277.18, black: true, keyboard: "w" },
  { note: "D4", freq: 293.66, black: false, keyboard: "s" },
  { note: "D#4", freq: 311.13, black: true, keyboard: "e" },
  { note: "E4", freq: 329.63, black: false, keyboard: "d" },
  { note: "F4", freq: 349.23, black: false, keyboard: "f" },
  { note: "F#4", freq: 369.99, black: true, keyboard: "t" },
  { note: "G4", freq: 392.0, black: false, keyboard: "g" },
  { note: "G#4", freq: 415.3, black: true, keyboard: "y" },
  { note: "A4", freq: 440.0, black: false, keyboard: "h" },
  { note: "A#4", freq: 466.16, black: true, keyboard: "u" },
  { note: "B4", freq: 493.88, black: false, keyboard: "j" },
  { note: "C5", freq: 523.25, black: false, keyboard: "k" },
];

export const keyByKeyboard: Record<string, PianoKey> = Object.fromEntries(
  KEYS.map((k) => [k.keyboard, k])
);
export const keyByNote: Record<string, PianoKey> = Object.fromEntries(
  KEYS.map((k) => [k.note, k])
);

let ctx: AudioContext | null = null;

export function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Play a single note at `freq` Hz, starting `when` seconds from now. */
export function playFreq(freq: number, when = 0, duration = 1.5) {
  const ac = getAudioCtx();
  if (!ac) return;
  const t0 = ac.currentTime + when;

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(0.28, t0 + 0.012);
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  master.connect(ac.destination);

  // A warm fundamental plus a quieter octave partial for body.
  const partials: Array<[OscillatorType, number, number]> = [
    ["triangle", 1, 1],
    ["sine", 2, 0.35],
  ];
  for (const [type, mult, gain] of partials) {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.value = freq * mult;
    const g = ac.createGain();
    g.gain.value = gain;
    osc.connect(g).connect(master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }
}

export interface MelodyStep {
  note: string;
  beats: number;
}

// "Twinkle, Twinkle, Little Star" — first two phrases, in C major.
export const TWINKLE: MelodyStep[] = [
  { note: "C4", beats: 1 }, { note: "C4", beats: 1 }, { note: "G4", beats: 1 }, { note: "G4", beats: 1 },
  { note: "A4", beats: 1 }, { note: "A4", beats: 1 }, { note: "G4", beats: 2 },
  { note: "F4", beats: 1 }, { note: "F4", beats: 1 }, { note: "E4", beats: 1 }, { note: "E4", beats: 1 },
  { note: "D4", beats: 1 }, { note: "D4", beats: 1 }, { note: "C4", beats: 2 },
];

/**
 * Play a melody, calling `onNote(note)` as each note sounds so the UI can light
 * the key. Returns a cancel function.
 */
export function playMelody(
  steps: MelodyStep[],
  onNote: (note: string) => void,
  secondsPerBeat = 0.42
): () => void {
  const ac = getAudioCtx();
  if (!ac) return () => {};
  const timers: ReturnType<typeof setTimeout>[] = [];
  let elapsed = 0;
  for (const step of steps) {
    const k = keyByNote[step.note];
    const dur = step.beats * secondsPerBeat;
    if (k) {
      playFreq(k.freq, elapsed, Math.min(dur * 1.15, 1.8));
      timers.push(setTimeout(() => onNote(step.note), elapsed * 1000));
    }
    elapsed += dur;
  }
  return () => timers.forEach(clearTimeout);
}
