import { hero } from "@/site.config";
import { Button } from "./ui";

/**
 * Hero - name, promise, supporting line, two buttons, then a hairline band
 * of who I am at a glance. Light paper with the faint grid texture, accent
 * used once in the promise. Nothing here is scroll-revealed: it is the first
 * paint and has to be readable immediately.
 */
export default function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-28 bg-paper overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none lc-grid-paper" />

      <div className="lc-container relative">
        <div className="flex items-center gap-3 mb-6 md:mb-12">
          <span className="font-mono-label text-muted">{hero.index}</span>
          <span className="h-px w-8 md:w-12 bg-hairline" />
        </div>

        <h1 className="lc-display text-ink" style={{ fontSize: "var(--text-display-hero)" }}>
          {hero.name}
        </h1>

        <p
          className="lc-display leading-[1.08] mt-3 md:mt-5 text-body max-w-4xl"
          style={{ fontSize: "var(--text-display-sub)" }}
        >
          {hero.promise.lead} <span className="text-accent">{hero.promise.accent}</span>
        </p>

        <p className="lc-body mt-6 md:mt-10 text-base md:text-xl text-body max-w-2xl">
          {hero.supporting}
        </p>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button href={hero.primaryCta.href} className="w-full sm:w-auto">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
            {hero.secondaryCta.label}
          </Button>
        </div>

        <dl className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-hairline border border-hairline">
          {hero.facts.map(fact => (
            <div key={fact.label} className="bg-paper p-4 md:p-6">
              <dt className="font-mono-label text-accent text-[0.625rem] md:text-xs mb-1.5 md:mb-2">
                {fact.label}
              </dt>
              <dd className="lc-body text-sm md:text-base font-medium text-ink leading-snug">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
