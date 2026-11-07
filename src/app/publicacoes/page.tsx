import { publications, publicationTypeLabel } from "@/content/publications";
import { groupByYear, publicationLink } from "@/lib/publications";
import { pageMetadata } from "@/lib/seo";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = pageMetadata({
  title: "Publicações científicas",
  description:
    "Artigos e outras publicações científicas do Dr. Marco Aurélio Sartori, com links para as fontes originais.",
  path: "/publicacoes/",
});

export default function PublicacoesPage() {
  const groups = groupByYear(publications);

  return (
    <Section>
      <SectionHeading
        as="h1"
        title="Publicações científicas"
        intro="Produção científica com links para as fontes originais."
      />

      {groups.length === 0 ? (
        <p className="max-w-prose text-lg">Lista em preparação.</p>
      ) : (
        <div className="max-w-3xl space-y-12">
          {groups.map(([year, items]) => (
            <section key={year} aria-labelledby={`ano-${year}`}>
              <h2 id={`ano-${year}`} className="border-b border-line pb-2 text-2xl">
                {year}
              </h2>
              <ol className="mt-6 space-y-6">
                {items.map((p) => {
                  const link = publicationLink(p);
                  return (
                    <li key={`${p.year}-${p.title}`}>
                      <p className="text-sm font-medium text-primary">
                        {publicationTypeLabel[p.type]}
                      </p>
                      <p className="mt-1 font-serif text-xl text-primary-dark">{p.title}</p>
                      <p className="mt-1">{p.authors}</p>
                      <p className="mt-1 italic">{p.venue}</p>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block font-medium text-primary underline hover:text-primary-dark"
                        >
                          {p.doi ? "Acessar pelo DOI" : "Acessar publicação"}
                          <span className="sr-only">
                            {" "}
                            : {p.title} (abre em uma nova aba)
                          </span>
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}
    </Section>
  );
}
