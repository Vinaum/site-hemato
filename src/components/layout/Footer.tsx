import Link from "next/link";
import { contact, doctor, navItems } from "@/content/site";
import { getContactLinks } from "@/lib/contact";
import { mapReady } from "@/lib/maps";
import { withBase } from "@/lib/site";
import Container from "@/components/ui/Container";
import MapEmbed from "@/components/ui/MapEmbed";

type ContactItem = { label: string; value: string; href: string; external: boolean };

/** 5518991061661 -> (18) 99106-1661 */
function formatBrPhone(digits: string | null): string | null {
  if (!digits || !/^55\d{10,11}$/.test(digits)) return null;
  const n = digits.slice(4);
  return `(${digits.slice(2, 4)}) ${n.slice(0, -4)}-${n.slice(-4)}`;
}

/** https://www.instagram.com/usuario/ -> @usuario */
function instagramHandle(url: string | null): string | null {
  const m = url?.match(/^https:\/\/(www\.)?instagram\.com\/([A-Za-z0-9._]+)\/?$/);
  return m ? `@${m[2]}` : null;
}

const heading = "font-serif text-lg text-surface";
const label = "block text-xs font-medium uppercase tracking-wider text-surface";
const link = "underline underline-offset-4 hover:text-surface";

export default function Footer() {
  const links = getContactLinks();
  const year = new Date().getFullYear();
  const insta = instagramHandle(contact.instagram);

  const items: ContactItem[] = [];
  if (links.whatsapp) {
    items.push({
      label: "WhatsApp",
      value: formatBrPhone(contact.whatsapp) ?? "Enviar mensagem",
      href: links.whatsapp,
      external: true,
    });
  }
  if (links.phone) {
    items.push({
      label: "Telefone",
      value: contact.phoneDisplay ?? formatBrPhone(contact.phone) ?? "Ligar",
      href: links.phone,
      external: false,
    });
  }
  if (contact.email) {
    items.push({ label: "E-mail", value: contact.email, href: `mailto:${contact.email}`, external: false });
  }
  if (insta && contact.instagram) {
    items.push({ label: "Instagram", value: insta, href: contact.instagram, external: true });
  }

  const footerNav = [...navItems, { href: "/privacidade/", label: "Política de privacidade" }];

  return (
    <footer className="mt-24 bg-primary-dark text-bronze-light">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase("/images/marca/logo-claro-2x.webp")}
              srcSet={`${withBase("/images/marca/logo-claro-3x.webp")} 2x`}
              width={287}
              height={64}
              alt={doctor.name}
              loading="lazy"
              decoding="async"
              className="h-14 w-auto md:h-16"
            />
          </h2>
          <p className="mt-4">MÉDICO · {doctor.crm}</p>
          <ul className="mt-1 text-sm">
            {doctor.specialties.map((s) => (
              <li key={s.rqe}>
                {s.title} · RQE {s.rqe}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container>
        <hr className="border-t border-bronze-light/25" />
      </Container>

      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <section aria-labelledby="rodape-contato">
          <h2 id="rodape-contato" className={heading}>
            Contato
          </h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.label}>
                <span className={label}>{item.label}</span>
                <a
                  href={item.href}
                  className={link}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.value}
                  {item.external ? <span className="sr-only"> (abre em uma nova aba)</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {contact.address ? (
          <section aria-labelledby="rodape-endereco">
            <h2 id="rodape-endereco" className={heading}>
              Endereço
            </h2>
            <address className="mt-4 not-italic">{contact.address}</address>
            {contact.hours ? (
              <p className="mt-4">
                <span className={label}>Horário</span>
                {contact.hours}
              </p>
            ) : null}
          </section>
        ) : null}

        {mapReady ? (
          <div>
            <MapEmbed size="small" />
          </div>
        ) : null}
      </Container>

      <div className="border-t border-bronze/50">
        <Container className="py-6 text-sm text-bronze-light">
          <p>
            Este site tem caráter informativo e não substitui a consulta médica.
            Em caso de emergência, procure o serviço de urgência mais próximo
            ou ligue 192 (SAMU).
          </p>
          <p className="mt-2">
            © {year} {doctor.name}. Todos os direitos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
