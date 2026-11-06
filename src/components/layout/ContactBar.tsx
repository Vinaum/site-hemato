import { getContactLinks } from "@/lib/contact";
import ButtonLink from "@/components/ui/ButtonLink";

export default function ContactBar() {
  const links = getContactLinks();

  if (!links.whatsappReady && !links.phoneReady) {
    return null;
  }

  return (
    <div
      data-testid="contact-bar"
      className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line bg-surface px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden"
    >
      {links.whatsappReady && links.whatsapp && (
        <ButtonLink href={links.whatsapp} className="flex-1">
          WhatsApp
        </ButtonLink>
      )}

      {links.phoneReady && links.phone && (
        <ButtonLink
          href={links.phone}
          variant="secondary"
          className="flex-1"
        >
          Ligar
        </ButtonLink>
      )}
    </div>
  );
}