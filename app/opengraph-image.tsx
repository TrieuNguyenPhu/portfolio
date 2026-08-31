import { ImageResponse } from "next/og";

export const alt = "Nguyen Phu Trieu — Working Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 70px", background: "#171a24", color: "#f4eee6", fontFamily: "Georgia, serif", border: "18px solid #10131b" }}><div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 17, letterSpacing: 3, textTransform: "uppercase", color: "#b9b4ae" }}><span>Working Systems</span><span>Edition 02 · 2026</span></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 108, lineHeight: .84, letterSpacing: -8 }}><span>Nguyen Phu</span><span>Trieu</span></div><div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 38, fontFamily: "Arial, sans-serif", fontSize: 22 }}><span style={{ width: 80, height: 4, background: "#c87046" }} /><span>Cloud DevOps Engineer · DevSecOps</span></div></div><div style={{ display: "flex", fontFamily: "Arial, sans-serif", fontSize: 15, color: "#b9b4ae" }}>VII volumes of infrastructure, security, delivery, and practice.</div></div>, size);
}
