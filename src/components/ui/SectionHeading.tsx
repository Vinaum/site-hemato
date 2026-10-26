export default function SectionHeading({
  id,
  title,
  intro,
  as: Tag = "h2",
}: {
  id?: string;
  title: string;
  intro?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <Tag id={id} className="text-3xl md:text-4xl">
        {title}
      </Tag>
      {intro ? <p className="mt-4 text-lg">{intro}</p> : null}
    </div>
  );
}
