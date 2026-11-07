import type { MDXComponents } from "mdx/types";
import { SmartLink } from "@/components/ui";

/**
 * How MDX elements render in blog posts: the same type system as the rest
 * of the site (Inter body at 1.7, tight bold headings, hairline rules, one
 * accent for links). Required by @next/mdx.
 */
const components: MDXComponents = {
  h2: props => (
    <h2 className="lc-display leading-tight text-2xl md:text-3xl text-ink mt-12 md:mt-16 mb-4" {...props} />
  ),
  h3: props => <h3 className="text-xl md:text-2xl font-semibold text-ink mt-10 mb-3" {...props} />,
  p: props => <p className="lc-body text-base md:text-lg text-body my-5" {...props} />,
  ul: props => <ul className="lc-body text-base md:text-lg text-body my-5 pl-5 list-disc space-y-2 marker:text-accent" {...props} />,
  ol: props => <ol className="lc-body text-base md:text-lg text-body my-5 pl-5 list-decimal space-y-2 marker:text-accent marker:font-semibold" {...props} />,
  li: props => <li className="pl-1" {...props} />,
  strong: props => <strong className="font-semibold text-ink" {...props} />,
  a: ({ href = "#", children }) => (
    <SmartLink href={href} className="text-accent font-medium underline underline-offset-4 hover:text-accent-hover">
      {children}
    </SmartLink>
  ),
  blockquote: props => (
    <blockquote className="my-8 border-l-2 border-accent pl-5 md:pl-6 [&>p]:text-ink [&>p]:font-medium" {...props} />
  ),
  hr: () => <hr className="my-10 md:my-14 border-hairline" />,
  code: props => (
    <code className="font-mono text-[0.9em] bg-well border border-hairline px-1.5 py-0.5" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
