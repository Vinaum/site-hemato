import { describe, expect, it } from "vitest";
import { institutions } from "./pages";

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
