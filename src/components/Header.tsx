import { auth } from "@/auth";
import Link from "next/link";
import { BriefcaseBusiness, LayoutDashboard, ChartBarBig } from "lucide-react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-1 w-[100%] mx-auto -mt-6">
      <div className="h-22 mb-5 bg-white rounded-xl shadow-md border px-6 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="flex items-center gap-5 font-semibold text-2xl tracking-tight"
        >
          <BriefcaseBusiness size={28} strokeWidth={4} />
          TrackMyApps
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/board"
              className="flex items-center gap-2 text-xl font-medium text-[#3d3d3a] hover:bg-[#faf9f5] px-4 py-2 rounded-lg transition"
            >
              <LayoutDashboard size={18} strokeWidth={3} />
              Board
            </Link>

            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-2 text-xl font-medium text-[#3d3d3a] hover:bg-[#faf9f5] px-4 py-2 rounded-lg transition"
            >
              <ChartBarBig size={18} strokeWidth={3} />
              Analytics
            </Link>
          </div>

          <div className="h-8 w-px bg-gray-400" />

          <div className="flex items-center gap-3">
            {session?.user?.image && (
              <img
                src={session.user.image}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
            )}

            <span className="text-xl font-medium text-[#3d3d3a]">
              {session?.user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
