import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

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
    { media: "(prefers-color-scheme: dark)", color: "#050611" },
    { media: "(prefers-color-scheme: light)", color: "#f7f8ff" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}
