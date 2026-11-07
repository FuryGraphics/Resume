import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Blog posts are MDX files in content/blog. The filename is the slug, and
 * each file exports a `metadata` object:
 *
 *   export const metadata = {
 *     title: "...",
 *     description: "...",   // also the preview excerpt and meta description
 *     date: "2026-10-01",   // ISO date, newest first
 *     tag: "LOCAL SEO",
 *     placeholder: true,    // optional: marks the post, noindexes it, and
 *   };                      // keeps it out of the sitemap
 *
 * To publish a post: add the file. To publish a placeholder: delete the
 * placeholder line.
 */
export type PostMeta = {
  title: string;
  description: string;
  date: string;
  tag: string;
  placeholder?: boolean;
};

export type Post = PostMeta & { slug: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith(".mdx"))
    .map(file => file.replace(/\.mdx$/, ""));
}

export async function loadPost(slug: string): Promise<{ Content: ComponentType; meta: PostMeta }> {
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return { Content: mod.default, meta: mod.metadata as PostMeta };
}

/** Every post's metadata, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    getPostSlugs().map(async slug => ({ slug, ...(await loadPost(slug)).meta }))
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** "2026-10-01" to "OCT 2026", for mono labels. */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`)
    .toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    .toUpperCase();
}
