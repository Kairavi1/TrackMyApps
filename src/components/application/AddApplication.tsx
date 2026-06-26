"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddApplication() {
  const router = useRouter();

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

    router.refresh();
  }

  return (
    <div className="mt-8 border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Add Application</h2>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="company"
          placeholder="Company"
          required
          className="border rounded p-2"
        />

        <input
          name="role"
          placeholder="Role"
          required
          className="border rounded p-2"
        />

        <input
          name="link"
          placeholder="Job URL"
          className="border rounded p-2"
        />

        <input
          name="salaryMin"
          placeholder="Minimum Salary"
          type="number"
          className="border rounded p-2"
        />

        <input
          name="salaryMax"
          placeholder="Maximum Salary"
          type="number"
          className="border rounded p-2"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          className="border rounded p-2"
        />

        <button disabled={loading} className="bg-black text-white rounded p-2">
          {loading ? "Saving..." : "Add Application"}
        </button>
      </form>
    </div>
  );
}
