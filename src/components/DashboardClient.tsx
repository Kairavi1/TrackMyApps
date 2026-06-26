"use client";

import { useState } from "react";
import ApplicationFilters from "./ApplicationFilters";
import ApplicationCard from "./application/ApplicationCard";

export default function DashboardClient({ applications }: any) {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const filtered = applications.filter((app: any) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !status || app.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <ApplicationFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="mt-2 grid gap-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No applications found</p>
        ) : (
          filtered.map((app: any) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        )}
      </div>
    </>
  );
}
