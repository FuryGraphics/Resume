/**
 * site.config.ts - every word, link, and CTA on akashkapruwan.com.
 *
 * Components read from here and hold no copy of their own, so a change to
 * the site is a change to this file.
 *
 * This is a personal site. Local Cascade's services, pricing, and process
 * live on localcascade.com and are not repeated here; Local Cascade appears
 * as one of the ventures, with a link out.
 *
 * PLACEHOLDERS: anything in [SQUARE BRACKETS] is waiting on real content and
 * renders in mono on the page so it cannot pass for finished copy. Search
 * this file for "[" to find them all. Empty strings ("") are optional links
 * and images; the comment beside each says what happens while it is empty.
 *
 * House rule carried over from Local Cascade: no em dashes. Use a comma, a
 * colon, or a full stop.
 */

const LOCAL_CASCADE = "https://localcascade.com";

/* ------------------------------------------------------------------ */
/* Site, person, links                                                 */
/* ------------------------------------------------------------------ */

export const site = {
  url: "https://akashkapruwan.com",
  name: "Akash Kapruwan",
  title: "Akash Kapruwan | Entrepreneur, Founder of Local Cascade",
  titleTemplate: "%s | Akash Kapruwan",
  description:
    "Akash Kapruwan is an entrepreneur based in India, the founder of Local Cascade, and co-founder and Chief Growth Officer of Case Climb. He builds and runs the systems that get local and service businesses more customers.",
  ogTitle: "Akash Kapruwan | Entrepreneur, Founder of Local Cascade",
  ogDescription:
    "Entrepreneur based in India. Founder of Local Cascade, co-founder and Chief Growth Officer of Case Climb. I build and run the systems that get local businesses more customers.",
  locale: "en_US",
  themeColor: "#0D0D0D",
  keywords: [
    "Akash Kapruwan",
    "Local Cascade founder",
    "Case Climb",
    "entrepreneur India",
    "local SEO",
    "growth for local businesses",
  ],
};

export const person = {
  name: "Akash Kapruwan",
  givenName: "Akash",
  familyName: "Kapruwan",
  jobTitle: "Founder, Local Cascade",
  countryCode: "IN",
  knowsAbout: [
    "Entrepreneurship",
    "Local SEO",
    "Google Business Profile Optimization",
    "Customer Acquisition for Local Businesses",
    "Marketing Automation",
    "AI for Small Business",
  ],
};

export const links = {
  email: "hello@localcascade.com",
  linkedin: "https://www.linkedin.com/in/akashkapruwan",
  localCascade: LOCAL_CASCADE,
  /**
   * [CALENDLY/CAL.COM URL] Paste your booking link here. While it is empty,
   * every "Book a call" button scrolls to the contact form instead, so the
   * button works from day one.
   */
  booking: "",
  /** [CASE CLIMB URL] While empty, the Case Climb card renders without a link. */
  caseClimb: "",
};

/** Resolved booking link. Use this, not links.booking, in components. */
export const bookingHref = links.booking || "#contact";

/* ------------------------------------------------------------------ */
/* Header and footer                                                   */
/* ------------------------------------------------------------------ */

