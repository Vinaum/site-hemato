import { expect, test, type Page } from "@playwright/test";
import { contact } from "../../src/content/site";
import { publications } from "../../src/content/publications";

const PREFIX = "/site-hematologista";
const pages = ["", "sobre/", "atuacao/", "publicacoes/", "consultas/", "privacidade/"];

// Formato aceito pelos links: 55 + DDD + número, só dígitos.
const BR_NUMBER = /^55\d{10,11}$/;
const hasWhatsapp = BR_NUMBER.test(contact.whatsapp ?? "");
const hasPhone = BR_NUMBER.test(contact.phone ?? "");

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

test("links de contato seguem os dados cadastrados", async ({ page }) => {
  await page.goto("./");

  const wa = page.getByRole("link", { name: /WhatsApp/i });
  if (hasWhatsapp) {
    expect(await wa.count()).toBeGreaterThan(0);
    for (const link of await wa.all()) {
      await expect(link).toHaveAttribute(
        "href",
        new RegExp(`^https://wa\\.me/${contact.whatsapp}\\?text=.+$`),
      );
    }
  } else {
    await expect(wa).toHaveCount(0);
  }

  const tel = page.getByRole("link", { name: "Ligar", exact: true });
  if (hasPhone) {
    expect(await tel.count()).toBeGreaterThan(0);
    for (const link of await tel.all()) {
      await expect(link).toHaveAttribute("href", `tel:+${contact.phone}`);
    }
  } else {
    await expect(tel).toHaveCount(0);
  }
});

test("nenhum link contém placeholder ou 'undefined'", async ({ page }) => {
  for (const p of pages) {
    await page.goto(p || "./");

    const hrefs = await page.locator("a[href]").evaluateAll((els) =>
      els.map((e) => e.getAttribute("href") ?? ""),
    );

    for (const href of hrefs) {
      expect(href, `href suspeito em "${p}"`).not.toMatch(
        /PREENCHER|undefined|null/i,
      );
    }
  }
});

test("barra de contato segue os dados e aparece só no celular", async ({ page, isMobile }) => {
  await page.goto("./");
  const bar = page.getByTestId("contact-bar");

  if (!hasWhatsapp && !hasPhone) {
    await expect(bar).toHaveCount(0);
    return;
  }

  await expect(bar).toHaveCount(1);
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

test("imagens têm texto alternativo e carregam", async ({ page }) => {
  for (const p of pages) {
    await page.goto(p || "./");
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect(img).toHaveAttribute("alt", /.+/);
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
        .toBeGreaterThan(0);
    }
  }
});

test("seção de publicações na inicial aparece só quando há publicações", async ({ page }) => {
  await page.goto("./");
  const heading = page.getByRole("heading", { name: "Publicações científicas" });

  if (publications.length === 0) {
    await expect(heading).toHaveCount(0);
    return;
  }

  await expect(heading).toBeVisible();
  await page.getByRole("link", { name: "Ver todas as publicações" }).click();
  await expect(page).toHaveURL(/\/publicacoes\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Publicações científicas");
});

test("mapa só carrega depois do clique", async ({ page }) => {
  const google: string[] = [];
  page.on("request", (r) => {
    if (/google\.com\/maps/.test(r.url())) google.push(r.url());
  });
  await page.goto("./");

  const hasMap = !!contact.address && !!contact.mapEmbedUrl && !!contact.mapUrl;
  const map = page.getByTestId("map-large");
  if (!hasMap) {
    await expect(map).toHaveCount(0);
    return;
  }

  await expect(map.locator("iframe")).toHaveCount(0);
  expect(google).toEqual([]);

  await map.getByRole("button", { name: "Mostrar mapa" }).click();
  await expect(map.locator("iframe")).toHaveAttribute("src", contact.mapEmbedUrl as string);
});
