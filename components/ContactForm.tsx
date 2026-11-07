"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact, links } from "@/site.config";
import { Arrow } from "./ui";

/**
 * ContactForm - hairline cells and mono labels, no boxed card, same as Local
 * Cascade's contact form. Posts JSON to the API route named in site.config
 * (app/api/contact/route.ts). If the request fails the visitor is pointed at
 * the email address, so a message is never lost to an error.
 */
const { fields, reasons, success } = contact.form;

const cell = "border-b border-hairline p-4 md:p-6";
const label = "font-mono-label text-muted block mb-2 md:mb-3";
const input =
  "w-full bg-transparent text-base md:text-lg text-ink placeholder:text-faint focus:outline-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLDivElement>(null);

  // The form is much taller than the confirmation that replaces it, so move
  // focus (and with it the viewport) to the confirmation once it appears.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch(contact.form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border-t border-hairline pt-8 md:pt-10 focus:outline-none"
      >
        <span className="font-mono-label text-accent block mb-4">{success.label}</span>
        <p className="lc-display text-ink" style={{ fontSize: "var(--text-display-sub)" }}>
          {success.heading}
        </p>
        <p className="lc-body mt-4 md:mt-6 text-base md:text-lg text-body max-w-md">{success.body}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="lc-cta mt-6 md:mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-accent border border-accent hover:bg-accent hover:text-white cursor-pointer"
        >
          {success.again}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="border-t border-hairline">
      {/* Honeypot: hidden from people, filled in by bots. The API route drops
          any submission that has it set. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Leave this empty</label>
        <input id="contact-hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className={`${cell} sm:border-r`}>
          <label htmlFor="contact-name" className={label}>
            {fields.name.label}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={fields.name.placeholder}
            className={input}
          />
        </div>
        <div className={cell}>
          <label htmlFor="contact-email" className={label}>
            {fields.email.label}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={fields.email.placeholder}
            className={input}
          />
        </div>
      </div>

      <div className={cell}>
        <label htmlFor="contact-reason" className={label}>
          {fields.reason.label}
        </label>
        <select
          id="contact-reason"
          name="reason"
          required
          defaultValue=""
          className={`${input} cursor-pointer`}
        >
          <option value="" disabled>
            {fields.reason.placeholder}
          </option>
          {reasons.map(reason => (
            <option key={reason}>{reason}</option>
          ))}
        </select>
      </div>

      <div className={cell}>
        <label htmlFor="contact-message" className={label}>
          {fields.message.label}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          placeholder={fields.message.placeholder}
          className={`${input} resize-none`}
        />
      </div>

      <div className="pt-5 md:pt-8">
        <button
          type="submit"
          disabled={submitting}
          className="lc-cta inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 text-base font-semibold text-white bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? contact.form.submitting : contact.form.submit}
          {!submitting && <Arrow />}
        </button>

        {status === "error" && (
          <p className="lc-body mt-4 text-sm text-body" role="alert">
            {contact.form.error}{" "}
            <a href={`mailto:${links.email}`} className="lc-link font-medium text-accent">
              {links.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
