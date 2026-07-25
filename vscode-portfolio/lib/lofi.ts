const CHORDS: number[][] = [
  [220.0, 261.63, 329.63, 392.0],
  [293.66, 369.99, 440.0, 523.25],
  [196.0, 246.94, 293.66, 369.99],
  [261.63, 329.63, 392.0, 493.88],
];

const CHORD_SECONDS = 3.6;

class LofiEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private index = 0;
  playing = false;

  private ensureContext() {
    if (this.ctx) return;
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.4;
    filter.connect(master);
    master.connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    this.filter = filter;
  }

  private playChord() {
    if (!this.ctx || !this.filter) return;
    const now = this.ctx.currentTime;
    const chord = CHORDS[this.index % CHORDS.length];
    this.index += 1;

    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.detune.value = (i - 1.5) * 3;
      const g = this.ctx!.createGain();
      const peak = 0.16 / chord.length;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(peak, now + 0.8);
      g.gain.linearRampToValueAtTime(0, now + CHORD_SECONDS);
      osc.connect(g);
      g.connect(this.filter!);
      osc.start(now);
      osc.stop(now + CHORD_SECONDS + 0.1);
    });

    const bass = this.ctx.createOscillator();
    bass.type = "sine";
    bass.frequency.value = chord[0] / 2;
    const bg = this.ctx.createGain();
    bg.gain.setValueAtTime(0, now);
    bg.gain.linearRampToValueAtTime(0.09, now + 0.4);
    bg.gain.linearRampToValueAtTime(0, now + CHORD_SECONDS);
    bass.connect(bg);
    bg.connect(this.filter);
    bass.start(now);
    bass.stop(now + CHORD_SECONDS + 0.1);

    this.timer = setTimeout(() => this.playChord(), CHORD_SECONDS * 1000);
  }

  start() {
    this.ensureContext();
    if (!this.ctx || !this.master) return;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 1.2);
    this.playing = true;
    this.playChord();
  }

  stop() {
    this.playing = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);
    }
  }
}

let engine: LofiEngine | null = null;

export function getLofi(): LofiEngine {
  if (!engine) engine = new LofiEngine();
  return engine;
}
