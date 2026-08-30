import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "./site-shell";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const designContract = `<!--
THESIS: A personal DevOps portfolio where technical depth feels clear, approachable, and memorable.
OWN-WORLD: A calm infrastructure signal observatory with deep neutral fields, cyan-blue-violet telemetry, and precise editorial evidence.
STORY: Visitors meet Trieu through a human introduction, understand his capabilities, inspect evidence-rich work, then make contact.
FIRST VIEWPORT: A concise engineering promise sits against a living Three.js topology field without sacrificing scan speed.
FORM: Spacious storytelling, GSAP choreography, and progressively enhanced WebGL with a complete static fallback.
FINISH: Every effect is subordinate to evidence, measured against reduced-motion, responsive, performance, and accessibility constraints.
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
    { media: "(prefers-color-scheme: dark)", color: "#07090d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" },
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
