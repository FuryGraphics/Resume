import { footer, links, site } from "@/site.config";
import { SmartLink } from "./ui";

/**
 * Footer - dark, editorial, with the wordmark, a one-line blurb, and
 * structured links. Same grid as Local Cascade's footer.
 */
export default function Footer() {
  return (
    <footer className="on-ink relative bg-ink text-on-ink pt-12 md:pt-24 pb-8 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="lc-container relative">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 pb-10 md:pb-16 border-b border-hairline-ink-soft">
          {/* Wordmark + blurb */}
          <div className="col-span-12 md:col-span-5">
            <SmartLink
              href="/"
              className="flex items-center gap-3 text-2xl md:text-4xl font-bold tracking-tight"
            >
              <span
                aria-hidden="true"
                className="grid place-items-center h-8 w-8 md:h-10 md:w-10 shrink-0 bg-accent text-white text-xs md:text-sm font-bold tracking-normal"
              >
                AK
              </span>
              {site.name}
            </SmartLink>
            <p className="lc-body mt-4 md:mt-6 text-sm md:text-base text-on-ink-muted max-w-sm">
              {footer.blurb}
            </p>
            <p className="font-mono-label text-on-ink-muted mt-4 md:mt-6">{footer.motto}</p>
          </div>

          {/* Link columns */}
          {footer.columns.map((column, i) => (
            <nav
              key={column.label}
              aria-label={column.label.toLowerCase()}
              className={`col-span-6 ${i === 0 ? "md:col-span-2 md:col-start-7" : "md:col-span-2"}`}
            >
              <p className="font-mono-label text-on-ink-muted mb-4 md:mb-5">{column.label}</p>
              <ul className="space-y-2 md:space-y-3">
                {/* A link with no URL yet (Case Climb) is left out */}
                {column.links.filter(link => link.href).map(link => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      className="lc-link text-sm text-on-ink-soft hover:text-white transition-colors"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="col-span-12 md:col-span-2">
            <p className="font-mono-label text-on-ink-muted mb-4 md:mb-5">CONTACT</p>
            <ul className="space-y-2 md:space-y-3 mb-4">
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="lc-link text-sm text-on-ink-soft hover:text-white transition-colors break-all"
                >
                  {links.email}
                </a>
              </li>
              <li>
                <SmartLink
                  href={links.linkedin}
                  className="lc-link text-sm text-on-ink-soft hover:text-white transition-colors"
                >
                  LinkedIn
                </SmartLink>
              </li>
            </ul>
            <p className="font-mono-label text-on-ink-muted">{footer.location}</p>
          </div>
        </div>

        {/* Copyright + back to top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 md:pt-8">
          <p className="font-mono-label text-on-ink-muted">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <a
            href="#top"
            className="lc-link inline-flex items-center gap-2 text-sm text-on-ink-soft hover:text-white transition-colors self-start"
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
