import { hemoview } from "@/content/pages";
import ButtonLink from "@/components/ui/ButtonLink";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

export function hemoviewEmbedUrl(id: string, start = 0): string | null {
  if (!VIDEO_ID.test(id)) return null;
  const query = start > 0 ? `?start=${Math.floor(start)}` : "";
  return `https://www.youtube-nocookie.com/embed/${id}${query}`;
}

export default function Hemoview() {
  const { featured } = hemoview;
  const embed = hemoviewEmbedUrl(featured.id, featured.start);
  const videoTitle = featured.title ?? `Episódio em destaque do ${hemoview.name}`;

  return (
    <Section labelledBy="hemoview-titulo">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="font-medium text-primary">{hemoview.role}</p>
          <SectionHeading id="hemoview-titulo" title={hemoview.name} />
          <p className="-mt-4 max-w-prose text-lg">{hemoview.description}</p>
          <div className="mt-8">
            <ButtonLink href={hemoview.channelUrl}>Ver o canal no YouTube</ButtonLink>
          </div>
        </div>

        {embed ? (
          <figure data-testid="hemoview-video">
            <div className="aspect-video overflow-hidden rounded-lg border border-line bg-surface">
              <iframe
                src={embed}
                title={videoTitle}
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {featured.title ? (
              <figcaption className="mt-2 text-sm">{featured.title}</figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </Section>
  );
}
