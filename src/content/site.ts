/**
 * Dados centrais do site. Tudo que ainda não foi fornecido é placeholder.
 * Um teste de pré-publicação deve falhar se "[PREENCHER" restar no HTML final.
 */
export const ph = (label: string) => `[PREENCHER: ${label}]`;

export const doctor = {
  name: "Dr. Marco Aurélio Sartori",
  // Exibido no rodapé como: MÉDICO · CRM-SP 191256 (Resolução CFM 2.336/2023)
  crm: "CRM-SP 191256",
  // Grafia conforme informada pelo médico; conferir com o registro no CRM-SP.
  specialties: [
    { title: "Hematologista e Hemoterapeuta", rqe: "130211" },
    { title: "Clínico Geral", rqe: "130210" },
  ],
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
