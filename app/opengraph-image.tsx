import { ImageResponse } from "next/og";

export const alt = "Nguyen Phu Trieu — Software Engineer · Backend & Cloud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#08130d",
        color: "#f1faf2",
        display: "flex",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 82px",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
        <span style={{ color: "#7ce7a2", fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>
          SOFTWARE ENGINEER · BACKEND & CLOUD
        </span>
        <strong style={{ fontSize: 76, letterSpacing: -4, lineHeight: 1.05, marginTop: 34 }}>
          Nguyen Phu Trieu
        </strong>
        <span style={{ color: "#abc7b1", fontSize: 34, lineHeight: 1.35, marginTop: 28 }}>
          Reliable backend systems and the infrastructure behind them.
        </span>
      </div>
      <svg width="190" height="190" viewBox="0 0 64 64">
        <g fill="none" stroke="#7ce7a2" strokeWidth="3.7" strokeLinecap="round">
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(45 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(90 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(135 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(180 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(225 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(270 32 32)" />
          <path d="M32 31V12c0-3.4 2.8-6.2 6.2-6.2" transform="rotate(315 32 32)" />
        </g>
        <circle cx="32" cy="32" r="6" fill="#7ce7a2" />
      </svg>
    </div>,
    size,
  );
}
