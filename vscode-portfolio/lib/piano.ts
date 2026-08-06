// Tiny Web Audio piano synth for the sketchbook easter egg. No samples: a couple
// of oscillators shaped with a gain envelope give a soft, warm piano-ish tone.

export interface PianoKey {
  note: string; // e.g. "C4"
  freq: number;
  black: boolean;
  keyboard?: string; // computer key that plays it (lower octave only)
}

// Two octaves, C4..C6.
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
  { note: "C#5", freq: 554.37, black: true },
  { note: "D5", freq: 587.33, black: false },
  { note: "D#5", freq: 622.25, black: true },
  { note: "E5", freq: 659.25, black: false },
  { note: "F5", freq: 698.46, black: false },
  { note: "F#5", freq: 739.99, black: true },
  { note: "G5", freq: 783.99, black: false },
  { note: "G#5", freq: 830.61, black: true },
  { note: "A5", freq: 880.0, black: false },
  { note: "A#5", freq: 932.33, black: true },
  { note: "B5", freq: 987.77, black: false },
  { note: "C6", freq: 1046.5, black: false },
];

export const keyByKeyboard: Record<string, PianoKey> = Object.fromEntries(
  KEYS.filter((k) => k.keyboard).map((k) => [k.keyboard as string, k])
);
export const keyByNote: Record<string, PianoKey> = Object.fromEntries(
  KEYS.map((k) => [k.note, k])
);

let ctx: AudioContext | null = null;

export function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/**
 * Play a single note at `freq` Hz, starting `when` seconds from now.
 * A struck-string tone: a stack of sine partials with mild inharmonicity, shaped
 * by a fast attack + long exponential decay and a lowpass that closes over time,
 * so it reads as a soft piano rather than a synth beep.
 */
export function playFreq(freq: number, when = 0, duration = 1.9) {
  const ac = getAudioCtx();
  if (!ac) return;
  const t0 = ac.currentTime + when;

  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, t0);
  master.gain.exponentialRampToValueAtTime(0.3, t0 + 0.006); // fast hammer attack
  master.gain.exponentialRampToValueAtTime(0.14, t0 + 0.32); // initial decay
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration); // long release

  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(Math.min(freq * 8, 9000), t0);
  lp.frequency.exponentialRampToValueAtTime(Math.max(freq * 2.4, 700), t0 + duration * 0.7);
  lp.Q.value = 0.5;
  lp.connect(master);
  master.connect(ac.destination);

  // Harmonic amplitudes roughly following a piano's spectrum.
  const harmonics: Array<[number, number]> = [
    [1, 1], [2, 0.55], [3, 0.33], [4, 0.2], [5, 0.11], [6, 0.06],
  ];
  for (const [n, amp] of harmonics) {
    const osc = ac.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq * n * (1 + n * n * 0.0004); // slight inharmonicity
    const g = ac.createGain();
    g.gain.value = amp;
    osc.connect(g).connect(lp);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
  }
}

export function playNote(note: string, when = 0, duration = 1.5) {
  const k = keyByNote[note];
  if (k) playFreq(k.freq, when, duration);
}
