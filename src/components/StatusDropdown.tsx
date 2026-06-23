"use client";

import { useRouter } from "next/navigation";
import { ApplicationStatus } from "@prisma/client";

export default function StatusDropdown({
  id,
  status,
}: {
  id: string;
  status: ApplicationStatus;
}) {
  const router = useRouter();

  async function updateStatus(e: React.ChangeEvent<HTMLSelectElement>) {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status: e.target.value,
      }),
    });

    router.refresh();
  }

  return (
    <select
      value={status}
      onChange={updateStatus}
      className="border rounded p-2"
    >
      <option value="APPLIED">APPLIED</option>

      <option value="PHONE_SCREEN">PHONE SCREEN</option>

      <option value="INTERVIEW">INTERVIEW</option>

      <option value="OFFER">OFFER</option>

      <option value="REJECTED">REJECTED</option>
    </select>
  );
}
