import Image from "next/image";
import { about, links } from "@/site.config";
import { Copy, Offset, SectionIndex, SmartLink, revealDelay } from "./ui";

/**
 * About - the founder story. The large statement of why, then the portrait
 * beside the story, then how I work. Same structure as Local Cascade's About
 * section, with a person in it.
 */
export default function About() {
  return (
    <section id="about" className="py-16 md:py-32 bg-paper border-t border-hairline">
      <div className="lc-container">
        <SectionIndex label={about.index} />

        {/* Statement */}
        <div className="grid grid-cols-12 gap-4 mb-12 md:mb-24">
          <div className="col-span-12 md:col-span-2 mb-2 md:mb-0">
            <span className="font-mono-label text-muted">{about.sideLabel}</span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="lc-display text-ink leading-snug max-w-4xl"
              style={{ fontSize: "var(--text-display-statement)" }}
              data-reveal
            >
              {about.statement.lead}{" "}
              <span className="text-muted font-normal">{about.statement.rest}</span>
            </h2>
          </div>
        </div>

        {/* Portrait + story */}
        <Offset className="mb-12 md:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-10 gap-8 lg:gap-14">
            <figure className="sm:col-span-4" data-reveal>
              <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-well">
                {about.photo.src ? (
                  <Image
                    src={about.photo.src}
                    alt={about.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center lc-placeholder text-sm text-body">
                    {about.photo.placeholder}
                  </span>
                )}
              </div>
              <figcaption className="font-mono-label text-muted mt-3 text-[0.625rem] md:text-xs">
                {about.photo.caption}
              </figcaption>
            </figure>

            <div className="sm:col-span-6" data-reveal style={revealDelay(1)}>
              <div className="space-y-5 max-w-xl">
                {about.paragraphs.map(paragraph => (
                  <p key={paragraph} className="lc-body text-base md:text-lg text-body">
                    <Copy>{paragraph}</Copy>
                  </p>
                ))}
              </div>

              <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <SmartLink
                  href={links.linkedin}
                  className="lc-link text-base font-medium text-ink hover:text-accent transition-colors"
                >
                  LinkedIn →
                </SmartLink>
                <a
                  href={`mailto:${links.email}`}
                  className="lc-link text-base font-medium text-ink hover:text-accent transition-colors"
                >
                  {links.email}
                </a>
              </div>
            </div>
          </div>
        </Offset>

        {/* How I work */}
        <Offset>
          <p className="font-mono-label text-muted mb-4 md:mb-6">{about.principlesLabel}</p>
          <ul
            className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline border border-hairline"
            data-reveal
          >
            {about.principles.map(principle => (
              <li key={principle.num} className="bg-paper p-5 md:p-8">
                <span className="font-mono-label text-accent block mb-3 md:mb-4">{principle.num}</span>
                <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">{principle.title}</h3>
                <p className="lc-body text-sm md:text-base text-body">{principle.text}</p>
              </li>
            ))}
          </ul>
        </Offset>
      </div>
    </section>
  );
}
