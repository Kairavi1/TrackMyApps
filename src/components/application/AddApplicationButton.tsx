"use client";

import { useState } from "react";
import { PlusIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddApplicationButton() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;

    setLoading(true);

    const form = new FormData(formElement);

    await fetch("/api/applications", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        company: form.get("company"),
        role: form.get("role"),
        link: form.get("link"),
        salaryMin: form.get("salaryMin"),
        salaryMax: form.get("salaryMax"),
        notes: form.get("notes"),
      }),
    });

    formElement.reset();

    setLoading(false);

    setOpen(false);

    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          bg-white
          rounded-xl
          px-6
          py-4
          border-2
          text-xl
          font-semibold
          hover:shadow-md
          transition
          flex
          items-center
          gap-2
        "
      >
        <PlusIcon size={18} strokeWidth={3} />
        Add Application
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30"
          />

          <div
            className="
              relative
              z-10
              bg-white
              rounded-2xl
              w-[900px]
              shadow-xl
              p-8
            "
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold">Add Application</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Track your job application details
                </p>
              </div>

              <button onClick={() => setOpen(false)} className="text-gray-500">
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-md font-medium text-[#3d3d3a]">
                  Company <span className="text-red-500">*</span>
                </label>

                <input
                  name="company"
                  required
                  placeholder="e.g. Amazon"
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div>
                <label className="text-md font-medium text-[#3d3d3a]">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  name="role"
                  required
                  placeholder="e.g. Software Developer"
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div className="col-span-2">
                <label className="text-md font-medium text-[#3d3d3a]">
                  Job URL
                </label>

                <input
                  name="link"
                  placeholder="e.g. https://amazon.jobs/..."
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div>
                <label className="text-md font-medium text-[#3d3d3a]">
                  Minimum Salary
                </label>

                <input
                  name="salaryMin"
                  type="number"
                  placeholder="e.g. 80000"
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div>
                <label className="text-md font-medium text-[#3d3d3a]">
                  Maximum Salary
                </label>

                <input
                  name="salaryMax"
                  type="number"
                  placeholder="e.g. 120000"
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div className="col-span-2">
                <label className="text-md font-medium text-[#3d3d3a]">
                  Notes
                </label>

                <textarea
                  name="notes"
                  placeholder="Referral from John, role looks like a great fit"
                  className="
                    mt-2
                    w-full
                    border
                    rounded-xl
                    p-3
                    h-28
                    placeholder:text-gray-400
                  "
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    px-6
                    py-3
                    rounded-xl
                    border-2
                    font-semibold
                    text-[#3d3d3a]
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
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
                  {loading ? "Saving..." : "Add Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
