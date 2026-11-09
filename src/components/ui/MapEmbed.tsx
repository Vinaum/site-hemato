"use client";

import Link from "next/link";
import { useState } from "react";
import { contact } from "@/content/site";
import { mapReady } from "@/lib/maps";

/**
 * Mapa do Google com "clique para carregar": nenhuma requisição ao Google
 * acontece antes de o visitante escolher ver o mapa.
 */
export default function MapEmbed({ size = "large" }: { size?: "large" | "small" }) {
  const [loaded, setLoaded] = useState(false);
  if (!mapReady) return null;

  const small = size === "small";
  const box = small ? "aspect-video" : "aspect-[4/3] min-h-72";

  return (
    <figure className="w-full" data-testid={`map-${size}`}>
      <div className={`overflow-hidden rounded-lg border border-line bg-surface ${box}`}>
        {loaded ? (
          <iframe
            src={contact.mapEmbedUrl as string}
            title={`Mapa: ${contact.address}`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-ink">
            <p className={small ? "text-sm" : "text-base"}>{contact.address}</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2 font-medium text-surface hover:bg-primary-dark"
            >
              Mostrar mapa
            </button>
            {small ? null : (
              <p className="max-w-xs text-sm">
                Ao carregar, o Google recebe dados de acesso. Veja a{" "}
                <Link href="/privacidade/" className="underline">
                  política de privacidade
                </Link>
                .
              </p>
            )}
          </div>
        )}
      </div>
      <figcaption className={`mt-2 ${small ? "text-sm" : ""}`}>
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
