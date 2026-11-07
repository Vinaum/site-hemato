export type PublicationType = "artigo" | "capitulo" | "resumo" | "outro";

export type Publication = {
  /** Título exatamente como publicado. */
  title: string;
  /** Autores como aparecem na citação original. */
  authors: string;
  /** Revista, livro ou evento. */
  venue: string;
  year: number;
  type: PublicationType;
  /** Só o identificador, sem "https://doi.org/". Ex.: 10.1234/abcd.5678 */
  doi?: string;
  /** Link https quando não houver DOI (PubMed, SciELO, revista). */
  url?: string;
};

export const publicationTypeLabel: Record<PublicationType, string> = {
  artigo: "Artigo",
  capitulo: "Capítulo de livro",
  resumo: "Resumo em evento",
  outro: "Publicação",
};

/**
 * SOMENTE publicações confirmadas pelo médico.
 * O item "Publicações" aparece no menu e no sitemap quando esta lista não estiver vazia.
 *
 * Formato de cada item:
 * {
 *   title: "Título do trabalho",
 *   authors: "Sobrenome AB, Sobrenome CD, ...",
 *   venue: "Nome da revista",
 *   year: 2024,
 *   type: "artigo",
 *   doi: "10.xxxx/xxxxx",
 * },
 */
export const publications: Publication[] = [];
