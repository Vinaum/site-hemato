import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-6">
      {children}
    </div>
  );
}
