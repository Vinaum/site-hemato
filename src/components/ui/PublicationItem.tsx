import { publicationTypeLabel, type Publication } from "@/content/publications";
import { publicationLink } from "@/lib/publications";

/**
 * "full": página /publicacoes/ (o ano já aparece no título do grupo).
 * "compact": página inicial (mostra o ano e omite os autores).
 */
export default function PublicationItem({
  publication: p,
  variant = "full",
}: {
  publication: Publication;
  variant?: "full" | "compact";
}) {
  const link = publicationLink(p);
  const compact = variant === "compact";

  return (
    <article>
      <p className="text-sm font-medium text-primary">
        {publicationTypeLabel[p.type]}
        {compact ? ` · ${p.year}` : null}
      </p>
      <p
        className={`mt-1 font-serif text-primary-dark ${compact ? "text-lg leading-snug" : "text-xl"}`}
      >
        {p.title}
      </p>
      {compact ? null : <p className="mt-1">{p.authors}</p>}
      <p className={`mt-1 italic ${compact ? "text-sm" : ""}`}>{p.venue}</p>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block font-medium text-primary underline hover:text-primary-dark"
        >
          {p.doi ? "Acessar pelo DOI" : "Acessar publicação"}
          <span className="sr-only"> : {p.title} (abre em uma nova aba)</span>
        </a>
      ) : null}
    </article>
  );
}
