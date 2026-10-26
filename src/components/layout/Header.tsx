"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doctor, navItems } from "@/content/site";
import { getContactLinks } from "@/lib/contact";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = getContactLinks();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
      <Container className="relative flex h-18 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-primary-dark"
        >
          {doctor.name}
        </Link>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-line bg-background px-6 py-4 md:static md:flex md:flex-row md:gap-2 md:border-0 md:p-0`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-3 text-base hover:bg-sage md:py-2 ${
                isActive(item.href)
                  ? "font-semibold text-primary"
                  : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={links.whatsapp} className="hidden md:inline-flex">
            Agendar pelo WhatsApp
          </ButtonLink>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-primary text-primary md:hidden"
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
}
