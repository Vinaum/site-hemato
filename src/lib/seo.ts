import type { Metadata } from "next";
import { SITE_URL } from "./site";

/** URL absoluta de uma rota interna. SITE_URL já inclui o subdiretório, se houver. */
export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Metadados por página: título, descrição, canonical e Open Graph básico. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      description,
      ...(title ? { title } : {}),
    },
  };
}
