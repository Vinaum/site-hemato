import { contact } from "@/content/site";

// 55 + DDD (2 dígitos) + número (8 ou 9 dígitos)
const BR_NUMBER = /^55\d{10,11}$/;

export function isPlaceholder(value: string): boolean {
  return value.includes("[PREENCHER");
}

export function whatsappUrl(number: string, message: string): string | null {
  if (!BR_NUMBER.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telUrl(number: string): string | null {
  if (!BR_NUMBER.test(number)) return null;
  return `tel:+${number}`;
}

/**
 * Links de contato para os botões. Enquanto os dados forem placeholders,
 * apontam para /consultas/ (rota interna; o <Link> aplica o basePath).
 */
export function getContactLinks(
  source: Pick<typeof contact, "whatsapp" | "whatsappMessage" | "phone"> = contact,
) {
  const wa = whatsappUrl(source.whatsapp, source.whatsappMessage);
  const tel = telUrl(source.phone);
  return {
    whatsapp: wa ?? "/consultas/",
    phone: tel ?? "/consultas/",
    whatsappReady: wa !== null,
    phoneReady: tel !== null,
  };
}
