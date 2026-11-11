import { practiceAreas } from "@/content/pages";
import Card from "@/components/ui/Card";

/** "summary": cartões na página inicial. "full": grupos com etiquetas na página Atuação. */
export default function PracticeAreas({
  variant = "summary",
}: {
  variant?: "summary" | "full";
}) {
  if (variant === "summary") {
    return (
      <ul className="grid gap-6 md:grid-cols-3">
        {practiceAreas.map((area) => (
          <li key={area.title} className="h-full">
            <Card>
              <h3 className="text-xl">{area.title}</h3>
              <ul className="mt-4 space-y-2">
                {area.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-12">
      {practiceAreas.map((area, i) => (
        <section key={area.title} aria-labelledby={`area-${i}`}>
          <h2 id={`area-${i}`} className="text-2xl">
            {area.title}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {area.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface px-4 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
