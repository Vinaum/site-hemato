"use client";

import { useEffect, useState } from "react";
import { heroPhotos } from "@/content/pages";
import { withBase } from "@/lib/site";

const INTERVAL_MS = 5000; // como no site de referência
const FRAME =
  "relative aspect-[4/5] overflow-hidden rounded-3xl rounded-tl-[6rem] bg-bronze-light md:rounded-tl-[9rem]";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false); // parado após interação
  const total = heroPhotos.length;
  const multiple = total > 1;

  useEffect(() => {
    if (!multiple || hovered || stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [multiple, hovered, stopped, total]);

  if (total === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription={multiple ? "carrossel" : undefined}
      aria-label="Fotos do Dr. Marco Aurélio Sartori"
      className="mx-auto w-full max-w-md md:max-w-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={FRAME}>
        {heroPhotos.map((photo, i) => {
          const active = i === index;
          const src = (w: number) => withBase(`${photo.base}-${w}.webp`);
          const fallback = photo.widths.find((w) => w >= 800) ?? photo.widths[photo.widths.length - 1];
          return (
            <div
              key={photo.base}
              role={multiple ? "group" : undefined}
              aria-roledescription={multiple ? "slide" : undefined}
              aria-label={multiple ? `${i + 1} de ${total}` : undefined}
              aria-hidden={!active}
              inert={!active}
              className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(fallback)}
                srcSet={photo.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
                sizes="(min-width: 768px) 540px, (min-width: 480px) 448px, 100vw"
                width={800}
                height={1000}
                alt={photo.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
          );
        })}
      </div>

      {multiple ? (
        <div className="mt-4 flex justify-center gap-2">
          {heroPhotos.map((photo, i) => (
            <button
              key={photo.base}
              type="button"
              onClick={() => {
                setIndex(i);
                setStopped(true);
              }}
              aria-label={`Mostrar foto ${i + 1} de ${total}`}
              aria-current={i === index ? "true" : undefined}
              className="flex h-6 items-center"
            >
              <span
                className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-primary-dark/30 hover:bg-primary-dark/50"
                }`}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
