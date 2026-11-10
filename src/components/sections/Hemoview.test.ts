import { describe, expect, it } from "vitest";
import { hemoview } from "@/content/pages";
import { hemoviewEmbedUrl } from "./Hemoview";

describe("HemoView", () => {
  it("o vídeo em destaque gera um link de incorporação válido", () => {
    const url = hemoviewEmbedUrl(hemoview.featured.id, hemoview.featured.start);
    expect(url).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/[A-Za-z0-9_-]{11}/);
  });

  it("aplica o início apenas quando maior que zero", () => {
    expect(hemoviewEmbedUrl("if2LETcdb8g", 0)).toBe("https://www.youtube-nocookie.com/embed/if2LETcdb8g");
    expect(hemoviewEmbedUrl("if2LETcdb8g", 603)).toBe("https://www.youtube-nocookie.com/embed/if2LETcdb8g?start=603");
  });

  it("recusa identificadores inválidos", () => {
    expect(hemoviewEmbedUrl("curto", 0)).toBeNull();
    expect(hemoviewEmbedUrl("if2LETcdb8g\"><x", 0)).toBeNull();
  });

  it("o canal aponta para o YouTube em https", () => {
    expect(hemoview.channelUrl).toMatch(/^https:\/\/www\.youtube\.com\/@/);
  });
});
