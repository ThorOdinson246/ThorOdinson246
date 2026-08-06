"use client";

import { useEffect, useRef } from "react";
import { getAudioCtx } from "@/lib/piano";

/**
 * A transparent canvas layer behind the sketchbook content. Drag on the empty
 * paper to doodle in graphite; strokes slowly fade away on their own, and a soft
 * pencil-scratch sound plays while you draw. Sits at z-0; interactive blocks in
 * the sketchbook opt back into pointer events above it.
 */
export function SketchPad({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  // pencil-scratch audio nodes
  const scratch = useRef<{ gain: GainNode; silence: ReturnType<typeof setTimeout> | null } | null>(null);

  // Size the canvas to its parent, crisp on HiDPI.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w: width, h: height };
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  // Slow fade of existing strokes.
  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const tick = () => {
      const { w, h } = sizeRef.current;
      if (w && h) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,0.010)";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);

  function scratchOn(speed: number) {
    const ac = getAudioCtx();
    if (!ac) return;
    if (!scratch.current) {
      const buffer = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = ac.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const bp = ac.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2600;
      bp.Q.value = 0.8;
      const gain = ac.createGain();
      gain.gain.value = 0;
      src.connect(bp).connect(gain).connect(ac.destination);
      src.start();
      scratch.current = { gain, silence: null };
    }
    const s = scratch.current;
    const target = Math.min(0.05, 0.012 + speed * 0.0009);
    s.gain.gain.setTargetAtTime(target, ac.currentTime, 0.015);
    if (s.silence) clearTimeout(s.silence);
    s.silence = setTimeout(() => s.gain.gain.setTargetAtTime(0, ac.currentTime, 0.05), 70);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !enabled) return;

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const { w, h } = sizeRef.current;
      return {
        x: (e.clientX - rect.left) * (w / rect.width),
        y: (e.clientY - rect.top) * (h / rect.height),
      };
    };

    const down = (e: PointerEvent) => {
      drawing.current = true;
      last.current = toLocal(e);
    };
    const move = (e: PointerEvent) => {
      if (!drawing.current || !last.current) return;
      const p = toLocal(e);
      const dx = p.x - last.current.x;
      const dy = p.y - last.current.y;
      const speed = Math.hypot(dx, dy);
      ctx.strokeStyle = "rgba(58,47,16,0.72)";
      ctx.lineWidth = Math.max(1.1, 3.2 - speed * 0.05);
      ctx.beginPath();
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      last.current = p;
      scratchOn(speed);
    };
    const up = () => {
      drawing.current = false;
      last.current = null;
    };

    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
      style={{ pointerEvents: enabled ? "auto" : "none", touchAction: "none", opacity: enabled ? 1 : 0 }}
    />
  );
}
