import Link from "next/link";
import { writing } from "@/site.config";
import { formatDate, type Post } from "@/lib/blog";
import { Offset, SectionIndex } from "./ui";

/** One post preview cell. Shared by the home page section and /blog. */
export function PostCard({ post }: { post: Post }) {
  return (
    <li className="bg-paper">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col h-full p-5 md:p-8 hover:bg-card transition-colors"
      >
        <div className="flex items-center justify-between gap-4 mb-5 md:mb-6">
          <span className="font-mono-label text-accent">{post.tag}</span>
          <span className="font-mono-label text-muted">{formatDate(post.date)}</span>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-ink group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="lc-body mt-3 text-sm md:text-base text-body">{post.description}</p>
        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
            {writing.readLabel} →
          </span>
          {post.placeholder && (
            <span className="lc-placeholder text-[0.625rem] text-muted">{writing.placeholderBadge}</span>
          )}
        </div>
      </Link>
    </li>
  );
}

/**
 * Writing - the six latest posts from content/blog as a hairline grid.
 */
export default function Writing({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" className="py-16 md:py-32 bg-paper border-t border-hairline">
      <div className="lc-container">
        <SectionIndex label={writing.index}>
          <Link
            href={writing.headerLink.href}
            className="lc-link text-sm font-medium text-strong hover:text-ink transition-colors"
          >
            {writing.headerLink.label} →
          </Link>
        </SectionIndex>

        <Offset className="mb-8 md:mb-16" span="md:col-span-9">
          <h2 className="lc-display text-2xl md:text-4xl lg:text-5xl text-ink" data-reveal>
            {writing.heading[0]}
            <br />
            {writing.heading[1]}
          </h2>
        </Offset>

        <Offset>
          <ul
            className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-hairline border border-hairline"
            data-reveal
          >
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        </Offset>
      </div>
    </section>
  );
}
