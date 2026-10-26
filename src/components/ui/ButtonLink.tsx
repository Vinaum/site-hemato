import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 py-3 text-base font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-surface hover:bg-primary-dark",
  secondary: "border border-primary text-primary hover:bg-sage",
};

export default function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const classes = `${base} ${variants[variant]} ${className}`;

  // Rotas internas usam <Link> (aplica o basePath). Links externos e tel: usam <a>.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const isWeb = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
