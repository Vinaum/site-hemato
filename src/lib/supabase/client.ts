import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Calculado na publicação: igual no servidor e no navegador. */
export const isSupabaseConfigured = Boolean(url && key);

let client: SupabaseClient | null = null;

/** Cliente do navegador, só com a chave publicável. Usar apenas em efeitos e eventos. */
export function getSupabase(): SupabaseClient | null {
  if (!url || !key) return null;
  if (key.startsWith("sb_secret_")) {
    throw new Error("Chave secreta configurada no site. Use somente a chave publicável (sb_publishable_).");
  }
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return client;
}
