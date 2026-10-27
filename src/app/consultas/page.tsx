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
  description: "[PREENCHER: descrição da página Consultas]",
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
          intro="O agendamento é feito por WhatsApp ou telefone."
        />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={links.whatsapp}>Agendar pelo WhatsApp</ButtonLink>
          <ButtonLink href={links.phone} variant="secondary">
            Ligar
          </ButtonLink>
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
