import { doctor } from "@/content/site";
import { expertise, home } from "@/content/pages";
import { getContactLinks } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import PhotoPlaceholder from "@/components/ui/PhotoPlaceholder";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  description:
    "Dr. Marco Aurélio Sartori, médico hematologista. Formado pela FMUSP, com residência no Hospital das Clínicas em Clínica Médica e em Hematologia e Hemoterapia.",
  path: "/",
});

export default function Home() {
  const links = getContactLinks();

  return (
    <>
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-medium text-primary">{home.kicker}</p>
            <h1 className="mt-3 text-4xl md:text-5xl">{doctor.name}</h1>
            <p className="mt-6 max-w-prose text-lg">{home.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={links.whatsapp}>Agendar pelo WhatsApp</ButtonLink>
              <ButtonLink href="/atuacao/" variant="secondary">
                Áreas de atuação
              </ButtonLink>
            </div>
          </div>
          <PhotoPlaceholder className="mx-auto w-full max-w-sm md:max-w-none" />
        </div>
      </Section>

      <Section tone="sage" labelledBy="atuacao-titulo">
        <SectionHeading id="atuacao-titulo" title="Áreas de atuação" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((area) => (
            <li key={area}>
              <Card>
                <p className="font-serif text-xl text-primary-dark">{area}</p>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ButtonLink href="/atuacao/" variant="secondary">
            Ver condições acompanhadas
          </ButtonLink>
        </div>
      </Section>

      <Section labelledBy="sobre-titulo">
        <SectionHeading id="sobre-titulo" title="Sobre" />
        <p className="max-w-prose text-lg">{home.aboutText}</p>
        <div className="mt-8">
          <ButtonLink href="/sobre/" variant="secondary">
            Conhecer a trajetória
          </ButtonLink>
        </div>
      </Section>

      <Section tone="surface" labelledBy="contato-titulo">
        <SectionHeading
          id="contato-titulo"
          title="Agende sua consulta"
          intro="O agendamento é feito por WhatsApp ou telefone."
        />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={links.whatsapp}>Agendar pelo WhatsApp</ButtonLink>
          <ButtonLink href={links.phone} variant="secondary">
            Ligar
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
