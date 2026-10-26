// Falha (exit 1) se restar "[PREENCHER" no HTML/XML exportado. Uso: node scripts/check-placeholders.mjs [pasta]
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] ?? "out";
const marker = "[PREENCHER";

if (!existsSync(dir)) {
  console.error(`Pasta "${dir}" não encontrada. Rode "npm run build" antes.`);
  process.exit(2);
}

const walk = (d) =>
  readdirSync(d).flatMap((name) => {
    const p = join(d, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const hits = [];
for (const file of walk(dir).filter((f) => /\.(html|xml)$/.test(f))) {
  const count = readFileSync(file, "utf8").split(marker).length - 1;
  if (count > 0) hits.push([file, count]);
}

if (hits.length > 0) {
  console.error("Placeholders encontrados (não publique assim):");
  for (const [file, count] of hits) console.error(`  ${count}x  ${file}`);
  process.exit(1);
}
console.log("Nenhum placeholder encontrado.");
