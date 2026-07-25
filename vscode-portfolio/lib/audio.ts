import { useEditorStore } from "./store";

let el: HTMLAudioElement | null = null;

function element(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!el) {
    el = new Audio("/audio/lofi.mp3");
    el.loop = true;
    el.preload = "none";
    el.volume = 0.35;
  }
  return el;
}

export function useMusic() {
  const musicOn = useEditorStore((s) => s.musicOn);
  const setMusicOn = useEditorStore((s) => s.setMusicOn);

  function toggle() {
    const audio = element();
    if (!audio) return;
    const next = !musicOn;
    setMusicOn(next);
    if (next) audio.play().catch(() => setMusicOn(false));
    else audio.pause();
  }

  return { musicOn, toggle };
}
