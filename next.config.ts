import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

// Blog posts are MDX files in content/blog, imported by app/blog.
const withMDX = createMDX({});

export default withMDX(nextConfig);
