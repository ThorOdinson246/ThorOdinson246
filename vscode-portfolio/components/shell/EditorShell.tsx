"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import { useIsMobile } from "@/lib/useViewport";
import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { TabsBar } from "./TabsBar";
import { EditorPane } from "./EditorPane";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";

export function EditorShell({ rounded = false }: { rounded?: boolean }) {
  const isMobile = useIsMobile();
  const setSidebarCollapsed = useEditorStore((s) => s.setSidebarCollapsed);
  const prevMobile = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevMobile.current !== isMobile) {
      prevMobile.current = isMobile;
      setSidebarCollapsed(isMobile);
    }
  }, [isMobile, setSidebarCollapsed]);

  return (
    <div className={clsx("flex h-full flex-col bg-editor-bg", rounded && "overflow-hidden rounded-lg")}>
      <TitleBar />
      <div className="relative flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          <TabsBar />
          <div className="min-h-0 flex-1">
            <EditorPane />
          </div>
        </main>
        <Sidebar mobile={isMobile} />
        <ActivityBar />
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
