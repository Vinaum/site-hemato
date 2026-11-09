import { contact } from "@/content/site";

/** Endereço gerado pelo Google Maps em "Compartilhar > Incorporar um mapa". */
const EMBED = /^https:\/\/www\.google\.com\/maps\/embed\?pb=[^\s"'<>]+$/;
/** Link de "Compartilhar > Enviar um link" (curto ou completo). */
const LINK = /^https:\/\/(maps\.app\.goo\.gl\/|www\.google\.com\/maps\/)[^\s"'<>]+$/;

export function isValidEmbedUrl(url: string | null): url is string {
  return !!url && EMBED.test(url);
}

export function isValidMapLink(url: string | null): url is string {
  return !!url && LINK.test(url);
}

/**
 * Aceita o src puro ou o <iframe> inteiro copiado do Google Maps
 * e devolve só o endereço de incorporação, ou null.
 */
export function extractEmbedUrl(input: string | null): string | null {
  if (!input) return null;
  const match = input.match(/src="([^"]+)"/);
  const url = (match ? match[1] : input).trim().replace(/&amp;/g, "&");
  return isValidEmbedUrl(url) ? url : null;
}

/** O mapa só aparece com endereço, código de incorporação e link válidos. */
export const mapReady =
  !!contact.address && isValidEmbedUrl(contact.mapEmbedUrl) && isValidMapLink(contact.mapUrl);
