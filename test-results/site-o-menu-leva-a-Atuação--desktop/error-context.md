# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> o menu leva a "Atuação"
- Location: tests/e2e/site.spec.ts:24:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/site-hematologista\/atuacao\/$/
Received string:  "http://localhost:4173/atuacao/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="pt-BR" data-scroll-behavior="smooth" class="_0bjUvq_variable _5PBLiG_variable">…</html>
       - unexpected value "http://localhost:4173/atuacao/"

```

```yaml
- link "Ir para o conteúdo":
  - /url: "#conteudo"
- banner:
  - 'link "[PREENCHER: nome do médico]"':
    - /url: /
  - navigation "Principal":
    - link "Início":
      - /url: /
    - link "Sobre":
      - /url: /sobre/
    - link "Atuação":
      - /url: /atuacao/
    - link "Consultas":
      - /url: /consultas/
  - link "Agendar pelo WhatsApp":
    - /url: /consultas/
  - button "Abrir menu"
- main:
  - heading "404" [level=1]
  - heading "This page could not be found." [level=2]
- contentinfo:
  - 'heading "[PREENCHER: nome do médico]" [level=2]'
  - paragraph: "MÉDICO · [PREENCHER: CRM-UF e número] Hematologia · RQE [PREENCHER: número do RQE]"
  - heading "Contato" [level=2]
  - list:
    - listitem: "[PREENCHER: telefone, só dígitos com DDI 55 e DDD]"
    - listitem: "[PREENCHER: e-mail]"
    - listitem: "[PREENCHER: endereço completo do consultório]"
    - listitem: "[PREENCHER: horário de atendimento]"
  - navigation "Rodapé":
    - heading "Navegação" [level=2]
    - list:
      - listitem:
        - link "Início":
          - /url: /
      - listitem:
        - link "Sobre":
          - /url: /sobre/
      - listitem:
        - link "Atuação":
          - /url: /atuacao/
      - listitem:
        - link "Consultas":
          - /url: /consultas/
      - listitem:
        - link "Política de privacidade":
          - /url: /privacidade/
  - paragraph: Este site tem caráter informativo e não substitui a consulta médica. Em caso de emergência, procure o serviço de urgência mais próximo ou ligue 192 (SAMU).
  - paragraph: "© 2026 [PREENCHER: nome do médico]. Todos os direitos reservados."
- link "WhatsApp":
  - /url: /consultas/
