import type { ReactNode } from "react";
import { doctor } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Como o site do Dr. Marco Aurélio Sartori trata dados pessoais: hospedagem, WhatsApp, Google Maps e direitos previstos na LGPD.",
  path: "/privacidade/",
});

const UPDATED = "8 de novembro de 2026";

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
      {children}
      <span className="sr-only"> (abre em uma nova aba)</span>
    </a>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacidadePage() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        title="Política de privacidade"
        intro="Como este site trata dados pessoais, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
      />

      <div className="max-w-prose space-y-10">
        <Block title="1. Quem é o responsável">
          <p>
            Este é o site institucional do {doctor.name} ({doctor.crm}). Ele é o
            responsável pelas decisões sobre o tratamento de dados pessoais relacionado
            ao site.
          </p>
          <p>
            Para dúvidas ou solicitações sobre privacidade, use os canais de contato
            informados neste site.
          </p>
        </Block>

        <Block title="2. O que este site não faz">
          <p>
            O site não tem formulários, cadastro, área de pacientes nem ferramentas de
            análise de comportamento ou de publicidade. Ele não cria cookies próprios.
            As fontes tipográficas são hospedadas no próprio site, sem consulta a
            serviços externos.
          </p>
        </Block>

        <Block title="3. Hospedagem">
          <p>
            O site é hospedado no GitHub Pages, serviço do GitHub, Inc. Como acontece em
            qualquer site, ao acessar uma página o seu navegador envia ao servidor dados
            técnicos, como endereço IP, data e hora do acesso e tipo de navegador. Esses
            registros são tratados pelo GitHub para entregar o site e protegê-lo contra
            abusos, com base no legítimo interesse (art. 7º, IX, da LGPD).
          </p>
          <p>
            Os servidores do GitHub podem estar localizados fora do Brasil. Mais
            informações na{" "}
            <External href="https://docs.github.com/pt/site-policy/privacy-policies/github-general-privacy-statement">
              declaração de privacidade do GitHub
            </External>
            .
          </p>
        </Block>

        <Block title="4. Contato pelo WhatsApp">
          <p>
            Os botões de agendamento abrem o WhatsApp com uma mensagem sugerida. Nada é
            enviado sem a sua ação: você pode editar ou apagar a mensagem antes de
            enviar.
          </p>
          <p>
            A conversa acontece no WhatsApp, serviço da Meta, e segue a{" "}
            <External href="https://www.whatsapp.com/legal/privacy-policy?lang=pt_BR">
              política de privacidade do WhatsApp
            </External>
            . Recomendamos compartilhar apenas o necessário para o agendamento.
            Informações de saúde serão tratadas no atendimento, com o sigilo próprio
            da relação entre médico e paciente.
          </p>
        </Block>

        <Block title="5. Mapa do Google">
          <p>
            O mapa com a localização do consultório só é carregado se você clicar em
            &quot;Mostrar mapa&quot;. A partir desse clique, o Google recebe dados como o
            seu endereço IP e informações do navegador, e pode usar cookies, conforme a{" "}
            <External href="https://policies.google.com/privacy?hl=pt-BR">
              política de privacidade do Google
            </External>
            . O mesmo vale para o link &quot;Abrir no Google Maps&quot;. Sem o clique,
            nenhum dado é enviado ao Google pelo site.
          </p>
        </Block>

        <Block title="6. Seus direitos">
          <p>A LGPD garante a você, entre outros direitos:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>confirmar se existe tratamento dos seus dados;</li>
            <li>acessar os dados tratados;</li>
            <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>pedir anonimização, bloqueio ou eliminação, quando aplicável;</li>
            <li>saber com quem os dados foram compartilhados;</li>
            <li>revogar o consentimento, quando essa for a base do tratamento.</li>
          </ul>
          <p>
            Para exercer esses direitos, entre em contato pelos canais informados neste
            site. Dados tratados diretamente pelo GitHub, pela Meta ou pelo Google também
            podem ser solicitados a essas empresas.
          </p>
        </Block>

        <Block title="7. Segurança">
          <p>
            O site é servido por conexão segura (HTTPS) e não armazena dados de
            visitantes. As medidas de segurança são revistas quando o site muda.
            Nenhum ambiente digital é totalmente livre de riscos.
          </p>
        </Block>

        <Block title="8. Atualizações desta política">
          <p>
            Esta política será atualizada sempre que o site passar a usar novos serviços
            ou funcionalidades.
          </p>
          <p>Última atualização: {UPDATED}.</p>
        </Block>
      </div>
    </Section>
  );
}
