import type { Metadata } from "next";
import { PostCard } from "@/components/Writing";
import { getPosts } from "@/lib/blog";
import { writing } from "@/site.config";

const { blog } = writing;

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: blog.title, description: blog.description },
};

/** /blog - every post in content/blog, newest first. */
export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-32 bg-paper">
      <div className="lc-container">
        <div className="flex items-center gap-3 mb-6 md:mb-12">
          <span className="font-mono-label text-muted">{blog.label}</span>
          <span className="h-px w-8 md:w-12 bg-hairline" />
        </div>

        <h1 className="lc-display text-ink" style={{ fontSize: "var(--text-display-section)" }}>
          {blog.heading[0]}
          <br />
          {blog.heading[1]}
        </h1>
        <p className="lc-body mt-6 md:mt-8 text-base md:text-xl text-body max-w-2xl">{blog.intro}</p>

        <ul className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      </div>
    </section>
  );
}
