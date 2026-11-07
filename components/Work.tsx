import Image from "next/image";
import { work } from "@/site.config";
import { Copy, Offset, SectionIndex, revealDelay } from "./ui";

/**
 * Work - three case-study cards: problem, solution, result. Cropped image,
 * mono category, hairline rows, as in Local Cascade's Work section. A card
 * with no image or link in site.config renders a marked placeholder instead.
 */
export default function Work() {
  const rows = [
    { key: "problem", label: work.labels.problem },
    { key: "solution", label: work.labels.solution },
    { key: "result", label: work.labels.result },
  ] as const;

  return (
    <section id="work" className="py-16 md:py-32 bg-paper">
      <div className="lc-container">
        <SectionIndex label={work.index} />

        <Offset className="mb-8 md:mb-16" span="md:col-span-9">
          <div data-reveal>
            <h2 className="lc-display text-2xl md:text-4xl lg:text-5xl text-ink">
              {work.heading[0]}
              <br />
              {work.heading[1]}
            </h2>
            <p className="lc-body mt-4 md:mt-6 text-sm md:text-base text-body max-w-md">{work.intro}</p>
          </div>
        </Offset>

        <Offset>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-8">
            {work.cases.map((item, i) => (
              <article key={i} className="group flex flex-col" data-reveal style={revealDelay(i)}>
                <div className="relative aspect-[4/3] overflow-hidden bg-well border border-hairline">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center lc-placeholder text-xs text-body">
                      {work.imagePlaceholder}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 font-mono-label text-white bg-black/60 px-2 py-1 text-[0.625rem] md:text-xs">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-4 md:mt-5 text-lg md:text-xl font-semibold text-ink">
                  <Copy>{item.title}</Copy>
                </h3>

                <dl className="mt-4 border-t border-hairline">
                  {rows.map(row => (
                    <div key={row.key} className="py-3 border-b border-hairline">
                      <dt
                        className={`font-mono-label mb-1 text-[0.625rem] md:text-xs ${
                          row.key === "result" ? "text-accent" : "text-muted"
                        }`}
                      >
                        {row.label}
                      </dt>
                      <dd
                        className={`lc-body text-sm ${
                          row.key === "result" ? "text-ink font-semibold" : "text-body"
                        }`}
                      >
                        <Copy>{item[row.key]}</Copy>
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="font-mono-label text-muted text-[0.625rem] md:text-xs mt-3">
                  {item.meta}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lc-link self-start mt-auto pt-4 font-mono-label text-accent"
                    aria-label={`${work.liveLabel}: ${item.title}`}
                  >
                    {work.liveLabel} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </Offset>
      </div>
    </section>
  );
}
