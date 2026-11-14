"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

const input =
  "mt-2 block w-full rounded-md border border-bronze bg-surface px-4 py-3 text-ink focus:border-primary";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSupabase()
      ?.auth.getSession()
      .then(({ data }) => {
        if (data.session) router.replace("/admin/");
      });
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const sb = getSupabase();
    if (!sb) return;
    setLoading(true);
    setError(null);
    const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) {
      if (error.code === "invalid_credentials") setError("E-mail ou senha incorretos.");
      else if (error.code === "over_request_rate_limit") setError("Muitas tentativas. Aguarde alguns minutos e tente de novo.");
      else setError("Não foi possível entrar agora. Verifique a conexão e tente novamente.");
      return;
    }
    router.replace("/admin/");
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl">Área administrativa</h1>
      {!isSupabaseConfigured ? (
        <p className="mt-6">O painel não está configurado neste ambiente.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 max-w-md space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="font-medium">E-mail</label>
            <input id="email" type="email" autoComplete="email" required
              value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="senha" className="font-medium">Senha</label>
            <input id="senha" type="password" autoComplete="current-password" required
              value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
          </div>
          {error ? (
            <p role="alert" className="rounded-md border border-red-700 bg-red-50 px-4 py-3 text-red-800">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={loading || !email || !password}
            className="inline-flex min-h-12 items-center rounded-md bg-primary px-6 py-3 font-medium text-surface hover:bg-primary-dark disabled:opacity-60">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      )}
    </>
  );
}
