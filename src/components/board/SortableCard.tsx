"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BoardCard from "./BoardCard";

export default function SortableCard({ application }: { application: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: application.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ?? "transform 250ms cubic-bezier(0.2, 0, 0, 1)",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        touch-none
        cursor-grab
        active:cursor-grabbing
      "
    >
      <BoardCard application={application} />
    </div>
  );
}
