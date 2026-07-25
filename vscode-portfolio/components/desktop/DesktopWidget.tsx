"use client";

import { useEffect, useState } from "react";
import { identity } from "@/lib/content/identity";

const bars = [72, 88, 64, 91, 58, 80];

export function DesktopWidget() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-8 right-8 hidden w-72 select-none font-mono text-[12px] text-white/70 md:block">
      <div className="mb-2 text-4xl font-semibold tabular-nums text-white/90">{time}</div>
      <div className="text-white/60">thorodinson@portfolio</div>
      <div className="mb-3 text-white/40">─────────────────────────</div>
      <div className="space-y-1">
        <div>
          <span className="text-accent-link">os</span>      Ubuntu 25.10
        </div>
        <div>
          <span className="text-accent-link">shell</span>   zsh · powerlevel10k
        </div>
        <div>
          <span className="text-accent-link">editor</span>  VS Code
        </div>
        <div>
          <span className="text-accent-link">focus</span>   Software · AI · Geospatial
        </div>
        <div className="text-white/50">{identity.name}</div>
      </div>
      <div className="mt-3 flex items-end gap-1">
        {bars.map((h, i) => (
          <span key={i} className="w-2 rounded-sm bg-accent-focus/60" style={{ height: `${h / 4}px` }} />
        ))}
        <span className="ml-2 text-white/40">cpu</span>
      </div>
    </div>
  );
}
