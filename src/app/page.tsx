import { doctor } from "@/content/site";
import Institutions from "@/components/sections/Institutions";
import MapEmbed from "@/components/ui/MapEmbed";
import { mapReady } from "@/lib/maps";
import { expertise, home } from "@/content/pages";
import { publications } from "@/content/publications";
import { sortPublications } from "@/lib/publications";
import PublicationItem from "@/components/ui/PublicationItem";
import { getContactLinks } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import ProfilePhoto from "@/components/ui/ProfilePhoto";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  description:
    "Dr. Marco Aurélio Sartori, médico hematologista. Formado pela FMUSP, com residência no Hospital das Clínicas em Clínica Médica e em Hematologia e Hemoterapia.",
  path: "/",
});

export default function Home() {
  const links = getContactLinks();
  const latest = sortPublications(publications).slice(0, 3);

  return (
    <>
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="font-medium text-primary">{home.kicker}</p>
            <h1 className="mt-3 text-4xl md:text-5xl">{doctor.name}</h1>
            <p className="mt-6 max-w-prose text-lg">{home.heroText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {links.whatsappReady && links.whatsapp && (
                <ButtonLink href={links.whatsapp}>
                  Agendar pelo WhatsApp
                </ButtonLink>
              )}

              <ButtonLink href="/atuacao/" variant="secondary">
                Áreas de atuação
              </ButtonLink>
            </div>
          </div>

          <ProfilePhoto
            priority
            sizes="(min-width: 768px) 520px, 384px"
            className="mx-auto max-w-sm md:max-w-none"
          />
        </div>
      </Section>

      <Section tone="sage" labelledBy="atuacao-titulo">
        <SectionHeading id="atuacao-titulo" title="Áreas de atuação" />

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

      <Institutions />

      {latest.length > 0 ? (
        <Section tone="sage" labelledBy="publicacoes-titulo">
          <SectionHeading
            id="publicacoes-titulo"
            title="Publicações científicas"
            intro="Trabalhos mais recentes, com links para as fontes originais."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {latest.map((p) => (
              <li key={`${p.year}-${p.title}`}>
                <Card>
                  <PublicationItem publication={p} variant="compact" />
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/publicacoes/" variant="secondary">
              Ver todas as publicações
            </ButtonLink>
          </div>
        </Section>
      ) : null}

      <Section tone="surface" labelledBy="contato-titulo">
        <div className={mapReady ? "grid items-start gap-10 md:grid-cols-2" : ""}>
          <div>
            <SectionHeading
              id="contato-titulo"
              title="Agende sua consulta"
              intro="Conheça as informações sobre atendimento e agendamento."
            />

            <div className="flex flex-wrap gap-3">
              {links.whatsappReady && links.whatsapp && (
                <ButtonLink href={links.whatsapp}>
                  Agendar pelo WhatsApp
                </ButtonLink>
              )}

              {links.phoneReady && links.phone && (
                <ButtonLink href={links.phone} variant="secondary">
                  Ligar
                </ButtonLink>
              )}

              {!links.whatsappReady && !links.phoneReady && (
                <p className="text-ink">
                  Os canais de agendamento serão disponibilizados em breve.
                </p>
              )}
            </div>
          </div>
          <MapEmbed size="large" />
        </div>
      </Section>
    </>
  );
}