import type { ReactNode } from "react";
import Container from "./Container";

const tones = {
  default: "",
  sage: "bg-sage",
  surface: "bg-surface",
} as const;

export default function Section({
  children,
  tone = "default",
  labelledBy,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  labelledBy?: string;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={`py-16 md:py-24 ${tones[tone]}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
