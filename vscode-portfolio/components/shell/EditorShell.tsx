"use client";

import clsx from "clsx";
import { TitleBar } from "./TitleBar";
import { ActivityBar } from "./ActivityBar";
import { Sidebar } from "./Sidebar";
import { TabsBar } from "./TabsBar";
import { EditorPane } from "./EditorPane";
import { StatusBar } from "./StatusBar";
import { CommandPalette } from "./CommandPalette";

export function EditorShell({ rounded = false }: { rounded?: boolean }) {
  return (
    <div className={clsx("flex h-full flex-col bg-editor-bg", rounded && "overflow-hidden rounded-xl")}>
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
