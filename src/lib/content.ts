/**
 * Conteúdo editável vindo do Supabase.
 * Na publicação, o next.config.ts lê a tabela site_content e embute o resultado em
 * process.env.CONTENT_SNAPSHOT. Aqui ele é validado e aplicado sobre os valores do código.
 * As regras espelham a função site_content_is_valid() do banco.
 */

export const CONTACT_KEYS = [
  "whatsapp", "whatsappMessage", "phone", "phoneDisplay",
  "email", "instagram", "address", "hours",
] as const;

export type ContactKey = (typeof CONTACT_KEYS)[number];

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

/** Valores do formulário do painel: sempre texto ("" = vazio). */
export type ContactForm = Record<ContactKey, string>;
export type ContactErrors = Partial<Record<ContactKey, string>>;

const BR_NUMBER = /^55\d{10,11}$/;
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const INSTAGRAM = /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9._]+\/?$/;

const LIMITS: Partial<Record<ContactKey, number>> = {
  whatsappMessage: 300,
  phoneDisplay: 40,
  email: 120,
  address: 200,
  hours: 200,
};

/** Mensagens de erro por campo; objeto vazio = tudo certo. */
export function validateContact(c: ContactInfo): ContactErrors {
  const errors: ContactErrors = {};
  if (c.whatsapp !== null && !BR_NUMBER.test(c.whatsapp)) {
    errors.whatsapp = "Use só números: 55 + DDD + número. Ex.: 5511987654321";
  }
  if (c.whatsappMessage.trim().length === 0) {
    errors.whatsappMessage = "Escreva a mensagem que o paciente verá pronta no WhatsApp.";
  }
  if (c.phone !== null && !BR_NUMBER.test(c.phone)) {
    errors.phone = "Use só números: 55 + DDD + número. Ex.: 551133334444";
  }
  if (c.email !== null && !EMAIL.test(c.email)) {
    errors.email = "E-mail inválido.";
  }
  if (c.instagram !== null && !INSTAGRAM.test(c.instagram)) {
    errors.instagram = "Use o endereço completo do perfil. Ex.: https://www.instagram.com/usuario/";
  }
  for (const [key, max] of Object.entries(LIMITS) as [ContactKey, number][]) {
    const v = c[key];
    if (v !== null && v.length > max && !errors[key]) {
      errors[key] = `Use no máximo ${max} caracteres.`;
    }
  }
  return errors;
}

/** Devolve o bloco de contatos se estiver exatamente no formato esperado; senão, null. */
export function parseContactInfo(value: unknown): ContactInfo | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const o = value as Record<string, unknown>;
  const keys = Object.keys(o);
  if (keys.length !== CONTACT_KEYS.length || !CONTACT_KEYS.every((k) => keys.includes(k))) return null;
  if (!CONTACT_KEYS.every((k) => o[k] === null || typeof o[k] === "string")) return null;
  if (typeof o.whatsappMessage !== "string") return null;
  const c = o as ContactInfo;
  return Object.keys(validateContact(c)).length === 0 ? c : null;
}

/** Contatos -> campos do formulário. */
export function contactToForm(c: ContactInfo): ContactForm {
  return Object.fromEntries(CONTACT_KEYS.map((k) => [k, c[k] ?? ""])) as ContactForm;
}

/** Campos do formulário -> contatos (texto vazio vira null, exceto a mensagem). */
export function formToContact(f: ContactForm): ContactInfo {
  const opt = (v: string) => (v.trim() === "" ? null : v.trim());
  return {
    whatsapp: opt(f.whatsapp.replace(/\D/g, "")),
    whatsappMessage: f.whatsappMessage.trim(),
    phone: opt(f.phone.replace(/\D/g, "")),
    phoneDisplay: opt(f.phoneDisplay),
    email: opt(f.email),
    instagram: opt(f.instagram),
    address: opt(f.address),
    hours: opt(f.hours),
  };
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
