import { JobApplication } from "@prisma/client";

export default function BoardCard({
  application,
}: {
  application: JobApplication;
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-5
        min-h-[140px]
        hover:shadow-md
        transition
        flex
        flex-col
      "
    >
      <div>
        <h3 className="text-2xl font-semibold text-[#3d3d3a]">
          {application.company}
        </h3>

        <p className="mt-2 text-lg text-gray-600">{application.role}</p>
      </div>

      <div className="mt-auto space-y-2">
        {application.salaryMin && application.salaryMax && (
          <p className="text-md mt-2 font-medium text-[#3d3d3a]">
            ₹{application.salaryMin / 1000}k – ₹{application.salaryMax / 1000}k
          </p>
        )}

        <p className="text-sm text-gray-400">
          {new Date(application.appliedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
