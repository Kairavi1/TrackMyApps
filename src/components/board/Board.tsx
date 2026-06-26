"use client";

import { useMemo, useState } from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import BoardColumn from "./BoardColumn";
import BoardCard from "./BoardCard";

type BoardProps = {
  applied: any[];
  phoneScreen: any[];
  interview: any[];
  offer: any[];
  rejected: any[];
};

export default function Board({
  applied,
  phoneScreen,
  interview,
  offer,
  rejected,
}: BoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const [columns, setColumns] = useState({
    APPLIED: applied,
    PHONE_SCREEN: phoneScreen,
    INTERVIEW: interview,
    OFFER: offer,
    REJECTED: rejected,
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCard = useMemo(() => {
    if (!activeId) return null;

    return Object.values(columns)
      .flat()
      .find((card) => card.id === activeId);
  }, [activeId, columns]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    const { active, over } = event;

    if (!over) return;

    setColumns((prev) => {
      const sourceColumn = Object.keys(prev).find((status) =>
        prev[status as keyof typeof prev].some((card) => card.id === active.id),
      ) as keyof typeof prev | undefined;

      if (!sourceColumn) return prev;

      const destinationColumn = Object.keys(prev).find(
        (status) =>
          status === over.id ||
          prev[status as keyof typeof prev].some((card) => card.id === over.id),
      ) as keyof typeof prev | undefined;

      if (!destinationColumn) return prev;

      if (sourceColumn === destinationColumn) {
        return prev;
      }

      const movedCard = prev[sourceColumn].find(
        (card) => card.id === active.id,
      );

      if (!movedCard) return prev;

      return {
        ...prev,

        [sourceColumn]: prev[sourceColumn].filter(
          (card) => card.id !== active.id,
        ),

        [destinationColumn]: [
          ...prev[destinationColumn],
          {
            ...movedCard,
            status: destinationColumn,
          },
        ],
      };
    });
  }

  return (
    <DndContext
      id="kanban-board"
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-4">
        <BoardColumn
          title="Applied"
          status="APPLIED"
          applications={columns.APPLIED}
        />

        <BoardColumn
          title="Phone Screen"
          status="PHONE_SCREEN"
          applications={columns.PHONE_SCREEN}
        />

        <BoardColumn
          title="Interview"
          status="INTERVIEW"
          applications={columns.INTERVIEW}
        />

        <BoardColumn
          title="Offer"
          status="OFFER"
          applications={columns.OFFER}
        />

        <BoardColumn
          title="Rejected"
          status="REJECTED"
          applications={columns.REJECTED}
        />
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="rotate-2 opacity-95 cursor-grabbing">
            <BoardCard application={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
