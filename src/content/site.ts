import { publications } from "./publications";

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
  whatsapp: "5518991061661" as string | null,
  whatsappMessage:
    "Olá, Dr. Marco Aurélio! Vim pelo site e gostaria de agendar uma consulta. Poderia me informar os horários disponíveis?",
  phone: null as string | null,
  phoneDisplay: null as string | null,
  email: null as string | null,
  // Endereço completo do perfil, ex.: https://www.instagram.com/usuario/
  instagram: null as string | null,
  address: "Rua Domingos de Morais, 2781 - São Paulo, SP - 04035-001" as string | null,
  hours: null as string | null,
  // Google Maps > Compartilhar > Incorporar um mapa (só o src do iframe).
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d294.8854274650264!2d-46.636554638111996!3d-23.60107965978238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5bb2b5c340eb%3A0x926ea02cfe440aea!2sR.%20Domingos%20de%20Morais%2C%202781%20-%20Vila%20Mariana%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004035-001!5e0!3m2!1sen!2sbr!4v1794187824880!5m2!1sen!2sbr" as string | null,
  // Google Maps > Compartilhar > Enviar um link.
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua%20Domingos%20de%20Morais%2C%202781%2C%20S%C3%A3o%20Paulo%2C%20SP%2C%2004035-001" as string | null,
};

const baseNav = [
  { href: "/", label: "Início" },
  { href: "/sobre/", label: "Sobre" },
  { href: "/atuacao/", label: "Atuação" },
  { href: "/consultas/", label: "Consultas" },
];

// "Publicações" só entra no menu quando houver ao menos uma publicação confirmada.
export const navItems: { href: string; label: string }[] =
  publications.length > 0
    ? [...baseNav.slice(0, 3), { href: "/publicacoes/", label: "Publicações" }, ...baseNav.slice(3)]
    : baseNav;
