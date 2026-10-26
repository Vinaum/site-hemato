import { describe, expect, it } from "vitest";
import { getContactLinks, isPlaceholder, telUrl, whatsappUrl } from "./contact";

describe("isPlaceholder", () => {
  it("detecta o marcador", () => {
    expect(isPlaceholder("[PREENCHER: telefone]")).toBe(true);
    expect(isPlaceholder("(11) 3333-4444")).toBe(false);
  });
});

describe("whatsappUrl", () => {
  it("monta o link com a mensagem codificada", () => {
    expect(whatsappUrl("5511999990000", "Olá, tudo bem?")).toBe(
      "https://wa.me/5511999990000?text=Ol%C3%A1%2C%20tudo%20bem%3F",
    );
  });

  it("aceita fixo (10 dígitos após o 55)", () => {
    expect(whatsappUrl("551133334444", "Oi")).not.toBeNull();
  });

  it.each([
    ["placeholder", "[PREENCHER: WhatsApp]"],
    ["sem DDI", "11999990000"],
    ["com símbolos", "+55 (11) 99999-0000"],
    ["curto demais", "551199999"],
    ["longo demais", "55119999900001"],
    ["vazio", ""],
  ])("rejeita número %s", (_nome, numero) => {
    expect(whatsappUrl(numero, "Oi")).toBeNull();
  });
});

describe("telUrl", () => {
  it("monta o link tel: com +", () => {
    expect(telUrl("551133334444")).toBe("tel:+551133334444");
  });

  it("rejeita número inválido", () => {
    expect(telUrl("[PREENCHER: telefone]")).toBeNull();
    expect(telUrl("1133334444")).toBeNull();
  });
});

describe("getContactLinks", () => {
  it("usa /consultas/ enquanto os dados forem placeholders", () => {
    const links = getContactLinks({
      whatsapp: "[PREENCHER: WhatsApp]",
      whatsappMessage: "Oi",
      phone: "[PREENCHER: telefone]",
    });
    expect(links).toEqual({
      whatsapp: "/consultas/",
      phone: "/consultas/",
      whatsappReady: false,
      phoneReady: false,
    });
  });

  it("gera links reais com dados válidos", () => {
    const links = getContactLinks({
      whatsapp: "5511999990000",
      whatsappMessage: "Oi",
      phone: "551133334444",
    });
    expect(links).toEqual({
      whatsapp: "https://wa.me/5511999990000?text=Oi",
      phone: "tel:+551133334444",
      whatsappReady: true,
      phoneReady: true,
    });
  });
});
