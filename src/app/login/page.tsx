import { loginWithGoogle } from "@/actions/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <form action={loginWithGoogle}>
        <button
          className="
          border
          rounded-lg
          px-6
          py-3
          "
        >
          Sign in with Google
        </button>
      </form>
    </main>
  );
}
