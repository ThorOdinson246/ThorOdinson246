"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/store";
import { tabToPath, pathToTab, normalizePath } from "@/lib/routes";
import { defaultActiveTabId } from "@/lib/fileRegistry";

export function UrlSync() {
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const openFile = useEditorStore((s) => s.openFile);
  const setActiveTab = useEditorStore((s) => s.setActiveTab);

  useEffect(() => {
    const initial = pathToTab[normalizePath(window.location.pathname)];
    if (initial) openFile(initial);

    function onPop() {
      const tab = pathToTab[normalizePath(window.location.pathname)];
      if (tab) openFile(tab);
      else setActiveTab(defaultActiveTabId);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [openFile, setActiveTab]);

  useEffect(() => {
    if (!activeTabId) return;
    const target = tabToPath[activeTabId] ?? "/";
    if (normalizePath(window.location.pathname) !== normalizePath(target)) {
      window.history.pushState(null, "", target);
    }
  }, [activeTabId]);

  return null;
}
