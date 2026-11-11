import { describe, expect, it } from "vitest";
import { institutions, practiceAreas } from "./pages";

describe("vínculos institucionais", () => {
  it("têm nome, sigla e link https", () => {
    for (const inst of institutions) {
      expect(inst.name.trim(), inst.url).not.toBe("");
      expect(inst.short.trim(), inst.url).not.toBe("");
      expect(inst.url).toMatch(/^https:\/\/[^\s]+$/);
      expect(inst.name).not.toContain("PREENCHER");
    }
  });

  it("não se repetem", () => {
    const urls = institutions.map((i) => i.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("áreas de atuação", () => {
  it("cada grupo tem título e itens", () => {
    expect(practiceAreas.length).toBeGreaterThan(0);
    for (const area of practiceAreas) {
      expect(area.title.trim()).not.toBe("");
      expect(area.items.length, area.title).toBeGreaterThan(0);
    }
  });

  it("nenhuma condição aparece em dois grupos", () => {
    const all = practiceAreas.flatMap((a) => a.items);
    expect(new Set(all).size).toBe(all.length);
  });

  it("não lista Hemoterapia nem Clínica Médica como área", () => {
    const text = practiceAreas.flatMap((a) => [a.title, ...a.items]).join(" ");
    expect(text).not.toMatch(/Hemoterapia|Clínica Médica/);
  });
});
