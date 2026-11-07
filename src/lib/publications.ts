import type { Publication } from "@/content/publications";

const DOI = /^10\.\d{4,9}\/\S+$/;

/** Aceita "10.x/y" ou "https://doi.org/10.x/y" e devolve a URL canônica, ou null se inválido. */
export function doiUrl(doi: string): string | null {
  const id = doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  return DOI.test(id) ? `https://doi.org/${id}` : null;
}

/** Link da publicação: DOI tem prioridade; senão, só URLs https. */
export function publicationLink(p: Pick<Publication, "doi" | "url">): string | null {
  if (p.doi) return doiUrl(p.doi);
  if (p.url && /^https:\/\/\S+$/.test(p.url)) return p.url;
  return null;
}

/** Mais recentes primeiro; no mesmo ano, ordem alfabética do título. */
export function sortPublications(list: readonly Publication[]): Publication[] {
  return [...list].sort(
    (a, b) => b.year - a.year || a.title.localeCompare(b.title, "pt-BR"),
  );
}

export function groupByYear(list: readonly Publication[]): [number, Publication[]][] {
  const groups = new Map<number, Publication[]>();
  for (const p of sortPublications(list)) {
    groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
  }
  return [...groups.entries()];
}

/** Lista de problemas encontrados; vazia quando a publicação é válida. */
export function validatePublication(
  p: Publication,
  currentYear = new Date().getFullYear(),
): string[] {
  const errors: string[] = [];
  for (const field of ["title", "authors", "venue"] as const) {
    if (!p[field]?.trim()) errors.push(`${field} vazio`);
    if (p[field]?.includes("PREENCHER")) errors.push(`${field} com placeholder`);
  }
  if (!Number.isInteger(p.year) || p.year < 1990 || p.year > currentYear + 1) {
    errors.push(`ano inválido: ${p.year}`);
  }
  if (p.doi !== undefined && doiUrl(p.doi) === null) errors.push(`DOI inválido: ${p.doi}`);
  if (p.url !== undefined && !/^https:\/\/\S+$/.test(p.url)) {
    errors.push(`URL deve começar com https://: ${p.url}`);
  }
  return errors;
}
