import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui";
import { formatDate, getPostSlugs, loadPost } from "@/lib/blog";
import { person, site, writing } from "@/site.config";

const { blog } = writing;

type Props = { params: Promise<{ slug: string }> };

// Only the posts that exist in content/blog are built; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const { meta } = await loadPost(slug);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    // Placeholder posts stay out of search results until they are real
    ...(meta.placeholder ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [person.name],
    },
  };
}

/** /blog/<slug> - one MDX post from content/blog. */
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const { Content, meta } = await loadPost(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    url: `${site.url}/blog/${slug}`,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
  };

  return (
    <article className="pt-28 md:pt-40 pb-16 md:pb-32 bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="lc-container">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="lc-link text-sm font-medium text-strong hover:text-ink transition-colors"
          >
            ← {blog.backLabel}
          </Link>

          <header className="mt-8 md:mt-12 pb-8 md:pb-12 border-b border-hairline">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5 md:mb-6">
              <span className="font-mono-label text-accent">{meta.tag}</span>
              <span aria-hidden="true" className="text-ghost text-xs">
                ·
              </span>
              <time dateTime={meta.date} className="font-mono-label text-muted">
                {formatDate(meta.date)}
              </time>
              {meta.placeholder && (
                <span className="lc-placeholder text-xs text-muted">{writing.placeholderBadge}</span>
              )}
            </div>
            <h1 className="lc-display leading-[1.05] text-ink" style={{ fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)" }}>
              {meta.title}
            </h1>
            <p className="lc-body mt-5 md:mt-6 text-base md:text-xl text-body">{meta.description}</p>
            <p className="font-mono-label text-muted mt-6">BY {person.name.toUpperCase()}</p>
          </header>

          <div className="mt-8 md:mt-12">
            <Content />
          </div>

          <aside className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-hairline">
            <h2 className="lc-display leading-tight text-2xl md:text-3xl text-ink">{blog.endCta.heading}</h2>
            <p className="lc-body mt-3 text-base md:text-lg text-body">{blog.endCta.body}</p>
            <Button href={blog.endCta.href} className="mt-6 w-full sm:w-auto">
              {blog.endCta.label}
            </Button>
          </aside>
        </div>
      </div>
    </article>
  );
}
