import { describe, expect, it } from "vitest";
import { publications, type Publication } from "@/content/publications";
import {
  doiUrl,
  groupByYear,
  publicationLink,
  sortPublications,
  validatePublication,
} from "./publications";

const base: Publication = {
  title: "Título B",
  authors: "Autor A, Autor B",
  venue: "Revista X",
  year: 2023,
  type: "artigo",
};

describe("conteúdo de publications.ts", () => {
  it("todas as publicações cadastradas são válidas", () => {
    for (const p of publications) {
      expect(validatePublication(p), `"${p.title}"`).toEqual([]);
    }
  });
});

describe("doiUrl", () => {
  it("monta o link canônico", () => {
    expect(doiUrl("10.1234/abc.567")).toBe("https://doi.org/10.1234/abc.567");
  });

  it("aceita o DOI já em forma de link", () => {
    expect(doiUrl("https://doi.org/10.1234/abc")).toBe("https://doi.org/10.1234/abc");
    expect(doiUrl(" http://dx.doi.org/10.1234/abc ")).toBe("https://doi.org/10.1234/abc");
  });

  it.each(["", "1234/abc", "10.12/abc", "doi:10.1234/abc", "10.1234/"])(
    "rejeita %s",
    (doi) => {
      expect(doiUrl(doi)).toBeNull();
    },
  );
});

describe("publicationLink", () => {
  it("prefere o DOI, aceita https e recusa http", () => {
    expect(publicationLink({ doi: "10.1234/abc", url: "https://x.org" })).toBe(
      "https://doi.org/10.1234/abc",
    );
    expect(publicationLink({ url: "https://pubmed.ncbi.nlm.nih.gov/1/" })).toBe(
      "https://pubmed.ncbi.nlm.nih.gov/1/",
    );
    expect(publicationLink({ url: "http://inseguro.org" })).toBeNull();
    expect(publicationLink({})).toBeNull();
  });
});

describe("ordenação e agrupamento", () => {
  const list = [
    { ...base, title: "Título B", year: 2023 },
    { ...base, title: "Título A", year: 2023 },
    { ...base, title: "Título C", year: 2025 },
  ];

  it("ordena do mais recente para o mais antigo", () => {
    expect(sortPublications(list).map((p) => p.title)).toEqual([
      "Título C",
      "Título A",
      "Título B",
    ]);
  });

  it("agrupa por ano", () => {
    expect(groupByYear(list).map(([y, ps]) => [y, ps.length])).toEqual([
      [2025, 1],
      [2023, 2],
    ]);
  });
});

describe("validatePublication", () => {
  it("aponta campos vazios, placeholders, ano e DOI inválidos", () => {
    const errors = validatePublication(
      { ...base, title: "", venue: "[PREENCHER: revista]", year: 1890, doi: "abc" },
      2026,
    );
    expect(errors).toEqual([
      "title vazio",
      "venue com placeholder",
      "ano inválido: 1890",
      "DOI inválido: abc",
    ]);
  });
});
