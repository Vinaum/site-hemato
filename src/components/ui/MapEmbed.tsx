import { contact } from "@/content/site";
import { mapReady } from "@/lib/maps";

/** Mapa do Google carregado sob demanda pelo navegador (loading="lazy"). */
export default function MapEmbed({ size = "large" }: { size?: "large" | "small" }) {
  if (!mapReady) return null;

  const small = size === "small";
  const box = small ? "aspect-video" : "aspect-[4/3] min-h-72";

  return (
    <figure className="w-full" data-testid={`map-${size}`}>
      <div className={`overflow-hidden rounded-lg border border-line bg-surface ${box}`}>
        <iframe
          src={contact.mapEmbedUrl as string}
          title={`Mapa: ${contact.address}`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <figcaption className={`mt-2 ${small ? "text-sm" : ""}`}>
        {small ? null : <p>{contact.address}</p>}
        <a
          href={contact.mapUrl as string}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline"
        >
          Abrir no Google Maps
          <span className="sr-only"> (abre em uma nova aba)</span>
        </a>
      </figcaption>
    </figure>
  );
}
