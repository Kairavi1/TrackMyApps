import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">TrackMyApps 🚀</h1>

      <p className="text-muted-foreground text-lg">
        Your production-grade job application tracker
      </p>

      <form
        action={async () => {
          "use server";

          await signIn("google", {
            redirectTo: "/dashboard",
          });
        }}
      >
        <Button>Start Tracking</Button>
      </form>
    </main>
  );
}
