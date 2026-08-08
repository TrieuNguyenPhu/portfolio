import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SiteShell from "./site-shell";

const roboto = Roboto({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
});

const designContract = `<!--
THESIS: A portfolio presented as an infrastructure change-set folio; it refuses the dark neon DevOps dashboard.
OWN-WORLD: Cool paper surfaces, ink-black typography, cobalt and ultraviolet document fields, clipped sheets, and precise registration rules.
STORY: Visitors understand Trieu's focus, inspect verified experience and systems, then open a repository or make contact.
FIRST VIEWPORT: A clear career statement sits beside a blue-violet deployment profile built only from verified capabilities; project and GitHub actions remain visible.
FORM: Layered technical folio, fifth grounded direction, seed 5115ff72.
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
      <body className={roboto.variable}>
        <template data-design-contract dangerouslySetInnerHTML={{ __html: designContract }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
