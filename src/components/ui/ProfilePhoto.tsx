import { doctor } from "@/content/site";
import { withBase } from "@/lib/site";

const BASE = "/images/dr-marco-sartori";
const WIDTHS = [480, 800];

export default function ProfilePhoto({
  priority = false,
  sizes,
  className = "",
}: {
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const src = (w: number) => withBase(`${BASE}-${w}.webp`);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src(800)}
      srcSet={WIDTHS.map((w) => `${src(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={800}
      height={1000}
      alt={`Retrato do ${doctor.name}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`block aspect-[4/5] w-full rounded-lg object-cover ${className}`}
    />
  );
}
