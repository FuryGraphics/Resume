"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * RevealObserver - one observer for the whole page. Any element marked
 * data-reveal fades up once when it scrolls into view (styles in globals.css).
 * Mounted once in the layout so the sections themselves stay server-rendered.
 * Re-runs on route change to pick up the new page's elements.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
    );
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
