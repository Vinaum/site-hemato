import type { Metadata } from "next";
import { doctor } from "@/content/site";
import { privacySections } from "@/content/pages";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Política de privacidade | ${doctor.name}`,
  description: "[PREENCHER: descrição da política de privacidade]",
};

export default function PrivacidadePage() {
  return (
    <Section>
      <SectionHeading as="h1" title="Política de privacidade" />
      <div className="max-w-prose space-y-8">
        {privacySections.map((title) => (
          <section key={title}>
            <h2 className="text-2xl">{title}</h2>
            <p className="mt-3">
              [PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]
            </p>
          </section>
        ))}
      </div>
    </Section>
  );
}
