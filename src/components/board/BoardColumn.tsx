"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableCard from "./SortableCard";
import DroppableColumn from "./DroppableColumn";

type BoardColumnProps = {
  title: string;
  status: string;
  applications: any[];
  onCardClick: (application: any) => void;
};

export default function BoardColumn({
  title,
  status,
  applications,
  onCardClick,
}: BoardColumnProps) {
  return (
    <div className="flex-1 min-w-[320px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold uppercase tracking-wide text-[#3d3d3a]">
          {title}
        </h2>

        <span className="bg-white rounded-full px-3 py-1 text-sm font-medium text-[#3d3d3a]">
          {applications.length}
        </span>
      </div>

      <DroppableColumn id={status}>
        {applications.length > 0 && (
          <div
            className="
        bg-[#f5f4ed]
        rounded-3xl
        p-4
        space-y-4
        transition-colors
        duration-200
      "
          >
            <SortableContext
              items={applications.map((app) => app.id)}
              strategy={verticalListSortingStrategy}
            >
              {applications.map((app) => (
                <SortableCard
                  key={app.id}
                  application={app}
                  onClick={() => onCardClick(app)}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </DroppableColumn>
    </div>
  );
}
