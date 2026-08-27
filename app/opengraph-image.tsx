import { ImageResponse } from "next/og";

export const alt = "Nguyen Phu Trieu — DevOps Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0b0d1f",
        color: "#f4f6ff",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 82px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
        <span style={{ color: "#a5b4fc", fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>
          DEVOPS ENGINEER · CLOUD BUILDER
        </span>
        <strong style={{ fontSize: 76, letterSpacing: -4, lineHeight: 1.05, marginTop: 34 }}>
          Nguyen Phu Trieu
        </strong>
        <span style={{ color: "#aab3d1", fontSize: 34, lineHeight: 1.35, marginTop: 28 }}>
          Reliable paths from commit to production.
        </span>
      </div>
      <svg width="190" height="190" viewBox="0 0 64 64">
        <g fill="none" stroke="#a5b4fc" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round">
          <path d="M32 27V18H24V10" />
          <path d="M35 28L41 22V14H49" />
          <path d="M37 32H50V24H58" />
          <path d="M35 36L42 43V51H52" />
          <path d="M32 38V50H40V58" />
          <path d="M29 36L22 43V51H12" />
          <path d="M27 32H14V24H6" />
          <path d="M29 28L23 22V14H15" />
        </g>
        <g fill="#0b0d1f" stroke="#a5b4fc" strokeWidth="1.5">
          <circle cx="24" cy="10" r="2" /><circle cx="49" cy="14" r="2" /><circle cx="58" cy="24" r="2" /><circle cx="52" cy="51" r="2" />
          <circle cx="40" cy="58" r="2" /><circle cx="12" cy="51" r="2" /><circle cx="6" cy="24" r="2" /><circle cx="15" cy="14" r="2" />
        </g>
        <path d="M32 23.5L39.4 27.8V36.2L32 40.5L24.6 36.2V27.8Z" fill="#0b0d1f" stroke="#a5b4fc" strokeWidth="2.5" />
        <circle cx="32" cy="32" r="2.4" fill="#a5b4fc" />
      </svg>
    </div>,
    size,
  );
}
