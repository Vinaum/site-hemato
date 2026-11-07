import { doctor } from "@/content/site";
import { about } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import Card from "@/components/ui/Card";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Sobre",
  description:
    "Formação e trajetória do Dr. Marco Aurélio Sartori: graduação e residências na FMUSP, título de especialista pela ABHH e atuação como preceptor.",
  path: "/sobre/",
});

export default function SobrePage() {
  return (
    <>
      <Section>
        <div className="grid items-start gap-12 md:grid-cols-[1fr_20rem]">
          <div>
            <SectionHeading as="h1" title={`Sobre ${doctor.name}`} />
            <div className="max-w-prose space-y-5 text-lg">
              <p>{about.intro}</p>
              <p>{about.certification}</p>
            </div>
          </div>
          <ProfilePhoto sizes="(min-width: 768px) 320px, 100vw" />
        </div>
      </Section>

      <Section tone="sage" labelledBy="formacao-titulo">
        <SectionHeading id="formacao-titulo" title="Formação" />
        <ol className="max-w-2xl space-y-4">
          {about.training.map((t) => (
            <li key={t.title}>
              <Card>
                <p className="text-sm font-medium text-primary">
                  Conclusão em {t.year}
                </p>
                <h3 className="mt-1 text-xl">{t.title}</h3>
                <p className="mt-1">{t.institution}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="docencia-titulo">
        <SectionHeading id="docencia-titulo" title="Atuação acadêmica" />
        <ul className="max-w-prose list-disc space-y-3 pl-6 text-lg">
          {about.teaching.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
