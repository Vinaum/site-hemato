
import { pageMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Conheça as informações sobre privacidade e proteção de dados pessoais no site institucional do Dr. Marco Aurélio Sartori.",
  path: "/privacidade/",
});

export default function PrivacidadePage() {
  return (
    <Section>
      <SectionHeading
        as="h1"
        title="Política de privacidade"
        intro="Esta página apresenta informações sobre o tratamento de dados pessoais relacionado à utilização deste site."
      />

      <div className="max-w-prose space-y-8">
        <section>
          <h2 className="text-2xl">1. Sobre este site</h2>
          <p className="mt-3">
            Este é um site institucional destinado a apresentar informações
            profissionais sobre o Dr. Marco Aurélio Sartori, suas áreas de
            atuação e informações relacionadas ao atendimento médico.
          </p>
          <p className="mt-3">
            O responsável pelas decisões relacionadas à utilização do site
            e ao tratamento de dados pessoais nesse contexto é o Dr. Marco
            Aurélio Sartori, observadas as responsabilidades efetivamente
            exercidas em cada operação de tratamento.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">2. Dados pessoais e tecnologias utilizadas</h2>
          <p className="mt-3">
            Na implementação atualmente analisada, não foram identificados
            formulários de cadastro ou contato, áreas de acesso de usuários
            ou ferramentas próprias de análise comportamental e publicidade.
          </p>
          <p className="mt-3">
            A navegação em um site pode gerar registros técnicos, como
            endereço IP, data e horário do acesso, informações sobre o
            navegador e dados necessários à comunicação entre o dispositivo
            do visitante e o servidor.
          </p>
          <p className="mt-3">
            Esses registros podem ser tratados pela infraestrutura de
            hospedagem e pelos prestadores de serviços técnicos envolvidos
            na disponibilização do site. A existência, a finalidade e o
            prazo de retenção desses registros dependem das configurações
            e das políticas dos respectivos fornecedores.
          </p>
          <p className="mt-3">
            Não foi identificada, na implementação analisada, a utilização
            de ferramentas próprias de publicidade ou rastreamento
            comportamental. Essa informação poderá ser atualizada caso
            novas tecnologias sejam incorporadas ao site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">3. Contato e serviços externos</h2>
          <p className="mt-3">
            Caso sejam disponibilizados links para serviços externos,
            como WhatsApp, o visitante poderá ser direcionado a plataformas
            operadas por terceiros.
          </p>
          <p className="mt-3">
            A utilização dessas plataformas estará sujeita às respectivas
            políticas de privacidade e condições de uso. O tratamento de
            informações realizado diretamente por esses serviços não é
            integralmente controlado por este site.
          </p>
          <p className="mt-3">
            Informações de saúde eventualmente compartilhadas em uma
            comunicação com o profissional médico exigem cuidados
            específicos e não devem ser confundidas com os dados técnicos
            gerados pela simples navegação no site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">4. Compartilhamento e armazenamento</h2>
          <p className="mt-3">
            Dados pessoais eventualmente tratados para disponibilizar o
            site poderão ser processados por fornecedores de infraestrutura
            e serviços técnicos, na medida necessária à execução dessas
            atividades.
          </p>
          <p className="mt-3">
            As condições de armazenamento, segurança, compartilhamento
            e retenção dependem dos serviços efetivamente contratados e
            das configurações adotadas pelo responsável pelo site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">5. Direitos dos titulares</h2>
          <p className="mt-3">
            Nos termos da Lei Geral de Proteção de Dados Pessoais
            (Lei nº 13.709/2018), os titulares podem exercer os direitos
            aplicáveis ao tratamento de seus dados pessoais, incluindo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Confirmação da existência de tratamento de dados;</li>
            <li>Acesso aos dados pessoais tratados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação, quando aplicável;</li>
            <li>Informações sobre compartilhamento de dados;</li>
            <li>Revogação do consentimento, quando essa for a base legal utilizada.</li>
          </ul>
          <p className="mt-3">
            O exercício desses direitos deverá observar as condições,
            os limites e as hipóteses previstos na legislação aplicável.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">6. Segurança da informação</h2>
          <p className="mt-3">
            A segurança das informações é considerada na manutenção deste site.
            As medidas técnicas e organizacionais aplicáveis devem ser avaliadas
            periodicamente, considerando os serviços utilizados e os riscos
            relacionados ao tratamento de dados pessoais.
          </p>
          <p className="mt-3">
            Nenhum ambiente digital pode garantir segurança absoluta.
            As medidas de proteção devem ser avaliadas e aprimoradas
            continuamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">7. Atualizações desta política</h2>
          <p className="mt-3">
            Esta política poderá ser atualizada em razão de mudanças
            na legislação, nas funcionalidades do site, nos serviços
            utilizados ou nas práticas de tratamento de dados pessoais.
          </p>
          <p className="mt-3">
            Recomendamos que os visitantes consultem esta página
            periodicamente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">8. Responsável e solicitações sobre privacidade</h2>
          <p className="mt-3">
            O responsável pelas decisões sobre o tratamento de dados
            pessoais relacionado a este site é o Dr. Marco Aurélio Sartori.
          </p>
          <p className="mt-3">
            O canal específico para solicitações relacionadas à proteção
            de dados pessoais deverá ser disponibilizado pelo responsável
            antes da publicação definitiva desta política.
          </p>
        </section>
      </div>
    </Section>
  );
}
