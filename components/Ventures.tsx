import Image from "next/image";
import { ventures } from "@/site.config";
import { Button, InkBackdrop, Offset, SectionIndex } from "./ui";

/**
 * Ventures - dark section. Local Cascade is the primary card, and the way
 * off this site for anyone who wants to buy; its services and pricing live
 * there, not here.
 */
export default function Ventures() {
  const { primary } = ventures;

  return (
    <section
      id="ventures"
      className="on-ink relative py-16 md:py-32 bg-ink text-on-ink overflow-hidden"
    >
      <InkBackdrop />

      <div className="lc-container relative">
        <SectionIndex label={ventures.index} tone="ink" />

        <Offset className="mb-8 md:mb-16" span="md:col-span-9">
          <h2 className="lc-display" style={{ fontSize: "var(--text-display-section)" }} data-reveal>
            {ventures.heading[0]}
            <br />
            {ventures.heading[1]}
          </h2>
        </Offset>

        <Offset>
          <div className="border border-hairline-ink" data-reveal>
            <article className="bg-ink p-6 md:p-10 lg:p-12 flex flex-col">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="font-mono-label bg-accent text-white px-2.5 py-1">{primary.role}</span>
                <span className="h-px flex-1 bg-hairline-ink" />
              </div>

              <h3 className="flex items-center gap-3 text-2xl md:text-4xl font-bold tracking-tight">
                <Image
                  src={primary.mark}
                  alt=""
                  width={40}
                  height={40}
                  className="h-8 w-8 md:h-10 md:w-10 shrink-0"
                />
                {primary.name}
              </h3>
              <p className="lc-body mt-4 md:mt-6 text-base md:text-lg text-on-ink-muted max-w-xl">
                {primary.description}
              </p>
              <p className="font-mono-label text-on-ink-muted mt-4 md:mt-6">{primary.motto}</p>

              <div className="mt-auto pt-8 md:pt-10">
                <Button href={primary.cta.href} className="w-full sm:w-auto">
                  {primary.cta.label}
                </Button>
              </div>
            </article>
          </div>
        </Offset>
      </div>
    </section>
  );
}
