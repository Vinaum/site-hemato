import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área administrativa",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl px-6 py-12 md:py-16">{children}</div>;
}