- link "Ligar":
  - /url: /consultas/
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | const PREFIX = "/site-hematologista";
  4   | const pages = ["", "sobre/", "atuacao/", "consultas/", "privacidade/"];
  5   | 
  6   | async function openMenuIfMobile(page: Page) {
  7   |   const toggle = page.getByRole("button", { name: "Abrir menu" });
  8   |   if (await toggle.isVisible()) await toggle.click();
  9   | }
  10  | 
  11  | for (const p of pages) {
  12  |   test(`página "${p || "inicial"}" responde 200 e tem um único h1`, async ({ page }) => {
  13  |     const res = await page.goto(p || "./");
  14  |     expect(res?.status()).toBe(200);
  15  |     await expect(page.locator("h1")).toHaveCount(1);
  16  |   });
  17  | }
  18  | 
  19  | for (const [label, slug] of [
  20  |   ["Sobre", "sobre"],
  21  |   ["Atuação", "atuacao"],
  22  |   ["Consultas", "consultas"],
  23  | ] as const) {
  24  |   test(`o menu leva a "${label}"`, async ({ page }) => {
  25  |     await page.goto("./");
  26  |     await openMenuIfMobile(page);
  27  |     await page
  28  |       .getByRole("navigation", { name: "Principal" })
  29  |       .getByRole("link", { name: label, exact: true })
  30  |       .click();
> 31  |     await expect(page).toHaveURL(new RegExp(`${PREFIX}/${slug}/$`));
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  32  |     await expect(page.locator("h1")).toBeVisible();
  33  |   });
  34  | }
  35  | 
  36  | test("menu móvel abre, mostra os links e fecha com Esc", async ({ page, isMobile }) => {
  37  |   test.skip(!isMobile, "apenas no projeto mobile");
  38  |   await page.goto("./");
  39  |   const nav = page.getByRole("navigation", { name: "Principal" });
  40  |   const toggle = page.getByRole("button", { name: "Abrir menu" });
  41  | 
  42  |   await expect(toggle).toHaveAttribute("aria-expanded", "false");
  43  |   await expect(nav).toBeHidden();
  44  | 
  45  |   await toggle.click();
  46  |   const close = page.getByRole("button", { name: "Fechar menu" });
  47  |   await expect(close).toHaveAttribute("aria-expanded", "true");
  48  |   await expect(nav.getByRole("link", { name: "Sobre", exact: true })).toBeVisible();
  49  | 
  50  |   await page.keyboard.press("Escape");
  51  |   await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
  52  |     "aria-expanded",
  53  |     "false",
  54  |   );
  55  |   await expect(nav).toBeHidden();
  56  | });
  57  | 
  58  | test("links de WhatsApp e telefone são válidos (reais ou o fallback interno)", async ({ page }) => {
  59  |   await page.goto("./");
  60  |   const waOk = new RegExp(`^(https://wa\\.me/55\\d{10,11}(\\?.*)?|${PREFIX}/consultas/)$`);
  61  |   const telOk = new RegExp(`^(tel:\\+55\\d{10,11}|${PREFIX}/consultas/)$`);
  62  | 
  63  |   const wa = await page.getByRole("link", { name: /WhatsApp/ }).all();
  64  |   expect(wa.length).toBeGreaterThan(0);
  65  |   for (const link of wa) await expect(link).toHaveAttribute("href", waOk);
  66  | 
  67  |   const tel = await page.getByRole("link", { name: "Ligar", exact: true }).all();
  68  |   expect(tel.length).toBeGreaterThan(0);
  69  |   for (const link of tel) await expect(link).toHaveAttribute("href", telOk);
  70  | });
  71  | 
  72  | test("nenhum link contém placeholder ou 'undefined'", async ({ page }) => {
  73  |   for (const p of pages) {
  74  |     await page.goto(p || "./");
  75  |     const hrefs = await page.locator("a[href]").evaluateAll((els) =>
  76  |       els.map((e) => e.getAttribute("href") ?? ""),
  77  |     );
  78  |     for (const href of hrefs) {
  79  |       expect(href, `href suspeito em "${p}"`).not.toMatch(/PREENCHER|undefined|null/i);
  80  |     }
  81  |   }
  82  | });
  83  | 
  84  | test("barra de contato fixa aparece só no celular", async ({ page, isMobile }) => {
  85  |   await page.goto("./");
  86  |   const bar = page.getByTestId("contact-bar");
  87  |   if (isMobile) await expect(bar).toBeVisible();
  88  |   else await expect(bar).toBeHidden();
  89  | });
  90  | 
  91  | test("o primeiro Tab foca o link 'Ir para o conteúdo'", async ({ page }) => {
  92  |   await page.goto("./");
  93  |   await page.keyboard.press("Tab");
  94  |   await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
  95  | });
  96  | 
  97  | test("página inexistente devolve 404", async ({ page }) => {
  98  |   const res = await page.goto("nao-existe/");
  99  |   expect(res?.status()).toBe(404);
  100 | });
  101 | 
  102 | test("nenhum recurso falha ao carregar (CSS, JS, fontes, ícone)", async ({ page }) => {
  103 |   const bad: string[] = [];
  104 |   page.on("response", (r) => {
  105 |     if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`);
  106 |   });
  107 |   for (const p of pages) await page.goto(p || "./", { waitUntil: "networkidle" });
  108 |   expect(bad).toEqual([]);
  109 | });
  110 | 
```