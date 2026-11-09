import { describe, expect, it } from "vitest";
import { contact } from "@/content/site";
import { extractEmbedUrl, isValidEmbedUrl, isValidMapLink } from "./maps";

const EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1!2d-1!3d-1";

describe("isValidEmbedUrl", () => {
  it("aceita o endereço de incorporação do Google Maps", () => {
    expect(isValidEmbedUrl(EMBED)).toBe(true);
  });

  it.each([
    null,
    "",
    "http://www.google.com/maps/embed?pb=!1m18",
    "https://www.google.com/maps/place/Algum+Lugar",
    "https://exemplo.com/maps/embed?pb=!1m18",
    'https://www.google.com/maps/embed?pb=!1m18"onload="x',
  ])("rejeita %s", (url) => {
    expect(isValidEmbedUrl(url)).toBe(false);
  });
});

describe("isValidMapLink", () => {
  it("aceita link curto e completo", () => {
    expect(isValidMapLink("https://maps.app.goo.gl/AbCdEf123")).toBe(true);
    expect(isValidMapLink("https://www.google.com/maps/place/X")).toBe(true);
  });

  it("rejeita outros domínios e http", () => {
    expect(isValidMapLink("https://exemplo.com/maps")).toBe(false);
    expect(isValidMapLink("http://maps.app.goo.gl/x")).toBe(false);
    expect(isValidMapLink(null)).toBe(false);
  });
});

describe("extractEmbedUrl", () => {
  it("extrai o src de um <iframe> copiado do Google", () => {
    const iframe = `<iframe src="${EMBED}&amp;x=1" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    expect(extractEmbedUrl(iframe)).toBe(`${EMBED}&x=1`);
  });

  it("aceita o src puro e recusa lixo", () => {
    expect(extractEmbedUrl(EMBED)).toBe(EMBED);
    expect(extractEmbedUrl("<iframe src='x'></iframe>")).toBeNull();
    expect(extractEmbedUrl(null)).toBeNull();
  });
});

describe("dados cadastrados do mapa", () => {
  it("se preenchidos, são válidos", () => {
    if (contact.mapEmbedUrl !== null) expect(isValidEmbedUrl(contact.mapEmbedUrl)).toBe(true);
    if (contact.mapUrl !== null) expect(isValidMapLink(contact.mapUrl)).toBe(true);
  });
});
