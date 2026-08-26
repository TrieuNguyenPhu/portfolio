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
THESIS: An immersive cloud-operations field where verified work moves through a living deployment pipeline.
OWN-WORLD: Midnight infrastructure grids, luminous signal fields, oversized editorial type, and precise monospace telemetry.
STORY: Visitors meet Trieu through a bold engineering claim, follow his operating path, inspect shipped systems, then make contact.
FIRST VIEWPORT: A kinetic career statement and animated delivery topology establish the DevOps focus before any scroll.
FORM: Asymmetric technical editorial with native CSS motion and progressive enhancement.
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
    { media: "(prefers-color-scheme: dark)", color: "#090c18" },
    { media: "(prefers-color-scheme: light)", color: "#f3f4f7" },
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
