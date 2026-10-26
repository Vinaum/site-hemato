import type { Metadata } from "next";
import { doctor } from "@/content/site";
import { about } from "@/content/pages";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: `Sobre | ${doctor.name}`,
  description: "[PREENCHER: descrição da página Sobre]",
};

export default function SobrePage() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_20rem]">
          <div>
            <SectionHeading as="h1" title="Sobre" />
            <div className="max-w-prose space-y-5 text-lg">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <PhotoPlaceholder />
        </div>
      </Section>

      <Section tone="sage" labelledBy="formacao-titulo">
        <SectionHeading id="formacao-titulo" title="Formação" />
        <ul className="max-w-prose list-disc space-y-2 pl-6">
          {about.education.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
