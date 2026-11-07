import { expertise, focusAreas } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Áreas de atuação",
  description:
    "Áreas de experiência e condições acompanhadas pelo Dr. Marco Aurélio Sartori em Hematologia, Hemoterapia, Onco-hematologia e Clínica Médica.",
  path: "/atuacao/",
});

export default function AtuacaoPage() {
  return (
    <>
      <Section>
        <SectionHeading as="h1" title="Áreas de atuação" />
        <h2 className="mb-4 text-2xl">Experiência em</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((area) => (
            <li key={area}>
              <Card>
                <div className="flex min-h-20 items-center justify-center text-center">
                  <p className="font-serif text-xl text-primary-dark">{area}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sage" labelledBy="foco-titulo">
        <SectionHeading id="foco-titulo" title="Foco de tratamento" />
        <ul className="flex flex-wrap gap-3">
          {focusAreas.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-surface px-4 py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
