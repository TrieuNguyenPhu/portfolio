import type { Metadata, Viewport } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SiteShell from "./site-shell";

const display = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

const designContract = `<!--
THESIS: A software engineering portfolio where backend depth and cloud capability feel clear, approachable, and memorable.
OWN-WORLD: Airy editorial space, deep green ink, and a single family of green signals with living cloud-system illustrations.
STORY: Visitors meet Trieu through a human introduction, understand his capabilities, inspect evidence-rich work, then make contact.
FIRST VIEWPORT: A concise engineering promise and custom cloud workbench illustration establish personality and focus.
FORM: Spacious storytelling with native CSS/SVG motion and progressive enhancement.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export const metadata: Metadata = {
  title: {
    default: "Nguyen Phu Trieu — Software Engineer",
    template: "%s — Nguyen Phu Trieu",
  },
  description:
    "Software engineer focused on reliable backend systems, data boundaries, cloud infrastructure, delivery automation, and observability.",
  metadataBase: new URL("https://nguyen-phu-trieu-portfolio.vercel.app"),
  applicationName: "Nguyen Phu Trieu Portfolio",
  authors: [{ name: "Nguyen Phu Trieu", url: "https://nguyen-phu-trieu-portfolio.vercel.app" }],
  creator: "Nguyen Phu Trieu",
  publisher: "Nguyen Phu Trieu",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nguyen Phu Trieu — Software Engineer · Backend & Cloud",
    description:
      "Backend systems and cloud infrastructure explained through architecture, engineering decisions, and implementation evidence.",
    type: "website",
    url: "/",
    siteName: "Nguyen Phu Trieu Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Phu Trieu — Software Engineer · Backend & Cloud",
    description: "Reliable backend systems, cloud infrastructure, and delivery engineering work.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08130d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f8f3" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nguyen Phu Trieu",
  url: "https://nguyen-phu-trieu-portfolio.vercel.app",
  jobTitle: "Software Engineer",
  email: "mailto:nguyentrieu080604@gmail.com",
  sameAs: [
    "https://github.com/TrieuNguyenPhu",
    "https://www.linkedin.com/in/trieunguyenphu86/",
  ],
  knowsAbout: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "Observability"],
};

const themeScript = `try{const theme=localStorage.getItem("portfolio-theme");if(theme==="light"||theme==="dark")document.documentElement.dataset.theme=theme}catch{}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><Script id="theme-preference" strategy="beforeInteractive">{themeScript}</Script></head>
      <body id="top" className={`${display.variable} ${mono.variable}`}>
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
