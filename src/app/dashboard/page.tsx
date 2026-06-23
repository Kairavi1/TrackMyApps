import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddApplication from "@/components/AddApplication";
import DashboardClient from "@/components/DashboardClient";
import Header from "@/components/Header";

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

  const stats = {
    total: applications.length,

    applied: applications.filter((app) => app.status === "APPLIED").length,

    interviews: applications.filter((app) => app.status === "INTERVIEW").length,

    offers: applications.filter((app) => app.status === "OFFER").length,

    rejected: applications.filter((app) => app.status === "REJECTED").length,
  };

  return (
    <main className="min-h-screen p-10 bg-[rgb(250,249,245)]">
      <Header />
      <h1 className="text-3xl font-bold">TrackMyApps Dashboard</h1>

      <p className="mt-2">Welcome {session.user.name}</p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        <div className="border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">Total</h3>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">Applied</h3>
          <p className="text-3xl font-bold">{stats.applied}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">Interviews</h3>
          <p className="text-3xl font-bold">{stats.interviews}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">Offers</h3>
          <p className="text-3xl font-bold">{stats.offers}</p>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="text-sm text-gray-500">Rejected</h3>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
      </div>

      <AddApplication />

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Your Applications</h2>

        {applications.length === 0 ? (
          <p className="mt-4 text-gray-500">No applications yet.</p>
        ) : (
          <div className="mt-4 grid gap-4">
            <DashboardClient applications={applications} />
          </div>
        )}
      </div>
    </main>
  );
}
