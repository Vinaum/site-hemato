import { expect, test, type Page } from "@playwright/test";

const PREFIX = "/site-hematologista";
const pages = ["", "sobre/", "atuacao/", "consultas/", "privacidade/"];

async function openMenuIfMobile(page: Page) {
  const toggle = page.getByRole("button", { name: "Abrir menu" });
  if (await toggle.isVisible()) await toggle.click();
}

for (const p of pages) {
  test(`página "${p || "inicial"}" responde 200 e tem um único h1`, async ({ page }) => {
    const res = await page.goto(p || "./");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

for (const [label, slug] of [
  ["Sobre", "sobre"],
  ["Atuação", "atuacao"],
  ["Consultas", "consultas"],
] as const) {
  test(`o menu leva a "${label}"`, async ({ page }) => {
    await page.goto("./");
    await openMenuIfMobile(page);
    await page
      .getByRole("navigation", { name: "Principal" })
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`${PREFIX}/${slug}/$`));
    await expect(page.locator("h1")).toBeVisible();
  });
}

test("menu móvel abre, mostra os links e fecha com Esc", async ({ page, isMobile }) => {
  test.skip(!isMobile, "apenas no projeto mobile");
  await page.goto("./");
  const nav = page.getByRole("navigation", { name: "Principal" });
  const toggle = page.getByRole("button", { name: "Abrir menu" });

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();

  await toggle.click();
  const close = page.getByRole("button", { name: "Fechar menu" });
  await expect(close).toHaveAttribute("aria-expanded", "true");
  await expect(nav.getByRole("link", { name: "Sobre", exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(nav).toBeHidden();
});

test("links de WhatsApp e telefone são válidos (reais ou o fallback interno)", async ({ page }) => {
  await page.goto("./");
  const waOk = new RegExp(`^(https://wa\\.me/55\\d{10,11}(\\?.*)?|${PREFIX}/consultas/)$`);
  const telOk = new RegExp(`^(tel:\\+55\\d{10,11}|${PREFIX}/consultas/)$`);

  const wa = await page.getByRole("link", { name: /WhatsApp/ }).all();
  expect(wa.length).toBeGreaterThan(0);
  for (const link of wa) await expect(link).toHaveAttribute("href", waOk);

  const tel = await page.getByRole("link", { name: "Ligar", exact: true }).all();
  expect(tel.length).toBeGreaterThan(0);
  for (const link of tel) await expect(link).toHaveAttribute("href", telOk);
});

test("nenhum link contém placeholder ou 'undefined'", async ({ page }) => {
  for (const p of pages) {
    await page.goto(p || "./");
    const hrefs = await page.locator("a[href]").evaluateAll((els) =>
      els.map((e) => e.getAttribute("href") ?? ""),
    );
    for (const href of hrefs) {
      expect(href, `href suspeito em "${p}"`).not.toMatch(/PREENCHER|undefined|null/i);
    }
  }
});

test("barra de contato fixa aparece só no celular", async ({ page, isMobile }) => {
  await page.goto("./");
  const bar = page.getByTestId("contact-bar");
  if (isMobile) await expect(bar).toBeVisible();
  else await expect(bar).toBeHidden();
});

test("o primeiro Tab foca o link 'Ir para o conteúdo'", async ({ page }) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ir para o conteúdo" })).toBeFocused();
});

test("página inexistente devolve 404", async ({ page }) => {
  const res = await page.goto("nao-existe/");
  expect(res?.status()).toBe(404);
});

test("nenhum recurso falha ao carregar (CSS, JS, fontes, ícone)", async ({ page }) => {
  const bad: string[] = [];
  page.on("response", (r) => {
    if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`);
  });
  for (const p of pages) await page.goto(p || "./", { waitUntil: "networkidle" });
  expect(bad).toEqual([]);
});
