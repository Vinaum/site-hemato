import type { Metadata } from "next";
import { doctor } from "@/content/site";
import { specialties } from "@/content/pages";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Áreas de atuação | ${doctor.name}`,
  description: "[PREENCHER: descrição da página Áreas de atuação]",
};

export default function AtuacaoPage() {
  return (
    <Section>
      <SectionHeading as="h1" title="Áreas de atuação" />
      <ul className="grid gap-6 md:grid-cols-2">
        {specialties.map((s) => (
          <li key={s.title}>
            <Card>
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-3">{s.text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
