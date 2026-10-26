import Link from "next/link";
import { contact, doctor, navItems } from "@/content/site";
import { getContactLinks, isPlaceholder } from "@/lib/contact";
import Container from "@/components/ui/Container";

export default function Footer() {
  const links = getContactLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-primary-dark text-surface">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <h2 className="font-serif text-xl text-surface">{doctor.name}</h2>
          <p className="mt-3 text-bronze-light">
            MÉDICO · {doctor.crm}
            <br />
            {doctor.specialty} · RQE {doctor.rqe}
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl text-surface">Contato</h2>
          <ul className="mt-3 space-y-2 text-bronze-light">
            <li>
              {links.phoneReady ? (
                <a href={links.phone} className="underline hover:text-surface">
                  {contact.phoneDisplay}
                </a>
              ) : (
                contact.phone
              )}
            </li>
            <li>
              {isPlaceholder(contact.email) ? (
                contact.email
              ) : (
                <a
                  href={`mailto:${contact.email}`}
                  className="underline hover:text-surface"
                >
                  {contact.email}
                </a>
              )}
            </li>
            <li>{contact.address}</li>
            <li>{contact.hours}</li>
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="font-serif text-xl text-surface">Navegação</h2>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline hover:text-bronze-light">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacidade/" className="underline hover:text-bronze-light">
                Política de privacidade
              </Link>
            </li>
          </ul>
        </nav>
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
