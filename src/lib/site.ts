/**
 * Configuração de URL do site.
 *
 * BASE_PATH: vazio em domínio próprio; "/nome-do-repo" em usuario.github.io/nome-do-repo/.
 * É a mesma variável lida pelo next.config.ts (basePath).
 *
 * SITE_URL: URL pública completa, sem barra final (usada em canonical, sitemap e JSON-LD).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

/**
 * Prefixa o basePath em caminhos internos usados fora do <Link> do Next
 * (por exemplo <img src>, href de arquivos em /public, metadados).
 * URLs externas e âncoras passam sem alteração.
 */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("#")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

/**
 * Controle de indexação. Mantido falso até a publicação com conteúdo real:
 * enquanto falso, o <meta robots> e o robots.txt pedem que nada seja indexado.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
