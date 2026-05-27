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
      <div className="w-full max-w-md rounded-3xl border border-border/50 bg-card/60 backdrop-blur p-7 boty-shadow">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Iniciar sesión</h1>
            <p className="text-sm text-muted-foreground mt-1">Accede para ver tu carrito y compras.</p>
          </div>
          <Link href="/shop" className="text-sm text-primary hover:underline">
            Volver
          </Link>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Usuario"
              className="border border-border/50 bg-background/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Contraseña"
              className="border border-border/50 bg-background/40 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}
          {success && <div className="text-sm text-primary">¡Bienvenido/a! Redirigiendo…</div>}

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-full bg-primary text-primary-foreground rounded-full py-3 font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed boty-transition"
          >
            {submitting ? "Entrando…" : "Entrar"}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-2">
            *Demo sin backend. Esto solo valida campos y simula login.
          </p>
        </form>
      </div>
    </main>
  );
}

