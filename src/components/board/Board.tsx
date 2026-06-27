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
import ApplicationDetailsModal from "../application/ApplicationDetailsModal";

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
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const activeCard = useMemo(() => {
    if (!activeId) return null;

    return Object.values(columns)
      .flat()
      .find((card) => card.id === activeId);
  }, [activeId, columns]);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);

    const { active, over } = event;

    if (!over) return;

    const previousColumns = columns;

    const sourceColumn = Object.keys(columns).find((status) =>
      columns[status as keyof typeof columns].some(
        (card) => card.id === active.id,
      ),
    ) as keyof typeof columns | undefined;

    if (!sourceColumn) return;

    const destinationColumn = Object.keys(columns).find(
      (status) =>
        status === over.id ||
        columns[status as keyof typeof columns].some(
          (card) => card.id === over.id,
        ),
    ) as keyof typeof columns | undefined;

    if (!destinationColumn) return;

    if (sourceColumn === destinationColumn) return;

    const movedCard = columns[sourceColumn].find(
      (card) => card.id === active.id,
    );

    if (!movedCard) return;

    // Optimistic UI update
    const updatedColumns = {
      ...columns,
      [sourceColumn]: columns[sourceColumn].filter(
        (card) => card.id !== active.id,
      ),
      [destinationColumn]: [
        ...columns[destinationColumn],
        {
          ...movedCard,
          status: destinationColumn,
        },
      ],
    };

    setColumns(updatedColumns);

    try {
      const res = await fetch(`/api/applications/${active.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: destinationColumn,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.error(error);

      // Revert if API fails
      setColumns(previousColumns);
    }
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
          onCardClick={(app) => {
            console.log("Selected app:", app);
            setSelectedApplication(app);
          }}
        />

        <BoardColumn
          title="Phone Screen"
          status="PHONE_SCREEN"
          applications={columns.PHONE_SCREEN}
          onCardClick={(app) => {
            console.log("Selected app:", app);
            setSelectedApplication(app);
          }}
        />

        <BoardColumn
          title="Interview"
          status="INTERVIEW"
          applications={columns.INTERVIEW}
          onCardClick={(app) => {
            console.log("Selected app:", app);
            setSelectedApplication(app);
          }}
        />

        <BoardColumn
          title="Offer"
          status="OFFER"
          applications={columns.OFFER}
          onCardClick={(app) => {
            console.log("Selected app:", app);
            setSelectedApplication(app);
          }}
        />

        <BoardColumn
          title="Rejected"
          status="REJECTED"
          applications={columns.REJECTED}
          onCardClick={(app) => {
            console.log("Selected app:", app);
            setSelectedApplication(app);
          }}
        />
      </div>

      <DragOverlay>
        {activeCard ? (
          <div className="rotate-2 opacity-95 cursor-grabbing">
            <BoardCard application={activeCard} />
          </div>
        ) : null}
      </DragOverlay>

      <ApplicationDetailsModal
        application={selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </DndContext>
  );
}
