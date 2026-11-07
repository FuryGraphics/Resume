import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Ventures from "@/components/Ventures";
import Work from "@/components/Work";
import Writing from "@/components/Writing";
import { getPosts } from "@/lib/blog";

/**
 * Home - the whole site on one page:
 * Hero > About > Ventures (dark) > Work > Writing > Contact, then the dark
 * footer. A personal site: Local Cascade's services and pricing stay on
 * localcascade.com. All copy comes from site.config.ts.
 */
export default async function Home() {
  const posts = (await getPosts()).slice(0, 6);

  return (
    <>
      <Hero />
      <About />
      <Ventures />
      <Work />
      <Writing posts={posts} />
      <Contact />
    </>
  );
}
