import { afterEach, describe, expect, it, vi } from "vitest";

// BASE_PATH e SITE_URL são lidos na importação; recarregamos o módulo a cada teste.
async function load(env: Record<string, string>) {
  vi.resetModules();
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  return import("./site");
}

afterEach(() => vi.unstubAllEnvs());

describe("withBase", () => {
  it("prefixa o basePath em caminhos internos", async () => {
    const { withBase } = await load({ NEXT_PUBLIC_BASE_PATH: "/site-hematologista" });
    expect(withBase("/favicon.ico")).toBe("/site-hematologista/favicon.ico");
    expect(withBase("images/foto.webp")).toBe("/site-hematologista/images/foto.webp");
  });

  it("não altera nada sem basePath", async () => {
    const { withBase } = await load({ NEXT_PUBLIC_BASE_PATH: "" });
    expect(withBase("/favicon.ico")).toBe("/favicon.ico");
  });

  it("preserva URLs externas e âncoras", async () => {
    const { withBase } = await load({ NEXT_PUBLIC_BASE_PATH: "/site-hematologista" });
    expect(withBase("https://exemplo.com/a")).toBe("https://exemplo.com/a");
    expect(withBase("//cdn.exemplo.com/a.js")).toBe("//cdn.exemplo.com/a.js");
    expect(withBase("#conteudo")).toBe("#conteudo");
  });
});

describe("SITE_URL", () => {
  it("remove a barra final", async () => {
    const { SITE_URL } = await load({ NEXT_PUBLIC_SITE_URL: "https://exemplo.com.br/" });
    expect(SITE_URL).toBe("https://exemplo.com.br");
  });
});
