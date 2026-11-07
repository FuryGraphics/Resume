import { ImageResponse } from "next/og";
import { hero, site } from "@/site.config";

/**
 * The share card for LinkedIn, X, and messaging apps (1200x630), drawn in
 * the site's own style: warm paper, mono label, bold tight name, one accent.
 * Generated at build time, so it always matches site.config.
 */
export const alt = site.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#FAFAF9",
          backgroundImage:
            "linear-gradient(rgba(13,13,13,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(13,13,13,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          color: "#0D0D0D",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              backgroundColor: "#004AAD",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            AK
          </div>
          <div style={{ fontSize: 22, letterSpacing: 3, color: "#737373" }}>
            AKASHKAPRUWAN.COM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
            {hero.name}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 24,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              color: "#525252",
              maxWidth: 1000,
            }}
          >
            {hero.promise.lead}&nbsp;<span style={{ color: "#004AAD" }}>{hero.promise.accent}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #E5E5E5",
            paddingTop: 24,
            fontSize: 20,
            letterSpacing: 2.5,
            color: "#737373",
          }}
        >
          <div style={{ display: "flex" }}>
            {hero.facts
              .slice(0, 2)
              .map(fact => `${fact.label}, ${fact.value.toUpperCase()}`)
              .join(" · ")}
          </div>
          <div style={{ display: "flex", color: "#004AAD" }}>
            {hero.facts[2].value.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    size
  );
}
