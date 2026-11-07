import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { publications } from "@/content/publications";

export const dynamic = "force-static";

// Somente páginas públicas. /admin/ fica fora de propósito.
const routes = [
  "/",
  "/sobre/",
  "/atuacao/",
  ...(publications.length > 0 ? ["/publicacoes/"] : []),
  "/consultas/",
  "/privacidade/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: absoluteUrl(path) }));
}
