import { create } from "zustand";
import { defaultOpenTabIds, defaultActiveTabId } from "./fileRegistry";

export type WindowState = "normal" | "maximized" | "minimized" | "closed";

interface EditorStore {
  openTabIds: string[];
  activeTabId: string | null;
  sidebarCollapsed: boolean;
  paletteOpen: boolean;
  expandedFolders: Set<string>;
  windowState: WindowState;
  activePanel: "explorer" | "settings" | "account";

  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (fromIndex: number, toIndex: number) => void;
  toggleSidebar: () => void;
  setPanel: (panel: "explorer" | "settings" | "account") => void;
  togglePalette: (open?: boolean) => void;
  toggleFolder: (id: string) => void;
  setWindowState: (state: WindowState) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  openTabIds: [...defaultOpenTabIds],
  activeTabId: defaultActiveTabId,
  sidebarCollapsed: false,
  paletteOpen: false,
  expandedFolders: new Set([
    "root",
    "about",
    "projects",
    "projects/research",
    "involvements",
  ]),
  windowState: "normal",
  activePanel: "explorer",

  openFile: (id) => {
    const { openTabIds } = get();
    if (!openTabIds.includes(id)) {
      set({ openTabIds: [...openTabIds, id], activeTabId: id });
    } else {
      set({ activeTabId: id });
    }
  },

  closeTab: (id) => {
    const { openTabIds, activeTabId } = get();
    const index = openTabIds.indexOf(id);
    if (index === -1) return;
    const nextTabs = openTabIds.filter((t) => t !== id);
    let nextActive = activeTabId;
    if (activeTabId === id) {
      nextActive = nextTabs[index] ?? nextTabs[index - 1] ?? null;
    }
    set({ openTabIds: nextTabs, activeTabId: nextActive });
  },

  setActiveTab: (id) => set({ activeTabId: id }),

  reorderTabs: (fromIndex, toIndex) => {
    const tabs = [...get().openTabIds];
    const [moved] = tabs.splice(fromIndex, 1);
    tabs.splice(toIndex, 0, moved);
    set({ openTabIds: tabs });
  },

  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  setPanel: (panel) =>
    set((s) => {
      if (s.activePanel === panel && !s.sidebarCollapsed) {
        return { sidebarCollapsed: true };
      }
      return { activePanel: panel, sidebarCollapsed: false };
    }),

  togglePalette: (open) => set((s) => ({ paletteOpen: open ?? !s.paletteOpen })),

  toggleFolder: (id) =>
    set((s) => {
      const next = new Set(s.expandedFolders);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { expandedFolders: next };
    }),

  setWindowState: (state) => set({ windowState: state }),
}));
