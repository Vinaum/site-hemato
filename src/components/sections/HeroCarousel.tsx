"use client";

import { useEffect, useState } from "react";
import { heroPhotos } from "@/content/pages";
import { withBase } from "@/lib/site";

const INTERVAL_MS = 6000;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroPhotos.length;
  const multiple = total > 1;

  useEffect(() => {
    if (!multiple || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [multiple, paused, total]);

  if (total === 0) return null;
  const go = (i: number) => setIndex((i + total) % total);

  return (
    <div
      role="region"
      aria-roledescription={multiple ? "carrossel" : undefined}
      aria-label="Fotos do Dr. Marco Aurélio Sartori"
      className="mx-auto w-full max-w-[23.5rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bronze-light shadow-xl shadow-primary-dark/15">
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
              className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src(fallback)}
                srcSet={photo.widths.map((w) => `${src(w)} ${w}w`).join(", ")}
                sizes="(min-width: 400px) 376px, 100vw"
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
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Foto anterior"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary hover:bg-surface"
          >
            <Arrow dir="prev" />
          </button>
          <div className="flex gap-2">
            {heroPhotos.map((photo, i) => (
              <button
                key={photo.base}
                type="button"
                onClick={() => go(i)}
                aria-label={`Mostrar foto ${i + 1} de ${total}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all motion-reduce:transition-none ${
                  i === index ? "w-6 bg-primary" : "w-2.5 bg-primary-dark/30 hover:bg-primary-dark/50"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próxima foto"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary hover:bg-surface"
          >
            <Arrow dir="next" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
