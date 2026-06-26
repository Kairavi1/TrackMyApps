"use client";

import { ApplicationStatus } from "@prisma/client";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;
};

export default function ApplicationFilters({
  search,
  setSearch,
  status,
  setStatus,
}: Props) {
  return (
    <div className="flex gap-3 mt-6">
      <input
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-4 py-2"
      >
        <option value="">All Status</option>

        {Object.values(ApplicationStatus).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
