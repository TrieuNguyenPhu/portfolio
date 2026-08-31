import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import Script from "next/script";
import "../src/shaders/threeui.css";
import "./globals.css";
import SiteShell from "./site-shell";

const roboto = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const designContract = `<!--
THESIS: A DevOps portfolio presented as a living phosphor terminal where every claim resolves into inspectable system evidence.
OWN-WORLD: A Zion-era operations console with curved CRT glass, green phosphor, amber alerts, strict monospace hierarchy, and ruled command surfaces.
STORY: The system boots, identifies Trieu, exposes capabilities and work records, then opens a direct communication channel.
FIRST VIEWPORT: The exact ThreeUI CrtBackground terminal renderer types its authored 19-row boot log beside the primary engineering promise.
FORM: Dense terminal metadata, responsive command panels, GSAP reveals, Raw WebGL, Canvas 2D glyph rendering, and semantic HTML.
FINISH: The ThreeUI source remains hash-identical while the application shell adopts its palette, contrast, geometry, and motion language.
-->`;

export const metadata: Metadata = {
  title: {
    default: "Nguyen Phu Trieu — DevOps Engineer",
    template: "%s — Nguyen Phu Trieu",
  },
  description:
    "DevOps engineer focused on AWS, Kubernetes, Terraform, GitOps, CI/CD, observability, and cloud security.",
  metadataBase: new URL("https://nguyen-phu-trieu-portfolio.vercel.app"),
  applicationName: "Nguyen Phu Trieu Portfolio",
  authors: [{ name: "Nguyen Phu Trieu", url: "https://nguyen-phu-trieu-portfolio.vercel.app" }],
  creator: "Nguyen Phu Trieu",
  publisher: "Nguyen Phu Trieu",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nguyen Phu Trieu — DevOps Engineer",
    description:
      "Selected cloud infrastructure, GitOps, Kubernetes, and delivery engineering work.",
    type: "website",
    url: "/",
    siteName: "Nguyen Phu Trieu Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Phu Trieu — DevOps Engineer",
    description: "Cloud infrastructure, GitOps, Kubernetes, and delivery engineering work.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020704" },
    { media: "(prefers-color-scheme: light)", color: "#020704" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nguyen Phu Trieu",
  url: "https://nguyen-phu-trieu-portfolio.vercel.app",
  jobTitle: "DevOps Engineer",
  email: "mailto:nguyentrieu080604@gmail.com",
  sameAs: [
    "https://github.com/TrieuNguyenPhu",
    "https://www.linkedin.com/in/trieunguyenphu86/",
  ],
  knowsAbout: ["AWS", "Kubernetes", "Terraform", "GitOps", "CI/CD", "Cloud Security", "Observability"],
};

const themeScript = `try{const theme=localStorage.getItem("portfolio-theme");if(theme==="light"||theme==="dark")document.documentElement.dataset.theme=theme}catch{}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><Script id="theme-preference" strategy="beforeInteractive">{themeScript}</Script></head>
      <body id="top" className={roboto.variable}>
        <template data-design-contract dangerouslySetInnerHTML={{ __html: designContract }} />
        <Script
          id="person-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
