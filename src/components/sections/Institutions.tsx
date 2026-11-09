import { institutions } from "@/content/pages";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Institutions() {
  if (institutions.length === 0) return null;

  return (
    <Section tone="surface" labelledBy="vinculos-titulo">
      <SectionHeading id="vinculos-titulo" title="Vínculos institucionais" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {institutions.map((inst) => (
          <li key={inst.url} className="h-full">
            <a
              href={inst.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-6 rounded-lg border border-line bg-background p-6 transition-colors hover:border-primary hover:bg-sage"
            >
              <span>
                <span className="block text-sm font-medium tracking-wide text-primary">
                  {inst.short}
                </span>
                <span className="mt-2 block font-serif text-xl leading-snug text-primary-dark">
                  {inst.name}
                </span>
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 group-hover:underline">
                Visitar site
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
                <span className="sr-only"> de {inst.name} (abre em uma nova aba)</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
