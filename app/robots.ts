import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/** /robots.txt - everything is crawlable except the form endpoint. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
