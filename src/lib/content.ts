/**
 * Conteúdo editável vindo do Supabase.
 * Na publicação, o next.config.ts lê a tabela site_content e embute o resultado em
 * process.env.CONTENT_SNAPSHOT. Aqui ele é validado e aplicado sobre os valores do código.
 * As regras espelham a função site_content_is_valid() do banco.
 */

export type ContactInfo = {
  whatsapp: string | null;
  whatsappMessage: string;
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  instagram: string | null;
  address: string | null;
  hours: string | null;
};

const CONTACT_KEYS = [
  "whatsapp", "whatsappMessage", "phone", "phoneDisplay",
  "email", "instagram", "address", "hours",
] as const;

const BR_NUMBER = /^55\d{10,11}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const INSTAGRAM = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/;

function maxLen(v: string | null, n: number): boolean {
  return v === null || v.length <= n;
}

/** Devolve o bloco de contatos se estiver exatamente no formato esperado; senão, null. */
export function parseContactInfo(value: unknown): ContactInfo | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const o = value as Record<string, unknown>;
  const keys = Object.keys(o);
  if (keys.length !== CONTACT_KEYS.length || !CONTACT_KEYS.every((k) => keys.includes(k))) return null;
  if (!CONTACT_KEYS.every((k) => o[k] === null || typeof o[k] === "string")) return null;

  const c = o as ContactInfo;
  if (typeof c.whatsappMessage !== "string" || c.whatsappMessage.length < 1 || c.whatsappMessage.length > 300) return null;
  if (c.whatsapp !== null && !BR_NUMBER.test(c.whatsapp)) return null;
  if (c.phone !== null && !BR_NUMBER.test(c.phone)) return null;
  if (c.email !== null && !EMAIL.test(c.email)) return null;
  if (c.instagram !== null && !INSTAGRAM.test(c.instagram)) return null;
  if (!maxLen(c.phoneDisplay, 40) || !maxLen(c.email, 120) || !maxLen(c.address, 200) || !maxLen(c.hours, 200)) return null;
  return c;
}

/** Lê o retrato do banco embutido na publicação. Qualquer problema vira objeto vazio. */
export function readSnapshot(raw: string | undefined): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(raw ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

/** Valores do código, substituídos pelos do Supabase quando válidos. */
export function withRemoteContact<T extends ContactInfo>(
  defaults: T,
  raw: string | undefined = process.env.CONTENT_SNAPSHOT,
): T {
  const remote = parseContactInfo(readSnapshot(raw).contact_info);
  return remote ? { ...defaults, ...remote } : defaults;
}
