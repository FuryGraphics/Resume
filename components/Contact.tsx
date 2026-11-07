import { contact, links } from "@/site.config";
import ContactForm from "./ContactForm";
import { Button, SectionIndex, SmartLink } from "./ui";

/**
 * Contact - the last section: a short invitation on the left with email,
 * LinkedIn, and the booking button (once a booking link is set in
 * site.config), and the message form on the right.
 */
export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-32 bg-paper border-t border-hairline">
      <div className="lc-container">
        <SectionIndex label={contact.index} />

        <div className="grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <h2 className="lc-display text-ink" style={{ fontSize: "var(--text-display-section)" }}>
              {contact.heading.lines.map((line, i) => (
                <span key={line} className={`block ${i === contact.heading.accentLine ? "text-accent" : ""}`}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="lc-body mt-6 md:mt-8 text-base md:text-lg text-body max-w-md">
              {contact.intro}
            </p>

            <div className="mt-8 md:mt-10 space-y-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={`mailto:${links.email}`} className="lc-link text-base font-medium text-ink">
                  {links.email}
                </a>
                <SmartLink href={links.linkedin} className="lc-link text-base font-medium text-ink">
                  LinkedIn →
                </SmartLink>
              </div>
              <p className="font-mono-label text-muted">{contact.meta}</p>
            </div>

            {contact.booking.cta.href && (
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-hairline max-w-md">
                <p className="font-mono-label text-accent mb-4">{contact.booking.label}</p>
                <Button href={contact.booking.cta.href} variant="outline" className="w-full sm:w-auto">
                  {contact.booking.cta.label}
                </Button>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