export const nav = {
  links: [
    { label: "About", href: "/#about" },
    { label: "Ventures", href: "/#ventures" },
    { label: "Work", href: "/#work" },
    { label: "Writing", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
  cta: { label: "Book a call", href: links.booking || "/#contact" },
};

export const footer = {
  blurb:
    "Entrepreneur based in India. Founder of Local Cascade, co-founder and Chief Growth Officer of Case Climb.",
  motto: "I BUILD IT, I SHIP IT, I OWN THE RESULT.",
  location: "INDIA · WORKING GLOBALLY",
  columns: [
    {
      label: "SITE",
      links: [
        { label: "About", href: "/#about" },
        { label: "Ventures", href: "/#ventures" },
        { label: "Work", href: "/#work" },
        { label: "Writing", href: "/blog" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    {
      label: "VENTURES",
      links: [
        { label: "Local Cascade", href: LOCAL_CASCADE },
        // Shown once links.caseClimb is set (see components/Footer.tsx)
        { label: "Case Climb", href: links.caseClimb },
      ],
    },
  ],
  copyright: "AKASH KAPRUWAN - ALL RIGHTS RESERVED",
};

/* ------------------------------------------------------------------ */
/* 00 Hero                                                             */
/* ------------------------------------------------------------------ */

export const hero = {
  index: "00 / INTRO",
  name: "Akash Kapruwan",
  /** The promise line. `accent` is the part set in blue. */
  promise: { lead: "I build and run the systems that get local businesses", accent: "more customers." },
  supporting:
    "I'm an entrepreneur and operator. I founded Local Cascade, and I'm co-founder and Chief Growth Officer at Case Climb. I don't hand over a deliverable and walk away. I build the thing, ship it fast, and stay on it until it brings in calls.",
  primaryCta: { label: "Book a call", href: bookingHref },
  secondaryCta: { label: "Connect on LinkedIn", href: links.linkedin },
  /** The facts band under the buttons: who I am at a glance. */
  facts: [
    { label: "FOUNDER", value: "Local Cascade" },
    { label: "CO-FOUNDER & CGO", value: "Case Climb" },
    { label: "BASED IN", value: "India" },
    { label: "WORKS WITH", value: "Clients worldwide, mainly in the US" },
  ],
};

/* ------------------------------------------------------------------ */
/* 01 About                                                            */
/* ------------------------------------------------------------------ */

export const about = {
  index: "01 / ABOUT",
  sideLabel: "WHY I DO THIS",
  /** The large statement. `lead` is set in ink, `rest` in grey. */
  statement: {
    lead: "Most small businesses get sold four separate things: a web designer, an SEO agency, a reputation tool, and a chat widget.",
    rest: "Four invoices, four logins, and nothing that talks to each other. I started Local Cascade so a business gets one system that works, and someone who keeps it working long after launch day.",
  },
  photo: {
    /** Square source, cropped to 4:5 by the frame; the face sits in the centre. */
    src: "/images/akash.webp",
    alt: "Akash Kapruwan",
    placeholder: "[YOUR PHOTO]",
    caption: "AKASH KAPRUWAN · INDIA",
  },
  paragraphs: [
    "I'm Akash. I'm an entrepreneur based in India, and I work with local and service businesses around the world, mostly in the US: home services, contractors, clinics, law firms, accountants, agencies, and more.",
    "What I do for them is simple to say. I build the whole system that gets a business found, trusted, and hired, I ship it in days rather than months, and I keep running it after launch. If it isn't bringing in customers, that is mine to fix.",
    "[YOUR STORY: two or three sentences in your own words. What you were doing before, how you got into this, and the moment you decided to build your own companies.]",
  ],
  /** How I work. Edit freely: these should sound like you. */
  principlesLabel: "HOW I WORK",
  principles: [
    { num: "01", title: "Outcomes over deliverables", text: "A website that doesn't bring in calls isn't finished. I measure the work by what it brings in." },
    { num: "02", title: "Ship, then keep running it", text: "Days, not months. Then I stay on it, because launch day is where the work starts." },
    { num: "03", title: "Plain words, plain numbers", text: "No agency fluff, no lock-in, no surprises. You always know what you're paying for and why." },
  ],
};

/* ------------------------------------------------------------------ */
/* 02 Ventures                                                         */
/* ------------------------------------------------------------------ */

export const ventures = {
  index: "02 / VENTURES",
  heading: ["What I'm", "building."],
  primary: {
    role: "FOUNDER",
    name: "Local Cascade",
    mark: "/local-cascade-mark.svg",
    description:
      "The complete customer-getting system for local businesses: a custom website, local SEO, an automated Google review funnel, and AI missed-call text back, built and run as one system.",
    motto: "YOU RUN THE BUSINESS. WE BRING THE CUSTOMERS.",
    cta: { label: "Visit localcascade.com", href: LOCAL_CASCADE },
  },
  /** Set to null to remove the Case Climb card entirely. */
  secondary: {
    role: "CO-FOUNDER & CHIEF GROWTH OFFICER",
    name: "Case Climb",
    description: "[CASE CLIMB: one or two lines on what it does and who it is for.]",
    cta: { label: "Visit Case Climb", href: links.caseClimb },
  } as {
    role: string;
    name: string;
    description: string;
    cta: { label: string; href: string };
  } | null,
};

/* ------------------------------------------------------------------ */
/* 03 Work                                                             */
/* ------------------------------------------------------------------ */

export const work = {
  index: "03 / WORK",
  heading: ["Systems I have", "already built."],
  intro: "A few of the businesses I have built for, across different industries.",
  labels: { problem: "PROBLEM", solution: "SOLUTION", result: "RESULT" },
  liveLabel: "VIEW LIVE SITE",
  /**
   * Cards 1 and 2 are the two builds shown on localcascade.com; their
   * solution lines are taken from that page. Problem and result are yours to
   * fill in. Card 3 is a full placeholder for a third industry. Do not
   * publish a result you cannot back up.
   */
  cases: [
    {
      category: "HOME SERVICES",
      title: "Website & Marketing System For Contractors",
      image: "/images/work-contractors.webp",
      problem: "[PROBLEM: what was costing this business calls before the build.]",
      solution:
        "A conversion-focused website, an automated review funnel, missed call text back, and one-click SMS campaigns, built as one system for home service contractors.",
      result: "[CLIENT RESULT]",
      meta: "WEBSITE · REVIEW FUNNEL · MISSED CALL TEXT BACK · SMS CAMPAIGNS",
      link: "https://www.estimate-engine.com/",
    },
    {
      category: "ROOFING",
      title: "Forever Homes Roof Restoration",
      image: "/images/work-roofing.webp",
      problem: "[PROBLEM: what was costing this business calls before the build.]",
      solution:
        "A complete digital setup for a Tampa Bay roofing restoration company: website build, Google review funnel, free inspection booking automation, and a local SEO foundation.",
      result: "[CLIENT RESULT]",
      meta: "WEBSITE · GOOGLE REVIEW FUNNEL · LOCAL SEO · INSPECTION BOOKING",
      link: "https://www.foreverhomesroofrestoration.com/",
    },
    {
      category: "[INDUSTRY]",
      title: "[CLIENT NAME]",
      image: "",
      problem: "[PROBLEM]",
      solution: "[SOLUTION]",
      result: "[CLIENT RESULT]",
      meta: "[WHAT YOU BUILT]",
      link: "",
    },
  ],
  imagePlaceholder: "[CASE STUDY IMAGE]",
};

/* ------------------------------------------------------------------ */
/* 04 Writing                                                          */
/* ------------------------------------------------------------------ */

export const writing = {
  index: "04 / WRITING",
  heading: ["Things I've", "learned."],
  headerLink: { label: "All writing", href: "/blog" },
  readLabel: "Read",
  /** Shown on posts whose metadata has placeholder: true. */
  placeholderBadge: "[PLACEHOLDER POST]",
  blog: {
    title: "Writing",
    description:
      "Notes from Akash Kapruwan on local SEO, Google reviews, AI for small businesses, and building companies.",
    label: "WRITING",
    heading: ["Things I've", "learned."],
    intro:
      "Notes from building companies and running customer-getting systems for local and service businesses. Local SEO, reviews, and where AI is actually useful.",
    backLabel: "All writing",
    endCta: {
      heading: "Want to talk about this?",
      body: "I read every message. Tell me what you're working on.",
      label: "Get in touch",
      href: "/#contact",
    },
  },
};

/* ------------------------------------------------------------------ */
/* 05 Contact                                                          */
/* ------------------------------------------------------------------ */

export const contact = {
  index: "05 / CONTACT",
  heading: { lines: ["Let's", "talk."], accentLine: 1 },
  intro:
    "Working on a local or service business and want more customers from it? Building something and want to compare notes? Send me a message. I read every one.",
  meta: "I REPLY WITHIN 24H",
  booking: {
    label: "PREFER A CALL?",
    cta: { label: "Book a call", href: links.booking },
  },
  form: {
    /** The API route the form posts to. See app/api/contact/route.ts. */
    action: "/api/contact",
    fields: {
      name: { label: "YOUR NAME", placeholder: "Jane Doe" },
      email: { label: "EMAIL", placeholder: "jane@company.com" },
      reason: { label: "WHAT'S IT ABOUT", placeholder: "Choose one" },
      message: { label: "MESSAGE", placeholder: "A few lines on what you have in mind..." },
    },
    reasons: [
      "Growing my business",
      "Local Cascade",
      "Case Climb",
      "Partnership or collaboration",
      "Podcast, speaking, or press",
      "Something else",
    ],
    submit: "Send message",
    submitting: "Sending...",
    error: "That did not go through. Try again, or email me at",
    success: {
      label: "MESSAGE SENT",
      heading: "Thanks, I've got it.",
      body: "I'll read it and get back to you within 24 hours.",
      again: "Send another message",
    },
  },
};
