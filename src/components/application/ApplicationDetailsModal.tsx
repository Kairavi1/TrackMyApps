"use client";

import { JobApplication, ApplicationStatus } from "@prisma/client";
import { ExternalLink, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ApplicationWithHistory = JobApplication & {
  history: {
    id: string;
    oldStage: ApplicationStatus;
    newStage: ApplicationStatus;
    changedAt: Date;
  }[];
};

type Props = {
  application: ApplicationWithHistory | null;
  onClose: () => void;
};

const formatStatus = (status: string) =>
  status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: "bg-blue-100 text-blue-700",

  PHONE_SCREEN: "bg-yellow-100 text-yellow-700",

  INTERVIEW: "bg-orange-100 text-orange-700",

  OFFER: "bg-green-100 text-green-700",

  REJECTED: "bg-red-100 text-red-700",
};

export default function ApplicationDetailsModal({
  application,
  onClose,
}: Props) {
  if (!application) return null;

  const applicationId = application.id;
  const initialStatus = application.status;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const [status, setStatus] = useState<ApplicationStatus>(application.status);

  async function handleDelete() {
    if (!confirm("Delete this application?")) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete application.");
      }

      onClose();
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete application.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus: ApplicationStatus) {
    if (newStatus === status) return;

    const previousStatus = status;

    setStatus(newStatus);
    setStatusLoading(true);

    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");

      setStatus(previousStatus ?? initialStatus);
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/30" />

      <div
        className="
          relative
          z-10
          flex
          h-[75vh]
          max-h-[75vh]
          w-[80vw]
          max-w-xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#3d3d3a]">
              {application.company}
            </h2>

            <p className="mt-1 text-lg text-gray-500">{application.role}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* Details */}
          <div className="p-6">
            <h3 className="mb-3 text-lg font-semibold uppercase text-gray-400">
              Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-[#3d3d3a]">
                  Status
                </span>

                <div className="flex items-center gap-3">
                  {statusLoading && (
                    <Loader2 size={18} className="animate-spin text-gray-500" />
                  )}

                  <select
                    disabled={loading || statusLoading}
                    value={status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value as ApplicationStatus)
                    }
                    className={`
      rounded-lg
      border-0
      px-4
      py-2
      text-sm
      font-semibold
      uppercase
      tracking-wide
      cursor-pointer
      focus:outline-none
      ${STATUS_COLORS[status]}
    `}
                  >
                    {Object.values(ApplicationStatus).map((value) => (
                      <option key={value} value={value}>
                        {formatStatus(value)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-[#3d3d3a]">
                  Applied
                </span>

                <span className="text-lg font-medium text-black">
                  {new Date(application.appliedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-[#3d3d3a]">
                  Salary Range
                </span>

                <span className="text-lg font-medium text-black">
                  {application.salaryMin && application.salaryMax
                    ? `₹${application.salaryMin / 1000}k – ₹${
                        application.salaryMax / 1000
                      }k`
                    : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-[#3d3d3a]">
                  Job Link
                </span>

                {application.link ? (
                  <a
                    href={application.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  >
                    View Posting
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <span className="text-lg font-medium text-black">—</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Notes */}
          <div className="p-6">
            <h3 className="mb-3 text-lg font-semibold uppercase text-gray-400">
              Notes
            </h3>

            {application.notes ? (
              <p className="text-lg leading-8 text-black">
                {application.notes}
              </p>
            ) : (
              <p className="italic text-gray-400">
                No notes have been added for this application.
              </p>
            )}
          </div>

          <div className="border-t border-gray-200" />

          {/* Status History */}
          <div className="p-6">
            <h3 className="mb-6 text-lg font-semibold uppercase text-gray-400">
              Status History
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3.5 w-3.5 rounded-full bg-[#3d3d3a]" />

                  {application.history.length > 0 && (
                    <div className="mt-2 h-10 w-px bg-gray-300" />
                  )}
                </div>

                <div>
                  <p className="font-semibold text-lg text-[#3d3d3a]">
                    {formatStatus(application.status)}
                  </p>

                  <p className="text-md text-gray-500">Current Stage</p>
                </div>
              </div>

              {application.history.map((item, index) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-400 bg-white" />

                    {index !== application.history.length - 1 && (
                      <div className="mt-2 h-10 w-px bg-gray-300" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-lg text-[#3d3d3a]">
                      {formatStatus(item.newStage)}
                    </p>

                    <p className="text-md text-gray-500">
                      {new Date(item.changedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                      {" • "}
                      from {formatStatus(item.oldStage)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <div className="h-3.5 w-3.5 rounded-full border-2 border-gray-400 bg-white" />

                <div>
                  <p className="font-medium text-lg text-[#3d3d3a]">
                    Application Created
                  </p>

                  <p className="text-md text-gray-500">
                    {new Date(application.appliedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            type="button"
            disabled={loading || statusLoading}
            onClick={onClose}
            className="rounded-xl border-2 px-6 py-3 font-semibold text-[#3d3d3a] transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading || statusLoading}
            className="
   px-6
                    py-3
                    rounded-xl
                    bg-[#3d3d3a]
                    text-white
                    font-semibold
                    hover:opacity-90
  "
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
