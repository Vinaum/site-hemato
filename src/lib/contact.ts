import { contact } from "@/content/site";

// 55 + DDD (2 dígitos) + número (8 ou 9 dígitos)
const BR_NUMBER = /^55\d{10,11}$/;

export function isPlaceholder(value: string): boolean {
  return value.includes("[PREENCHER");
}

export function whatsappUrl(
  number: string | null,
  message: string,
): string | null {
  if (!number || isPlaceholder(number) || !BR_NUMBER.test(number)) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telUrl(number: string | null): string | null {
  if (!number || isPlaceholder(number) || !BR_NUMBER.test(number)) {
    return null;
  }

  return `tel:+${number}`;
}

type ContactInput = Pick<
  typeof contact,
  "whatsapp" | "whatsappMessage" | "phone"
>;

export function getContactLinks(source: ContactInput = contact) {
  const wa = whatsappUrl(source.whatsapp, source.whatsappMessage);
  const tel = telUrl(source.phone);

  return {
    whatsapp: wa,
    phone: tel,
    whatsappReady: wa !== null,
    phoneReady: tel !== null,
  };
}