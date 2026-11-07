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
export const publications: Publication[] = [
  {
    title:
      "Real-World Data for FLT3-Mutated Acute Myeloid Leukemia Patients Treated in Resource-Constrained Settings",
    authors: "Silva WF, Mendes FR, Sartori M, Madeira MIA, Pagnano KB, Gloria ABF, et al.",
    venue: "Blood. 2023;142(Suppl 1):5839-5841. 65th ASH Annual Meeting Abstracts",
    year: 2023,
    type: "resumo",
    doi: "10.1182/blood-2023-187902",
  },
];
