import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">TrackMyApps Dashboard</h1>

      <p className="mt-2">Welcome {session.user.name}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Applications</h2>

        {applications.length === 0 ? (
          <p className="mt-4 text-gray-500">No applications yet.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-xl p-5">
                <h3 className="text-lg font-bold">{app.company}</h3>

                <p>{app.role}</p>

                <p className="mt-2 text-sm">
                  Status: <span className="font-semibold">{app.status}</span>
                </p>

                {app.link && (
                  <a href={app.link} target="_blank" className="text-blue-500">
                    Job Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
