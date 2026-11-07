import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RevealObserver from "@/components/RevealObserver";
import { about, links, person, site, ventures } from "@/site.config";
import "./globals.css";

// Same two families as Local Cascade, self-hosted by next/font so there is no
// request to Google at runtime and no layout shift while they load.
// Both are variable fonts, so each is a single file covering every weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: site.titleTemplate },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: person.name, url: site.url }],
  creator: person.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.ogTitle,
    description: site.ogDescription,
    locale: site.locale,
    firstName: person.givenName,
    lastName: person.familyName,
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.ogDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
};

/** schema.org Person, Organization, and WebSite, linked by @id so search
 *  engines read them as one graph: this person founded that organization. */
const PERSON_ID = `${site.url}/#person`;
const ORG_ID = `${links.localCascade}/#organization`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: person.name,
      givenName: person.givenName,
      familyName: person.familyName,
      url: site.url,
      // Added once a real portrait is set in site.config (about.photo.src)
      ...(about.photo.src ? { image: `${site.url}${about.photo.src}` } : {}),
      jobTitle: person.jobTitle,
      description: site.description,
      email: `mailto:${links.email}`,
      address: { "@type": "PostalAddress", addressCountry: person.countryCode },
      worksFor: { "@id": ORG_ID },
      knowsAbout: person.knowsAbout,
      sameAs: [links.linkedin],
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Local Cascade",
      url: links.localCascade,
      logo: `${links.localCascade}/icon-512.png`,
      description: ventures.primary.description,
      founder: { "@id": PERSON_ID },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Scroll-revealed content must not stay hidden when scripts are off */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body id="top" className="min-h-screen bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
