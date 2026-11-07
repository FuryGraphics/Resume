import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Shared building blocks: the pieces every section on Local Cascade repeats.
 * Square corners, hairlines, one accent, mono labels.
 */

type Tone = "paper" | "ink";

export function Arrow({ size = 16 }: { size?: 14 | 16 }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <path
        d={size === 14 ? "M3 7H11M11 7L7 3M11 7L7 11" : "M3 8H13M13 8L8 3M13 8L8 13"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Renders copy from site.config, setting any [BRACKETED PLACEHOLDER] in mono
 *  so unfinished content is obvious on the page. */
export function Copy({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className="lc-placeholder">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

/** Internal routes go through next/link. Same-page anchors and external URLs
 *  stay plain links. Local Cascade opens in the same tab, since it is the same
 *  brand; anything else off-site opens in a new one. */
export function SmartLink({
  href,
  className,
  children,
  onClick,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  const offSite = /^https?:\/\//.test(href) && !href.includes("localcascade.com");
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(offSite ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

const buttonBase =
  "lc-cta inline-flex items-center justify-center gap-2 font-semibold text-base px-6 md:px-7 py-3 md:py-3.5";

export const buttonStyles = {
  primary: `${buttonBase} text-white bg-accent hover:bg-accent-hover`,
  outline: `${buttonBase} text-accent border border-accent hover:bg-accent hover:text-white`,
  outlineOnInk: `${buttonBase} text-white border border-white/40 hover:bg-white hover:text-ink`,
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: ReactNode;
}) {
  return (
    <SmartLink href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
      {variant === "primary" && <Arrow />}
    </SmartLink>
  );
}

/** The left-rail section index: "03 / WHAT I BUILD" and a hairline. */
export function SectionIndex({
  label,
  tone = "paper",
  children,
}: {
  label: string;
  tone?: Tone;
  /** Optional link at the right end of the rule. */
  children?: ReactNode;
}) {
  const rule = tone === "ink" ? "bg-hairline-ink" : "bg-hairline";
  return (
    <div className="grid grid-cols-12 gap-4 mb-8 md:mb-16 items-center">
      <div className="col-span-12 md:col-span-3 lg:col-span-2">
        <span className={`font-mono-label ${tone === "ink" ? "text-on-ink-muted" : "text-muted"}`}>
          {label}
        </span>
      </div>
      <div className={`hidden md:block ${children ? "md:col-span-6 lg:col-span-7" : "md:col-span-9 lg:col-span-10"}`}>
        <span className={`block h-px w-full ${rule}`} />
      </div>
      {children && <div className="col-span-12 md:col-span-3 flex md:justify-end">{children}</div>}
    </div>
  );
}

/** Content offset to the right of the rail: two empty columns on desktop. */
export function Offset({
  children,
  className = "",
  span = "md:col-span-10",
}: {
  children: ReactNode;
  className?: string;
  span?: string;
}) {
  return (
    <div className={`grid grid-cols-12 gap-4 ${className}`}>
      <div className="hidden md:block md:col-span-2" />
      <div className={`col-span-12 ${span}`}>{children}</div>
    </div>
  );
}

/** Staggers a group of revealed items: 80ms per step, as on Local Cascade. */
export function revealDelay(i: number): CSSProperties {
  return { "--reveal-delay": `${i * 80}ms` } as CSSProperties;
}

/** Dark-section backdrop: spotlight from the top and faint vertical lines. */
export function InkBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none lc-spotlight" />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none lc-grid-ink" />
    </>
  );
}
