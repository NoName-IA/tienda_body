"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSubmit = useMemo(() => {
    return username.trim().length > 0 && password.trim().length > 0 && !submitting;
  }, [username, password, submitting]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError("Ingresa usuario y contraseña.");
      return;
    }

    // Mock login (sin backend). Solo simula flujo.
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));

    setSubmitting(false);
    setSuccess(true);

    // Redirigir a shop después de un breve delay.
    setTimeout(() => {
      router.push("/shop");
    }, 900);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="relative w-full max-w-md rounded-3xl border border-border/60 bg-[#3B5B3A]/15 dark:bg-[#8B9A6D]/20 backdrop-blur-xl p-8 boty-shadow overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,91,58,0.45),_transparent_60%)]" />
          <div className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full bg-[#4F5B3A]/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#6B6560]/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 border border-white/15 dark:border-white/5 rounded-3xl" />


          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="font-serif text-3xl text-foreground">Sign in</h1>
                <p className="text-sm text-muted-foreground mt-1">Access your cart and purchases.</p>
              </div>
              <Link href="/shop" className="text-sm text-primary hover:underline">
                Back
              </Link>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Gmail"
                  className="border border-border/60 bg-background/30 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="border border-border/60 bg-background/30 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}
              {success && <div className="text-sm text-primary">Welcome! Redirecting…</div>}

              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 w-full bg-primary text-primary-foreground rounded-full py-3 font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed boty-transition"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

            </form>
          </div>
        </div>
    </main>
  );
}

