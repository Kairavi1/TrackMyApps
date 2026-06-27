import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  BriefcaseBusiness,
  LayoutDashboard,
  ChartBarBig,
  History,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(250,249,245)] overflow-y-auto">
      <header className="sticky mt-5 top-1 w-[95%] mx-auto z-10">
        <div className="h-22 bg-white rounded-xl shadow-md border px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-5 font-semibold text-2xl tracking-tight"
          >
            <BriefcaseBusiness size={28} strokeWidth={4} />
            TrackMyApps
          </Link>

          <form
            action={async () => {
              "use server";

              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <Button
              variant="outline"
              className="text-lg px-3 py-6 bg-transparent border hover:bg-[#faf9f5] flex items-center gap-3"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in
            </Button>
          </form>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-30px)] py-10 flex flex-col items-center justify-center gap-6 text-center">
        <div className="bg-white rounded-full px-5 py-2 border flex items-center gap-2 text-md font-medium text-gray-600">
          <span className="w-2.5 h-2.5 bg-[#556b2f] rounded-full" />
          Production-grade · CI/CD · Monitored
        </div>

        <h1 className="text-7xl font-bold leading-tight max-w-4xl">
          Your job search,
          <br />
          finally under control
        </h1>

        <p className="text-lg font-semibold text-gray-500 max-w-2xl leading-relaxed">
          Stop losing track of applications in spreadsheets.
          <br />
          TrackMyApps keeps your pipeline organized from first
          <br />
          apply to signed offer.
        </p>

        <form
          action={async () => {
            "use server";

            await signIn("google", {
              redirectTo: "/dashboard",
            });
          }}
        >
          <Button className="mt-4 h-14 px-10 rounded-xl text-lg font-semibold bg-white text-[#3d3d3a] border border-[#3d3d3a]/20 hover:bg-[#faf9f5] flex items-center gap-3 shadow-sm">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Start Tracking with Google
          </Button>
        </form>

        <p className="mt-3 text-md text-gray-500 font-medium">
          Free to use · No credit card required
        </p>
      </section>

      {/* NEXT SECTION */}
      <section className="min-h-screen -mt-50 flex flex-col items-center justify-center gap-8 text-center">
        <p className="mt-3 text-xl font-medium leading-loose">
          <span className="text-gray-800">
            Here's what your pipeline looks like
          </span>

          <br />

          <span className="text-gray-500">
            Every application in one place, moving through stages as you
            progress.
          </span>
        </p>
        <div className="w-[95%] max-w-[1600px] rounded-3xl border bg-white shadow-2xl overflow-hidden">
          <Image
            src="/db-preview.png"
            alt="TrackMyApps dashboard"
            width={2200}
            height={1200}
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[95%] max-w-[1600px] mt-10">
          <div
            className="bg-[rgb(250,249,245)] border border-gray-200 rounded-3xl p-10 text-left
    transition-all duration-300 ease-out
    shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]
    hover:-translate-y-3
    hover:rotate-1"
          >
            <LayoutDashboard
              size={34}
              strokeWidth={3}
              className="mb-6 text-gray-800"
            />

            <h3 className="text-2xl font-bold text-gray-800">Kanban Board</h3>

            <p className="mt-3 text-gray-500 text-lg leading-relaxed">
              Drag cards through every stage of your pipeline.
            </p>

            <div className="mt-8 h-1 w-14 rounded-full bg-[#556b2f]" />
          </div>

          <div
            className="bg-[rgb(250,249,245)] border border-gray-200 rounded-3xl p-10 text-left
    transition-all duration-300 ease-out
    shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]
    hover:-translate-y-3
    hover:-rotate-1"
          >
            <ChartBarBig
              size={34}
              strokeWidth={3}
              className="mb-6 text-gray-800"
            />

            <h3 className="text-2xl font-bold text-gray-800">Analytics</h3>

            <p className="mt-3 text-gray-500 text-lg leading-relaxed">
              Response rates, time-to-reply, conversion by stage.
            </p>

            <div className="mt-8 h-1 w-14 rounded-full bg-[#556b2f]" />
          </div>

          <div
            className="bg-[rgb(250,249,245)] border border-gray-200 rounded-3xl p-10 text-left
    transition-all duration-300 ease-out
    shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    hover:shadow-[0_30px_80px_rgba(0,0,0,0.22)]
    hover:-translate-y-3
    hover:rotate-1"
          >
            <History size={34} strokeWidth={3} className="mb-6 text-gray-800" />

            <h3 className="text-2xl font-bold text-gray-800">Stage history</h3>

            <p className="mt-3 text-gray-500 text-lg leading-relaxed">
              Every status change logged with a timestamp.
            </p>

            <div className="mt-8 h-1 w-14 rounded-full bg-[#556b2f]" />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-[95%] -mt-20 max-w-[1600px] mx-auto py-24">
        <div className="h-px bg-gray-200 w-full" />

        <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Ready to bring order to your search?
          </h2>
          <p className="text-xl text-gray-500 font-medium max-w-xl">
            Sign in with Google and start tracking in under a minute.
          </p>

          <form
            action={async () => {
              "use server";

              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <Button
              className="mt-4 h-14 px-10 rounded-xl text-lg font-semibold 
        bg-white text-[#3d3d3a] 
        border border-[#3d3d3a]/20 
        hover:bg-[#faf9f5]
        flex items-center gap-3
        shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-6 h-6"
              />
              Start Tracking
            </Button>
          </form>
        </div>

        <div className="h-px bg-gray-300 w-full" />
      </section>
      <footer className="w-[95%] -mt-25 max-w-[1600px] mx-auto py-10 flex items-center justify-between">
        <div className="flex items-center gap-3 text-2xl font-semibold text-[#898781]">
          <BriefcaseBusiness size={28} strokeWidth={2} />
          TrackMyApps
        </div>

        <div className="flex items-center gap-8 text-[#898781] font-medium text-lg">
          <span>Built in public</span>

          <a
            href="https://github.com/Kairavi1/TrackMyApps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-800 transition"
          >
            GitHub
            <ExternalLink size={18} strokeWidth={2.5} />
          </a>
        </div>
      </footer>
    </main>
  );
}
