import { pageMetadata } from "@/lib/seo";
import { contact } from "@/content/site";
import { consultations } from "@/content/pages";
import { getContactLinks } from "@/lib/contact";
import ButtonLink from "@/components/ui/ButtonLink";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Consultas",
  description: "Informações sobre atendimento, modalidades de consulta e orientações para agendamento com o Dr. Marco Aurélio Sartori, hematologista.",
  path: "/consultas/",
});

export default function ConsultasPage() {
  const links = getContactLinks();

  return (
    <>
      <Section>
        <SectionHeading
          as="h1"
          title="Consultas"
          intro="Em breve, serão divulgadas informações sobre os canais de agendamento."
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
      </Section>

      <Section tone="sage" labelledBy="atendimento-titulo">
        <SectionHeading id="atendimento-titulo" title="Atendimento" />
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="text-xl">Modalidades</h3>
            <p className="mt-3">{consultations.modalities}</p>
          </Card>
          <Card>
            <h3 className="text-xl">Orientações</h3>
            <p className="mt-3">{consultations.guidance}</p>
          </Card>
          <Card>
            <h3 className="text-xl">Endereço</h3>
            <p className="mt-3">{contact.address}</p>
          </Card>
          <Card>
            <h3 className="text-xl">Horários</h3>
            <p className="mt-3">{contact.hours}</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
