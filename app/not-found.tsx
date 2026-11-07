import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-32 bg-paper">
      <div className="lc-container">
        <div className="flex items-center gap-3 mb-6 md:mb-12">
          <span className="font-mono-label text-muted">404 / NOT FOUND</span>
          <span className="h-px w-8 md:w-12 bg-hairline" />
        </div>
        <h1 className="lc-display text-ink" style={{ fontSize: "var(--text-display-section)" }}>
          This page
          <br />
          <span className="text-accent">isn&apos;t here.</span>
        </h1>
        <p className="lc-body mt-6 md:mt-8 text-base md:text-xl text-body max-w-xl">
          It may have moved, or the link was mistyped.
        </p>
        <Button href="/" className="mt-8 md:mt-12 w-full sm:w-auto">
          Back to the home page
        </Button>
      </div>
    </section>
  );
}
