"use client";

import { useEffect, useRef, useState } from "react";
import { PhotoParticleController } from "@/lib/photoParticles";
import { identity } from "@/lib/content/identity";

export function PhotoParticlesDemo({ size = 380 }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const controllerRef = useRef<PhotoParticleController | null>(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const controller = new PhotoParticleController({
      featuredImageEl: containerRef.current,
      imgEl: imgRef.current,
      imageSrc: "/images/me.jpg",
      touchInfluenceRadius: 130,
      particleSamplingStep: 2,
    });
    controllerRef.current = controller;
    controller.init();

    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, []);

  function handleToggle(checked: boolean) {
    setEnabled(checked);
    controllerRef.current?.toggleParticles(checked);
  }

  return (
    <div className="relative flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative z-0 flex items-center justify-center"
        // Cap leaves room for the activity bar + padding (and the shell's zoom) so
        // the photo never slips behind the sidebar on narrow screens.
        style={{ width: `min(${size}px, calc(100vw - 9rem))`, height: `min(${size}px, calc(100vw - 9rem))` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/images/me.jpg"
          alt={identity.name}
          className="relative z-[1] h-full w-full rounded-full object-cover ring-2 ring-accent-focus/30 shadow-2xl"
        />
      </div>

      <div className="relative z-20 mt-6 flex items-center gap-2 rounded-full border border-border bg-panel px-3 py-1.5 shadow-lg transition-transform hover:-translate-y-0.5">
        <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium text-text-muted">
          <span className="relative inline-flex h-4 w-8 items-center">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => handleToggle(e.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-white/20 transition-colors peer-checked:bg-accent-focus" />
            <span className="absolute left-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
          </span>
          Particles
        </label>
        <a
          href={identity.photoParticlesRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-5 w-5 items-center justify-center text-text-muted transition-colors hover:text-accent-link"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="pointer-events-none absolute bottom-[140%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-[#2a2a2a] px-3 py-1.5 text-[11px] font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
            Here&apos;s how I did this
          </span>
        </a>
      </div>
    </div>
  );
}
