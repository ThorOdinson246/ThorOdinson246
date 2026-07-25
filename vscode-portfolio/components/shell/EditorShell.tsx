"use client";

import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { TabsBar } from "./TabsBar";
import { EditorPane } from "./EditorPane";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";

export function EditorShell() {
  return (
    <div className="flex h-full flex-col bg-editor-bg">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col">
          <TabsBar />
          <div className="min-h-0 flex-1">
            <EditorPane />
          </div>
        </main>
        <Sidebar />
        <ActivityBar />
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
