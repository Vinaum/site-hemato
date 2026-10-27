// Servidor estático mínimo que imita o GitHub Pages para testes locais.
// Uso: node scripts/serve-static.mjs <pasta> <porta> [/prefixo]
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);
const prefix = (process.argv[4] ?? "").replace(/\/$/, "");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

function findFile(pathname) {
  let p = pathname;
  if (prefix) {
    if (p !== prefix && !p.startsWith(prefix + "/")) return null;
    p = p.slice(prefix.length) || "/";
  }
  let decoded;
  try {
    decoded = decodeURIComponent(p);
  } catch {
    return null;
  }
  let file = join(root, normalize(decoded));
  if (!file.startsWith(root)) return null;
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  return existsSync(file) && statSync(file).isFile() ? file : null;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = findFile(pathname);
  const notFound = join(root, "404.html");
  const target = file ?? (existsSync(notFound) ? notFound : null);

  if (!target) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404");
    return;
  }
  res.writeHead(file ? 200 : 404, {
    "Content-Type": types[extname(target)] ?? "application/octet-stream",
  });
  res.end(readFileSync(target));
}).listen(port, () => {
  console.log(`Servindo ${root} em http://localhost:${port}${prefix}/`);
});
