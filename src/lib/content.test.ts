import { describe, expect, it } from "vitest";
import {
  contactToForm,
  formToContact,
  parseContactInfo,
  readSnapshot,
  validateContact,
  withRemoteContact,
  type ContactInfo,
} from "./content";

const valid: ContactInfo = {
  whatsapp: "5518991061661",
  whatsappMessage: "Olá!",
  phone: null,
  phoneDisplay: null,
  email: null,
  instagram: null,
  address: "Rua A, 1",
  hours: null,
};

describe("parseContactInfo", () => {
  it("aceita o formato completo", () => {
    expect(parseContactInfo(valid)).toEqual(valid);
  });

  it.each<[string, unknown]>([
    ["nulo", null],
    ["lista", []],
    ["campo faltando", { ...valid, hours: undefined }],
    ["campo extra", { ...valid, extra: "x" }],
    ["número no lugar de texto", { ...valid, address: 123 }],
    ["WhatsApp fora do formato", { ...valid, whatsapp: "18991061661" }],
    ["telefone fora do formato", { ...valid, phone: "(18) 3333-4444" }],
    ["e-mail inválido", { ...valid, email: "sem-arroba" }],
    ["Instagram de outro site", { ...valid, instagram: "https://exemplo.com/perfil" }],
    ["mensagem vazia", { ...valid, whatsappMessage: "" }],
    ["endereço longo demais", { ...valid, address: "x".repeat(201) }],
  ])("recusa %s", (_nome, value) => {
    expect(parseContactInfo(value)).toBeNull();
  });
});

describe("readSnapshot", () => {
  it("tolera ausência e texto inválido", () => {
    expect(readSnapshot(undefined)).toEqual({});
    expect(readSnapshot("não é json")).toEqual({});
    expect(readSnapshot("[1,2]")).toEqual({});
  });
});

describe("withRemoteContact", () => {
  const defaults = { ...valid, mapUrl: "https://maps.example/x" };

  it("usa os valores do banco quando válidos e preserva os campos do código", () => {
    const raw = JSON.stringify({ contact_info: { ...valid, hours: "Seg a sex" } });
    const result = withRemoteContact(defaults, raw);
    expect(result.hours).toBe("Seg a sex");
    expect(result.mapUrl).toBe("https://maps.example/x");
  });

  it("mantém os valores do código quando o banco está vazio ou inválido", () => {
    expect(withRemoteContact(defaults, "{}")).toEqual(defaults);
    expect(withRemoteContact(defaults, JSON.stringify({ contact_info: { whatsapp: "1" } }))).toEqual(defaults);
  });
});

describe("formulário do painel", () => {
  it("converte ida e volta sem perder dados", () => {
    expect(formToContact(contactToForm(valid))).toEqual(valid);
  });

  it("texto vazio vira null e números perdem a formatação", () => {
    const form = { ...contactToForm(valid), whatsapp: "+55 (18) 99106-1661", hours: "   " };
    const c = formToContact(form);
    expect(c.whatsapp).toBe("5518991061661");
    expect(c.hours).toBeNull();
  });

  it("aponta o erro no campo certo", () => {
    const errors = validateContact({ ...valid, email: "x", whatsappMessage: " " });
    expect(Object.keys(errors).sort()).toEqual(["email", "whatsappMessage"]);
  });
});
