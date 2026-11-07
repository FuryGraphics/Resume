import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { site } from "@/site.config";

/** /sitemap.xml - the home page, the blog, and every published post.
 *  Placeholder posts are left out until they are real. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter(post => !post.placeholder);

  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map(post => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
