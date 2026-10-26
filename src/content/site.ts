/**
 * Dados centrais do site. Tudo que ainda não foi fornecido é placeholder.
 * Um teste de pré-publicação deve falhar se "[PREENCHER" restar no HTML final.
 */
export const ph = (label: string) => `[PREENCHER: ${label}]`;

export const doctor = {
  name: ph("nome do médico"),
  // Exibido como: Nome · MÉDICO · CRM-UF 000000 (Resolução CFM 2.336/2023)
  crm: ph("CRM-UF e número"),
  // Só manter "Hematologia" se o médico tiver o RQE correspondente.
  specialty: "Hematologia",
  rqe: ph("número do RQE"),
};

export const contact = {
  // Apenas dígitos, com DDI e DDD. Formato: 55 + DDD + número (10 ou 11 dígitos após o 55).
  whatsapp: ph("WhatsApp, só dígitos com DDI 55 e DDD"),
  whatsappMessage: "Olá, vim pelo site e gostaria de agendar uma consulta.",
  phone: ph("telefone, só dígitos com DDI 55 e DDD"),
  phoneDisplay: ph("telefone formatado"),
  email: ph("e-mail"),
  address: ph("endereço completo do consultório"),
  hours: ph("horário de atendimento"),
};

export const navItems = [
  { href: "/", label: "Início" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/atuacao/", label: "Atuação" },
  { href: "/consultas/", label: "Consultas" },
] as const;
