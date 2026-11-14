import type { NextConfig } from "next";

// Vazio em domínio próprio; "/nome-do-repo" em usuario.github.io/nome-do-repo/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Lê a tabela site_content (somente leitura, chave publicável) e devolve um JSON
 * que é embutido no site como process.env.CONTENT_SNAPSHOT.
 * - CONTENT_SNAPSHOT=off (testes) ou sem variáveis: usa os valores do código.
 * - Falha de leitura: no GitHub (CI) interrompe o build; localmente só avisa.
 */
async function fetchContentSnapshot(): Promise<string> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (process.env.CONTENT_SNAPSHOT === "off" || !url || !key) return "{}";

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/site_content?select=key,value`, {
      headers: { apikey: key },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = (await res.json()) as { key: string; value: unknown }[];
    console.log(`[conteudo] ${rows.length} bloco(s) lido(s) do Supabase`);
    return JSON.stringify(Object.fromEntries(rows.map((r) => [r.key, r.value])));
  } catch (error) {
    const message = `[conteudo] falha ao ler o Supabase: ${(error as Error).message}`;
    if (process.env.CI) {
      throw new Error(`${message}. Build interrompido para não publicar dados desatualizados.`);
    }
    console.warn(`${message}. Usando os valores do código.`);
    return "{}";
  }
}

export default async function config(): Promise<NextConfig> {
  return {
    output: "export",
    trailingSlash: true,
    basePath,
    images: { unoptimized: true },
    env: { CONTENT_SNAPSHOT: await fetchContentSnapshot() },
  };
}
