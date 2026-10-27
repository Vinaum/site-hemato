# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> nenhum recurso falha ao carregar (CSS, JS, fontes, ícone)
- Location: tests/e2e/site.spec.ts:102:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 47

- Array []
+ Array [
+   "404 http://localhost:4173/_next/static/media/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2",
+   "404 http://localhost:4173/_next/static/chunks/2le4lx6n6ofd3.css",
+   "404 http://localhost:4173/_next/static/media/edb99fec956915f8-s.p.32sris142tqlb.woff2",
+   "404 http://localhost:4173/_next/static/chunks/1x6obpmlu1_c2.js",
+   "404 http://localhost:4173/_next/static/chunks/2r4s4h5xul1n-.js",
+   "404 http://localhost:4173/_next/static/chunks/3wbm-994r45kr.js",
+   "404 http://localhost:4173/_next/static/chunks/1kb4dcqdypxx7.js",
+   "404 http://localhost:4173/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
+   "404 http://localhost:4173/_next/static/chunks/1dsm8wc_cmjs7.js",
+   "404 http://localhost:4173/_next/static/media/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2",
+   "404 http://localhost:4173/_next/static/chunks/2le4lx6n6ofd3.css",
+   "404 http://localhost:4173/_next/static/media/edb99fec956915f8-s.p.32sris142tqlb.woff2",
+   "404 http://localhost:4173/_next/static/chunks/1x6obpmlu1_c2.js",
+   "404 http://localhost:4173/_next/static/chunks/2r4s4h5xul1n-.js",
+   "404 http://localhost:4173/_next/static/chunks/3wbm-994r45kr.js",
+   "404 http://localhost:4173/_next/static/chunks/1kb4dcqdypxx7.js",
+   "404 http://localhost:4173/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
+   "404 http://localhost:4173/_next/static/chunks/1dsm8wc_cmjs7.js",
+   "404 http://localhost:4173/_next/static/media/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2",
+   "404 http://localhost:4173/_next/static/chunks/2le4lx6n6ofd3.css",
+   "404 http://localhost:4173/_next/static/media/edb99fec956915f8-s.p.32sris142tqlb.woff2",
+   "404 http://localhost:4173/_next/static/chunks/1x6obpmlu1_c2.js",
+   "404 http://localhost:4173/_next/static/chunks/2r4s4h5xul1n-.js",
+   "404 http://localhost:4173/_next/static/chunks/3wbm-994r45kr.js",
+   "404 http://localhost:4173/_next/static/chunks/1kb4dcqdypxx7.js",
+   "404 http://localhost:4173/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
+   "404 http://localhost:4173/_next/static/chunks/1dsm8wc_cmjs7.js",
+   "404 http://localhost:4173/_next/static/media/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2",
+   "404 http://localhost:4173/_next/static/chunks/2le4lx6n6ofd3.css",
+   "404 http://localhost:4173/_next/static/media/edb99fec956915f8-s.p.32sris142tqlb.woff2",
+   "404 http://localhost:4173/_next/static/chunks/1x6obpmlu1_c2.js",
+   "404 http://localhost:4173/_next/static/chunks/2r4s4h5xul1n-.js",
+   "404 http://localhost:4173/_next/static/chunks/3wbm-994r45kr.js",
+   "404 http://localhost:4173/_next/static/chunks/1kb4dcqdypxx7.js",
+   "404 http://localhost:4173/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
+   "404 http://localhost:4173/_next/static/chunks/1dsm8wc_cmjs7.js",
+   "404 http://localhost:4173/_next/static/media/07c7676b89ed2778-s.p.2bn3s6zvc0dyp.woff2",
+   "404 http://localhost:4173/_next/static/chunks/2le4lx6n6ofd3.css",
+   "404 http://localhost:4173/_next/static/media/edb99fec956915f8-s.p.32sris142tqlb.woff2",
+   "404 http://localhost:4173/_next/static/chunks/1x6obpmlu1_c2.js",
+   "404 http://localhost:4173/_next/static/chunks/2r4s4h5xul1n-.js",
+   "404 http://localhost:4173/_next/static/chunks/3wbm-994r45kr.js",
+   "404 http://localhost:4173/_next/static/chunks/1kb4dcqdypxx7.js",
+   "404 http://localhost:4173/_next/static/chunks/turbopack-3-ry682tkyiqk.js",
+   "404 http://localhost:4173/_next/static/chunks/1dsm8wc_cmjs7.js",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=f4e1]:
  - link "Ir para o conteúdo" [ref=f4e2] [cursor=pointer]:
    - /url: "#conteudo"
  - banner [ref=f4e3]:
    - generic [ref=f4e4]:
      - 'link "[PREENCHER: nome do médico]" [ref=f4e5] [cursor=pointer]':
        - /url: /
      - navigation "Principal" [ref=f4e6]:
        - link "Início" [ref=f4e7] [cursor=pointer]:
          - /url: /
        - link "Sobre" [ref=f4e8] [cursor=pointer]:
          - /url: /sobre/
        - link "Atuação" [ref=f4e9] [cursor=pointer]:
          - /url: /atuacao/
        - link "Consultas" [ref=f4e10] [cursor=pointer]:
          - /url: /consultas/
      - generic [ref=f4e11]:
        - link "Agendar pelo WhatsApp" [ref=f4e13] [cursor=pointer]:
          - /url: /consultas/
        - button "Abrir menu" [ref=f4e14]
  - main [ref=f4e17]:
    - generic [ref=f4e19]:
      - heading "Política de privacidade" [level=1] [ref=f4e21]
      - generic [ref=f4e22]:
        - generic [ref=f4e23]:
          - heading "Dados que este site coleta" [level=2] [ref=f4e24]
          - paragraph [ref=f4e25]: "[PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]"
        - generic [ref=f4e26]:
          - heading "Contato por WhatsApp e telefone" [level=2] [ref=f4e27]
          - paragraph [ref=f4e28]: "[PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]"
        - generic [ref=f4e29]:
          - heading "Área administrativa" [level=2] [ref=f4e30]
          - paragraph [ref=f4e31]: "[PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]"
        - generic [ref=f4e32]:
          - heading "Seus direitos (LGPD)" [level=2] [ref=f4e33]
          - paragraph [ref=f4e34]: "[PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]"
        - generic [ref=f4e35]:
          - heading "Contato do responsável" [level=2] [ref=f4e36]
          - paragraph [ref=f4e37]: "[PREENCHER: texto a ser redigido na Fase 6, com revisão da LGPD]"
  - contentinfo [ref=f4e38]:
    - generic [ref=f4e39]:
      - generic [ref=f4e40]:
        - 'heading "[PREENCHER: nome do médico]" [level=2] [ref=f4e41]'
        - paragraph [ref=f4e42]: "MÉDICO · [PREENCHER: CRM-UF e número]Hematologia · RQE [PREENCHER: número do RQE]"
      - generic [ref=f4e43]:
        - heading "Contato" [level=2] [ref=f4e44]
        - list [ref=f4e45]:
          - listitem [ref=f4e46]: "[PREENCHER: telefone, só dígitos com DDI 55 e DDD]"
          - listitem [ref=f4e47]: "[PREENCHER: e-mail]"
          - listitem [ref=f4e48]: "[PREENCHER: endereço completo do consultório]"
          - listitem [ref=f4e49]: "[PREENCHER: horário de atendimento]"
      - navigation "Rodapé" [ref=f4e50]:
        - heading "Navegação" [level=2] [ref=f4e51]
        - list [ref=f4e52]:
          - listitem [ref=f4e53]:
            - link "Início" [ref=f4e54] [cursor=pointer]:
              - /url: /
          - listitem [ref=f4e55]:
            - link "Sobre" [ref=f4e56] [cursor=pointer]:
              - /url: /sobre/
          - listitem [ref=f4e57]:
            - link "Atuação" [ref=f4e58] [cursor=pointer]:
              - /url: /atuacao/
          - listitem [ref=f4e59]:
            - link "Consultas" [ref=f4e60] [cursor=pointer]:
              - /url: /consultas/
          - listitem [ref=f4e61]:
            - link "Política de privacidade" [ref=f4e62] [cursor=pointer]:
              - /url: /privacidade/
    - generic [ref=f4e64]:
      - paragraph [ref=f4e65]: Este site tem caráter informativo e não substitui a consulta médica. Em caso de emergência, procure o serviço de urgência mais próximo ou ligue 192 (SAMU).
      - paragraph [ref=f4e66]: "© 2026 [PREENCHER: nome do médico]. Todos os direitos reservados."
  - generic [ref=f4e67]:
    - link "WhatsApp" [ref=f4e68] [cursor=pointer]:
      - /url: /consultas/
    - link "Ligar" [ref=f4e69] [cursor=pointer]:
      - /url: /consultas/
```

# Test source

```ts
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
  31  |     await expect(page).toHaveURL(new RegExp(`${PREFIX}/${slug}/$`));
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
> 108 |   expect(bad).toEqual([]);
      |               ^ Error: expect(received).toEqual(expected) // deep equality
  109 | });
  110 | 
```