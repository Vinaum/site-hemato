import type { NextConfig } from "next";

// Vazio quando o site é servido na raiz (domínio próprio).
// Ex.: "/site-hematologista" quando publicado em usuario.github.io/site-hematologista/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
