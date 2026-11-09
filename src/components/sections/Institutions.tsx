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
              className="flex h-full flex-col rounded-lg border border-line bg-background p-6 transition hover:border-primary hover:bg-sage hover:shadow-sm motion-safe:hover:-translate-y-0.5"
            >
              <span className="block text-sm font-medium tracking-wide text-primary">
                {inst.short}
              </span>
              <span className="mt-2 block font-serif text-xl leading-snug text-primary-dark">
                {inst.name}
              </span>
              <span className="sr-only"> (abre em uma nova aba)</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
