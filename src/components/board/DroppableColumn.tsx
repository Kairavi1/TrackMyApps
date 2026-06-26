"use client";

import { useDroppable } from "@dnd-kit/core";

export default function DroppableColumn({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-3xl
        min-h-full
        transition-all
        duration-200
        ease-out
        ${isOver ? "bg-[#ebe7d8] scale-[1.01]" : "bg-transparent"}
      `}
    >
      {children}
    </div>
  );
}
