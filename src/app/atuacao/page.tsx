import { pageMetadata } from "@/lib/seo";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Áreas de atuação",
  description:
    "Áreas de atuação do Dr. Marco Aurélio Sartori em hematologia: alterações do sangue, coagulação e trombose, e onco-hematologia.",
  path: "/atuacao/",
});

export default function AtuacaoPage() {
  return (
    <Section>
      <SectionHeading as="h1" title="Áreas de atuação" />
      <PracticeAreas variant="full" />
    </Section>
  );
}
