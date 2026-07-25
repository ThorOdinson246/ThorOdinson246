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
import { Terminal } from "./Terminal";

export function EditorShell({ rounded = false }: { rounded?: boolean }) {
  const isMobile = useIsMobile();
  const setSidebarCollapsed = useEditorStore((s) => s.setSidebarCollapsed);
  const sidebarCollapsed = useEditorStore((s) => s.sidebarCollapsed);
  const terminalOpen = useEditorStore((s) => s.terminalOpen);
  const toggleTerminal = useEditorStore((s) => s.toggleTerminal);
  const prevMobile = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevMobile.current !== isMobile) {
      prevMobile.current = isMobile;
      setSidebarCollapsed(isMobile);
    }
  }, [isMobile, setSidebarCollapsed]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        toggleTerminal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleTerminal]);

  return (
    <div
      className={clsx("flex h-full w-full flex-col bg-editor-bg", rounded && "overflow-hidden rounded-lg")}
      style={{ zoom: 1.1 }}
    >
      <TitleBar />
      <div className="relative flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          <TabsBar />
          <div className="min-h-0 flex-1">
            <EditorPane />
          </div>
          {terminalOpen && (
            <div className="h-[38%] min-h-[180px] shrink-0">
              <Terminal />
            </div>
          )}
        </main>
        {isMobile && !sidebarCollapsed && (
          <div
            onClick={() => setSidebarCollapsed(true)}
            className="absolute inset-0 z-20 bg-black/50"
            aria-hidden="true"
          />
        )}
        <Sidebar mobile={isMobile} />
        <ActivityBar />
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
