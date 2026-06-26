import BoardCard from "./BoardCard";

export default function BoardColumn({
  title,
  applications,
}: {
  title: string;
  applications: any[];
}) {
  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="
            text-xl
            font-semibold
            uppercase
            tracking-wide
            text-[#3d3d3a]
          "
        >
          {title}
        </h2>

        <span
          className="
            bg-white
            rounded-full
            px-3
            py-1
            text-sm
            font-medium
            text-[#3d3d3a]
          "
        >
          {applications.length}
        </span>
      </div>

      {applications.length > 0 && (
        <div
          className="
      bg-[#f5f4ed]
      rounded-3xl
      p-4
      space-y-4
    "
        >
          {applications.map((app) => (
            <BoardCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}
