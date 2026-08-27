import type { Metadata, Viewport } from "next";
import { Manrope, Roboto_Mono, Space_Grotesk } from "next/font/google";
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

const display = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-display",
  display: "swap",
});

const designContract = `<!--
THESIS: A personal DevOps portfolio where technical depth feels clear, approachable, and memorable.
OWN-WORLD: Airy editorial space, deep green ink, and a single family of green signals with living cloud-system illustrations.
STORY: Visitors meet Trieu through a human introduction, understand his capabilities, inspect evidence-rich work, then make contact.
FIRST VIEWPORT: A concise engineering promise and custom cloud workbench illustration establish personality and focus.
FORM: Spacious storytelling with native CSS/SVG motion and progressive enhancement.
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
    { media: "(prefers-color-scheme: dark)", color: "#0e1020" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${mono.variable} ${display.variable}`}>
        <template data-design-contract dangerouslySetInnerHTML={{ __html: designContract }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
