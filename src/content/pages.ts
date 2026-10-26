import { ph } from "./site";

export const home = {
  heroTitle: ph("título principal da página inicial"),
  heroText: ph("frase de apresentação, validada pelo médico"),
  aboutText: ph("resumo da apresentação do médico"),
};

export const specialties = [
  { title: ph("área de atuação 1"), text: ph("descrição da área 1") },
  { title: ph("área de atuação 2"), text: ph("descrição da área 2") },
  { title: ph("área de atuação 3"), text: ph("descrição da área 3") },
];

export const about = {
  paragraphs: [
    ph("trajetória profissional, parágrafo 1"),
    ph("trajetória profissional, parágrafo 2"),
  ],
  education: [ph("formação 1"), ph("formação 2")],
};

export const consultations = {
  modalities: ph("modalidades de atendimento"),
  guidance: ph("orientações para a consulta"),
};

export const privacySections = [
  "Dados que este site coleta",
  "Contato por WhatsApp e telefone",
  "Área administrativa",
  "Seus direitos (LGPD)",
  "Contato do responsável",
] as const;
