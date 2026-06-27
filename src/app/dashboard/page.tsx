import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import AddApplicationButton from "@/components/application/AddApplicationButton";
import BoardClient from "@/components/board/BoardClient";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const applications = await prisma.jobApplication.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      history: {
        orderBy: {
          changedAt: "desc",
        },
      },
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

  const applied = applications.filter((app) => app.status === "APPLIED");

  const phoneScreen = applications.filter(
    (app) => app.status === "PHONE_SCREEN",
  );

  const interview = applications.filter((app) => app.status === "INTERVIEW");

  const offer = applications.filter((app) => app.status === "OFFER");

  const rejected = applications.filter((app) => app.status === "REJECTED");

  return (
    <main className="min-h-screen p-10 bg-[rgb(250,249,245)]">
      <Header />
      <div className="mt-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Job Applications</h1>

          <p className="mt-2 text-lg text-[#3d3d3a]">
            Welcome back, {session.user.name}
          </p>
        </div>

        <AddApplicationButton />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        <StatCard title="Total" value={stats.total} />

        <StatCard title="Applied" value={stats.applied} />

        <StatCard title="Interviews" value={stats.interviews} />

        <StatCard
          title="Offers"
          value={stats.offers}
          valueColor="text-green-600"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          valueColor="text-red-500"
        />
      </div>

      <div className="mt-10">
        <BoardClient
          applied={applied}
          phoneScreen={phoneScreen}
          interview={interview}
          offer={offer}
          rejected={rejected}
        />
      </div>
    </main>
  );
}
