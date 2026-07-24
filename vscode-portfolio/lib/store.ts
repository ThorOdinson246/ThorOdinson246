import { create } from "zustand";
import { defaultOpenTabId } from "./fileRegistry";

interface EditorStore {
  openTabIds: string[];
  activeTabId: string | null;
  sidebarCollapsed: boolean;
  paletteOpen: boolean;
  expandedFolders: Set<string>;

  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  reorderTabs: (fromIndex: number, toIndex: number) => void;
  toggleSidebar: () => void;
  togglePalette: (open?: boolean) => void;
  toggleFolder: (id: string) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  openTabIds: [defaultOpenTabId],
  activeTabId: defaultOpenTabId,
  sidebarCollapsed: false,
  paletteOpen: false,
  expandedFolders: new Set(["root", "about", "projects", "projects/personal", "projects/client", "involvements", "contact", "components"]),

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

  togglePalette: (open) => set((s) => ({ paletteOpen: open ?? !s.paletteOpen })),

  toggleFolder: (id) =>
    set((s) => {
      const next = new Set(s.expandedFolders);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { expandedFolders: next };
    }),
}));
