"use client";

import { useRef } from "react";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { useEditorStore } from "@/lib/store";
import { fileMap } from "@/lib/fileRegistry";
import { Tab } from "./Tab";

export function TabsBar() {
  const openTabIds = useEditorStore((s) => s.openTabIds);
  const activeTabId = useEditorStore((s) => s.activeTabId);
  const setActiveTab = useEditorStore((s) => s.setActiveTab);
  const closeTab = useEditorStore((s) => s.closeTab);
  const reorderTabs = useEditorStore((s) => s.reorderTabs);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = openTabIds.indexOf(String(active.id));
    const toIndex = openTabIds.indexOf(String(over.id));
    if (fromIndex === -1 || toIndex === -1) return;
    reorderTabs(fromIndex, toIndex);
  }

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (e.deltaY === 0 || !scrollRef.current) return;
    scrollRef.current.scrollLeft += e.deltaY;
  }

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className="no-scrollbar flex h-9 shrink-0 overflow-x-auto border-b border-border bg-tabsbar-bg"
    >
      <DndContext id="tabs-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={openTabIds} strategy={horizontalListSortingStrategy}>
          {openTabIds.map((id) => {
            const file = fileMap[id];
            if (!file) return null;
            return (
              <Tab
                key={id}
                file={file}
                active={activeTabId === id}
                onSelect={() => setActiveTab(id)}
                onClose={() => closeTab(id)}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
}
