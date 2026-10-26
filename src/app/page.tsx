import { withBase } from "@/lib/site";

const swatches = [
  { nome: "primary", classe: "bg-primary" },
  { nome: "primary-dark", classe: "bg-primary-dark" },
  { nome: "bronze", classe: "bg-bronze" },
  { nome: "bronze-light", classe: "bg-bronze-light" },
  { nome: "sage", classe: "bg-sage" },
  { nome: "surface", classe: "bg-surface border border-line" },
];

// PÁGINA TEMPORÁRIA: valida tokens, fontes e basePath. Será substituída no próximo lote.
export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl md:text-5xl">[PREENCHER: nome do médico]</h1>
      <p className="mt-4 max-w-prose">
        Teste de tipografia e cores. Este texto usa a cor <code>ink</code> sobre
        o fundo <code>background</code>.
      </p>

      <a
        href="#conteudo"
        className="mt-8 inline-block rounded-md bg-primary px-6 py-3 font-medium text-surface transition-colors hover:bg-primary-dark"
      >
        Botão primário
      </a>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {swatches.map((s) => (
          <li key={s.nome}>
            <div className={`h-16 rounded-md ${s.classe}`} />
            <span className="text-sm">{s.nome}</span>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-sm">Teste do helper withBase (favicon abaixo):</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={withBase("/favicon.ico")} width={32} height={32} alt="" />
    </div>
  );
}
