import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">TrackMyApps 🚀</h1>

      <p className="text-muted-foreground text-lg">
        Your production-grade job application tracker
      </p>

      <Button>Start Tracking</Button>
    </main>
  );
}
