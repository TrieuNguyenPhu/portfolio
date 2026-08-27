import type { Metadata, Viewport } from "next";
import { Manrope, Roboto_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "./site-shell";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-manrope",
  display: "swap",
});

const mono = Roboto_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-mono",
  display: "swap",
});

const designContract = `<!--
THESIS: A technical editorial portfolio where infrastructure work is understood through architecture, decisions, and evidence.
OWN-WORLD: Warm midnight surfaces, an acid signal color, oversized editorial typography, and living system diagrams.
STORY: Visitors meet Trieu through a clear engineering position, inspect case studies, learn his operating principles, then make contact.
FIRST VIEWPORT: A kinetic career statement and animated commit-to-runtime map establish the DevOps focus before any scroll.
FORM: Spacious technical editorial with native CSS/SVG motion and progressive enhancement.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export const metadata: Metadata = {
  title: "Nguyen Phu Trieu — DevOps Engineer",
  description:
    "DevOps engineer focused on AWS, Kubernetes, Terraform, GitOps, CI/CD, observability, and cloud security.",
  metadataBase: new URL("https://nguyen-phu-trieu-portfolio.vercel.app"),
  openGraph: {
    title: "Nguyen Phu Trieu — DevOps Engineer",
    description:
      "Selected cloud infrastructure, GitOps, Kubernetes, and delivery engineering work.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090a08" },
    { media: "(prefers-color-scheme: light)", color: "#eeede5" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${mono.variable}`}>
        <template data-design-contract dangerouslySetInnerHTML={{ __html: designContract }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
