import { existsSync } from "node:fs";
import { join } from "node:path";
import { institutions } from "@/content/pages";
import { withBase } from "@/lib/site";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/** Procura o logotipo em public/images/logos/ no momento do build. */
function findLogo(slug?: string): string | null {
  if (!slug) return null;
  for (const ext of ["svg", "webp", "png", "jpg"]) {
    const rel = `/images/logos/${slug}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function Institutions() {
  if (institutions.length === 0) return null;

  return (
    <Section tone="surface" labelledBy="vinculos-titulo">
      <SectionHeading id="vinculos-titulo" title="Vínculos institucionais" />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {institutions.map((inst) => {
          const logo = findLogo(inst.logo);
          return (
            <li key={inst.url} className="h-full">
              <a
                href={inst.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col items-center text-center rounded-lg border border-line bg-background p-6 transition hover:border-primary hover:bg-sage hover:shadow-sm motion-safe:hover:-translate-y-0.5"
              >
                {logo ? (
                  <span className="flex h-14 items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={withBase(logo)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={176}
                      height={56}
                      className="h-14 w-44 object-contain object-center"
                    />
                  </span>
                ) : (
                  <span className="block text-sm font-medium tracking-wide text-primary">
                    {inst.short}
                  </span>
                )}
                <span className="mt-3 block font-serif text-xl leading-snug text-primary-dark">
                  {inst.name}
                </span>
                <span className="sr-only"> (abre em uma nova aba)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
