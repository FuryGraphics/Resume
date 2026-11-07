"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/site.config";
import { Arrow, SmartLink } from "./ui";

/**
 * Header - minimal fixed navigation, same behaviour as Local Cascade's:
 * transparent over the hero, opaque paper with a hairline once scrolled.
 * Mobile menu is a full-screen paper overlay with body scroll lock. The
 * "Book a call" button stays visible on phones, since most visitors arrive
 * there from LinkedIn.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open, and close it on Escape
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
          scrolled || menuOpen
            ? "bg-paper/90 backdrop-blur-xl border-hairline"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav aria-label="Main" className="lc-container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            onClick={close}
            className="flex items-center gap-2.5 font-bold text-base min-[400px]:text-lg md:text-xl tracking-tight text-ink whitespace-nowrap"
          >
            <span
              aria-hidden="true"
              className="hidden min-[340px]:grid place-items-center h-6 w-6 md:h-7 md:w-7 shrink-0 bg-accent text-white text-[0.625rem] md:text-[0.6875rem] font-bold tracking-normal"
            >
              AK
            </span>
            {site.name}
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {nav.links.map(link => (
              <li key={link.href}>
                <SmartLink
                  href={link.href}
                  className="lc-link text-sm font-medium text-strong hover:text-ink transition-colors"
                >
                  {link.label}
                </SmartLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 md:gap-0">
            <SmartLink
              href={nav.cta.href}
              className="lc-cta inline-flex items-center gap-2 px-3.5 md:px-5 py-2 md:py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover"
            >
              {nav.cta.label}
              <span className="hidden md:inline-flex">
                <Arrow size={14} />
              </span>
            </SmartLink>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden flex flex-col gap-1.5 p-3 -mr-3 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={`block w-6 h-0.5 bg-ink transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-ink transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 md:hidden bg-paper">
          <div className="flex flex-col items-start gap-6 pt-24 px-6 pb-8 h-full overflow-y-auto">
            {nav.links.map(link => (
              <SmartLink
                key={link.href}
                href={link.href}
                onClick={close}
                className="lc-link text-2xl font-semibold text-ink"
              >
                {link.label}
              </SmartLink>
            ))}
            <SmartLink
              href={nav.cta.href}
              onClick={close}
              className="lc-cta mt-4 inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-accent"
            >
              {nav.cta.label}
              <Arrow size={14} />
            </SmartLink>
          </div>
        </div>
      )}
    </>
  );
}
