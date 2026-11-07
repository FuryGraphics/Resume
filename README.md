# akashkapruwan.com

Personal site for Akash Kapruwan. One page (intro, about, ventures, work, writing, contact) plus an MDX blog at `/blog`. It shares its visual identity with [localcascade.com](https://localcascade.com) but does not repeat Local Cascade's services or pricing: Local Cascade appears as a venture with a link out.

Next.js (App Router) + Tailwind CSS v4, built for Vercel.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run lint
```

## Where things live

| What | Where |
|---|---|
| Every word, link, and CTA | `site.config.ts` |
| Design tokens (colours, type, motion), shared with Local Cascade | `styles/tokens.css` |
| Sections of the home page | `components/` |
| Blog posts (MDX, filename is the URL) | `content/blog/` |
| Contact form endpoint | `app/api/contact/route.ts` |
| SEO: metadata and schema.org Person/Organization | `app/layout.tsx` |
| Sitemap, robots, share image, icons | `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `app/icon.svg` |

## Placeholders to replace

Anything in `[SQUARE BRACKETS]` renders in mono type on the page so it cannot pass for finished copy. Search `site.config.ts` for `[` to find them.

- [ ] **How I work**: the three `about.principles` are a draft, make them sound like you
- [ ] **Work** (optional): `problem` and `result` in `work.cases`, hidden while empty
- [ ] **Booking link**: `links.booking` (Calendly or Cal.com). While empty, "Book a call" scrolls to the contact form
- [ ] **Blog posts**: the three posts in `content/blog/` were drafted for you. Read them before launch; they are published and indexed
- [ ] **Contact form delivery**: set `CONTACT_WEBHOOK_URL` (see below). Until then messages only reach the server log

## Connecting the contact form

The form posts to `/api/contact`, which validates the message and forwards it as JSON to `CONTACT_WEBHOOK_URL`. Any URL that accepts a JSON POST works: a Formspree endpoint (`https://formspree.io/f/<id>`), a Zapier or Make catch hook, or a CRM webhook. Set it in Vercel under Project > Settings > Environment Variables, then redeploy. For local testing copy `.env.example` to `.env.local`.

## Writing a post

Add `content/blog/my-post-title.mdx`:

```mdx
export const metadata = {
  title: "Post title",
  description: "One or two sentences. Used as the preview and the meta description.",
  date: "2026-10-15",
  tag: "LOCAL SEO",
};

Body in Markdown.
```

It appears on `/blog`, in the sitemap, and (if it is one of the six newest) on the home page.

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. In Vercel: Add New > Project, import the repository. The defaults are right (framework: Next.js).
3. Add the `CONTACT_WEBHOOK_URL` environment variable.
4. Deploy, and check the `*.vercel.app` URL.
5. Project > Settings > Domains: add `akashkapruwan.com` and `www.akashkapruwan.com`, and set the apex as primary.
6. At your domain registrar, set the records Vercel shows (normally an `A` record for `@` and a `CNAME` for `www`). The domain already resolves to Vercel, so if it is attached to an old Vercel project, remove it there first.
