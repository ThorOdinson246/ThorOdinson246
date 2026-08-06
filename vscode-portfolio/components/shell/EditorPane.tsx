"use client";

import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";
import { Home } from "../content/Home";
import { Readme } from "../content/Readme";
import { Config } from "../content/Config";
import { About } from "../content/About";
import { Skills } from "../content/Skills";
import { Projects } from "../content/Projects";
import { OpenSource } from "../content/OpenSource";
import { Resume } from "../content/Resume";
import { Contact } from "../content/Contact";
import { AesKeyRecovery } from "../content/research/AesKeyRecovery";
import { SedimentFlux } from "../content/research/SedimentFlux";

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-text-muted">
      <p className="text-sm">No file open</p>
      <p className="text-xs">Press ⌘/Ctrl+P to open a file</p>
    </div>
  );
}

function renderComponentKey(key: string) {
  switch (key) {
    case "home":
      return <Home />;
    case "readme":
      return <Readme />;
    case "config":
      return <Config />;
    case "about":
      return <About />;
    case "skills":
      return <Skills />;
    case "projects":
      return <Projects />;
    case "open-source":
      return <OpenSource />;
    case "resume":
      return <Resume />;
    case "contact":
      return <Contact />;
    case "research:aes":
      return <AesKeyRecovery />;
    case "research:sediment":
      return <SedimentFlux />;
    default:
      return null;
  }
}

export function EditorPane() {
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const openTabIds = useEditorStore((s) => s.openTabIds);

  if (!activeTabId) return <EmptyState />;

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-editor-bg">
      {openTabIds.map((id) => {
        const file = fileMap[id];
        if (!file || !file.componentKey) return null;
        return (
          <div key={id} className={id === activeTabId ? "block" : "hidden"}>
            {renderComponentKey(file.componentKey)}
          </div>
        );
      })}
    </div>
  );
}
